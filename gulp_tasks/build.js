const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");
const { argv } = require("yargs");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const through = require("through2");
const crypto = require("crypto");
const customHelpers = require("../helpers");

// 配置常量
const CONFIG = {
  maxFileSize: 100 * 1024, // CSS 分包大小：10KB
  hashLength: 12, // 哈希值长度
  autoprefixerBrowsers: [
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10",
    "last 30 versions",
  ],
};

let directory = argv.output || "dist_build";

/**
 * 清理任务
 * 排除 images 目录，避免文件被占用时出错
 */
gulp.task("clean", () => del([
  `./${directory}/**/*`,
  `!./${directory}/images`,
  `!./${directory}/images/**/*`
]));

/**
 * CSS/SCSS 编译和分包任务
 */
gulp.task("scss", (done) => {
  let allCss = "";
// , "public/**/*.css"
  const stream = gulp.src(["public/**/*.scss"]).pipe(
    through.obj(function (file, enc, cb) {
      if (!file.isBuffer()) return cb(null, file);

      try {
        let content = file.contents.toString();

        // 编译 SCSS
        if (path.extname(file.path) === ".scss") {
          const sass = require("sass");
          content = sass.compileString(content, {
            includePaths: ["./node_modules"],
          }).css;
        }

        allCss += `/* ${path.relative(
          process.cwd(),
          file.path
        )} */\n${content}\n\n`;
      } catch (err) {
        return cb(err);
      }

      cb();
    })
  );

  stream.on("finish", async () => {
    try {
      // 应用 autoprefixer
      const postcss = require("postcss");
      const autoprefixer = require("autoprefixer");
      const result = await postcss([
        autoprefixer(CONFIG.autoprefixerBrowsers),
      ]).process(allCss, { from: undefined });

      allCss = result.css;
      const size = Buffer.byteLength(allCss, "utf8");
      const cssDir = path.join(directory, "css");

      fs.mkdirSync(cssDir, { recursive: true });

      let files = [];

      if (size <= CONFIG.maxFileSize) {
        // 单文件
        const filename = generateHash(allCss) + ".css";
        fs.writeFileSync(path.join(cssDir, filename), allCss);
        files.push({ name: filename, size });
        console.log(`✓ CSS: ${filename} (${formatSize(size)})`);
      } else {
        // 分包
        files = splitCss(allCss, cssDir);
        console.log(`✓ CSS split: ${files.length} files`);
        files.forEach((f) =>
          console.log(`  - ${f.name} (${formatSize(f.size)})`)
        );
      }

      // 保存 manifest
      fs.writeFileSync(
        path.join(cssDir, "css-manifest.json"),
        JSON.stringify(
          {
            files: files.map((f) => f.name),
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )
      );

      done();
    } catch (err) {
      done(err);
    }
  });

  stream.on("error", done);
});

/**
 * Handlebars 编译任务
 */
gulp.task("hbs", async () => {
  const { getAllPagesData } = require("../config/pages");

  // 加载动画
  const spinner = showSpinner("⏳ Loading page data");
  const pagesData = await getAllPagesData();
  clearSpinner(spinner, "✓ Page data loaded");

  // 注册自定义 helpers
  registerHelpers();

  // 注册 widgets
  registerWidgets();

  // 读取 CSS manifest
  const cssFiles = readCssManifest();

  // 读取 layout
  const layoutTemplate = Handlebars.compile(
    fs.readFileSync(path.join(__dirname, "../views/layout.hbs"), "utf8")
  );

  return new Promise((resolve, reject) => {
    gulp
      .src([
        "views/**/*.hbs",
        "!views/layout.hbs", // 排除 layout.hbs
        "!views/widgets/**/*.hbs", // 排除 widgets 目录
      ])
      .pipe(
        through.obj(function (file, enc, cb) {
          if (!file.isBuffer()) return cb(null, file);

          try {
            // 根据文件名获取对应的数据
            const fileName = path.basename(file.path, ".hbs");
            const data = pagesData[fileName] || {};

            // 编译视图
            const viewTemplate = Handlebars.compile(file.contents.toString());
            const body = viewTemplate(data);

            // 合并到 layout
            let html = layoutTemplate({ ...data, body, cssFiles });
            
            // 后处理：将绝对路径转换为相对路径
            // 确保打包后的 HTML 可以在任何位置正确访问资源
            html = html.replace(/src="\/images\//g, 'src="images/');
            html = html.replace(/href="\/images\//g, 'href="images/');
            html = html.replace(/src="\/js\//g, 'src="js/');
            html = html.replace(/href="\/js\//g, 'href="js/');
            
            file.contents = Buffer.from(html);
          } catch (err) {
            return cb(err);
          }

          cb(null, file);
        })
      )
      .pipe(rename({ extname: ".html" }))
      .pipe(gulp.dest(directory))
      .on("end", resolve)
      .on("error", reject);
  });
});

// 主构建任务
/**
 * 复制静态文件任务（图片、字体、favicon等）
 * - 图片：压缩后复制到 images/ 目录
 * - 字体：复制到 fonts/ 目录
 * - favicon：复制到根目录
 * - 其他静态资源：按原路径复制
 */
gulp.task("copy", async () => {
  // 递归复制目录
  function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
      // 确保目标目录存在
      fs.mkdirSync(dest, { recursive: true });
      
      // 读取源目录中的所有文件
      const entries = fs.readdirSync(src);
      
      entries.forEach(entry => {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        copyRecursive(srcPath, destPath);
      });
    } else {
      // 复制文件
      fs.copyFileSync(src, dest);
    }
  }
  
  // 复制图片目录（递归复制所有子目录）
  const imagesDir = path.join(__dirname, "../public/images");
  const distImagesDir = path.join(directory, "images");
  if (fs.existsSync(imagesDir)) {
    copyRecursive(imagesDir, distImagesDir);
    console.log(`✓ Copied images directory recursively`);
  }
  
  // 复制字体目录
  const fontsDir = path.join(__dirname, "../public/fonts");
  const distFontsDir = path.join(directory, "fonts");
  if (fs.existsSync(fontsDir)) {
    copyRecursive(fontsDir, distFontsDir);
    console.log(`✓ Copied fonts directory`);
  }
  
  // 复制 favicon
  const faviconPath = path.join(__dirname, "../public/favicon.ico");
  const distFaviconPath = path.join(directory, "favicon.ico");
  if (fs.existsSync(faviconPath)) {
    fs.copyFileSync(faviconPath, distFaviconPath);
    console.log(`✓ Copied favicon`);
  }
  
  // 复制 JS 文件
  const jsDir = path.join(__dirname, "../public/js");
  const distJsDir = path.join(directory, "js");
  if (fs.existsSync(jsDir)) {
    copyRecursive(jsDir, distJsDir);
    console.log(`✓ Copied js directory`);
  }
  
  return Promise.resolve();
});

gulp.task("build", gulp.series("clean", "scss", "hbs", "copy"));

// ============= 辅助函数 =============

/**
 * 生成哈希
 */
function generateHash(content) {
  return crypto
    .createHash("md5")
    .update(content)
    .digest("hex")
    .substring(0, CONFIG.hashLength);
}

/**
 * 格式化文件大小
 */
function formatSize(bytes) {
  return (bytes / 1024).toFixed(2) + "KB";
}

/**
 * 分割 CSS
 */
function splitCss(css, outputDir) {
  const lines = css.split("\n");
  const files = [];
  let chunk = "";
  let rule = "";
  let braceCount = 0;
  let inRule = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    rule += line + "\n";

    // 追踪大括号
    for (const char of line) {
      if (char === "{") {
        braceCount++;
        inRule = true;
      }
      if (char === "}") {
        braceCount--;
        if (braceCount === 0) inRule = false;
      }
    }

    // 规则完整时检查是否需要分包
    const isComplete =
      braceCount === 0 &&
      !inRule &&
      rule.trim() &&
      (trimmed.endsWith("}") || trimmed.startsWith("/*"));

    if (isComplete) {
      const test = chunk + rule;

      if (
        Buffer.byteLength(test, "utf8") > CONFIG.maxFileSize &&
        chunk.trim()
      ) {
        // 保存当前块
        const filename = generateHash(chunk) + ".css";
        fs.writeFileSync(path.join(outputDir, filename), chunk);
        files.push({ name: filename, size: Buffer.byteLength(chunk, "utf8") });
        chunk = rule;
      } else {
        chunk = test;
      }

      rule = "";
    }
  }

  // 保存剩余内容
  if (rule.trim()) chunk += rule;
  if (chunk.trim()) {
    const filename = generateHash(chunk) + ".css";
    fs.writeFileSync(path.join(outputDir, filename), chunk);
    files.push({ name: filename, size: Buffer.byteLength(chunk, "utf8") });
  }

  return files;
}

/**
 * 注册自定义 helpers
 */
function registerHelpers() {
  Object.entries(customHelpers).forEach(([name, fn]) => {
    Handlebars.registerHelper(name, fn);
  });
  console.log(`✓ Registered ${Object.keys(customHelpers).length} helper(s) for build`);
}

/**
 * 递归扫描 widgets 目录并注册所有 .hbs 文件为 partials
 * 优化：合并扫描和注册逻辑，减少重复遍历
 */
function registerWidgets() {
  const widgetsDir = path.join(__dirname, "../views/widgets");
  const widgetsPath = path.resolve(widgetsDir);
  
  // 递归扫描并注册
  function scanAndRegister(dir, relativePath = "") {
    let count = 0;
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          // 递归扫描子目录
          const subDir = path.join(dir, entry.name);
          const subRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
          count += scanAndRegister(subDir, subRelativePath);
        } else if (entry.isFile() && entry.name.endsWith('.hbs')) {
          // 读取并注册 partial
          const filePath = path.join(dir, entry.name);
          const content = fs.readFileSync(filePath, "utf8");
          
          // 生成 partial 名称：移除 .hbs 扩展名，保留路径
          const partialName = relativePath 
            ? `${relativePath}/${entry.name.slice(0, -4)}` 
            : entry.name.slice(0, -4);
          
          Handlebars.registerPartial(partialName, content);
          count++;
        }
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        // 目录不存在，静默忽略
        return 0;
      }
      console.warn(`⚠ Warning reading directory ${dir}:`, err.message);
    }
    
    return count;
  }
  
  try {
    const count = scanAndRegister(widgetsPath);
    // count 已在内层函数中统计，无需额外输出
  } catch (err) {
    console.warn("⚠ Widget loading failed:", err.message);
  }
}

/**
 * 读取 CSS manifest
 */
function readCssManifest() {
  try {
    const manifestPath = path.join(directory, "css/css-manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return manifest.files.map((f) => `css/${f}`);
  } catch (err) {
    return [];
  }
}

/**
 * 显示加载动画
 */
function showSpinner(message) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  return setInterval(() => {
    process.stdout.write(
      `\r${frames[i]} ${message}${".".repeat((i % 3) + 1)}   `
    );
    i = (i + 1) % frames.length;
  }, 80);
}

/**
 * 清除加载动画
 */
function clearSpinner(interval, message) {
  clearInterval(interval);
  process.stdout.write(`\r${message}          \n`);
}
