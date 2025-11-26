const Koa = require("koa");
const serve = require("koa-static");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const Handlebars = require("handlebars");
const sass = require("sass");
const routes = require("./routes");
const customHelpers = require("./helpers");

const app = new Koa();
const PORT = process.env.PORT || 3000;

// 路径常量
const PATHS = {
  views: path.join(__dirname, "views"),
  widgets: path.join(__dirname, "views/widgets"),
  public: path.join(__dirname, "public"),
};

// 缓存
const cache = {
  templates: new Map(),
  partials: new Set(),
};

/**
 * 请求日志中间件
 */
function requestLogger() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    // 颜色标记状态码
    let statusColor = "";
    if (ctx.status >= 500) statusColor = "❌";
    else if (ctx.status >= 400) statusColor = "⚠️";
    else if (ctx.status >= 300) statusColor = "↗️";
    else if (ctx.status >= 200) statusColor = "✓";

    console.log(
      `${statusColor} ${ctx.method} ${ctx.url} - ${ctx.status} (${ms}ms)`
    );
  };
}

/**
 * 注册自定义 Helpers
 */
function registerHelpers() {
  let count = 0;
  Object.entries(customHelpers).forEach(([name, fn]) => {
    Handlebars.registerHelper(name, fn);
    count++;
  });
  console.log(`\n✅ Registered ${count} helper(s)`);
}

/**
 * 注册 Handlebars Widgets（支持子目录和路径访问）
 * 优化：合并扫描和注册逻辑，减少文件系统调用
 */
async function registerWidgets() {
  const widgetsPath = path.resolve(PATHS.widgets);
  const registered = [];
  
  // 递归扫描并注册
  async function scanAndRegister(dir, relativePath = "") {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      await Promise.all(
        entries.map(async (entry) => {
          if (entry.isDirectory()) {
            // 递归扫描子目录
            const subDir = path.join(dir, entry.name);
            const subRelativePath = relativePath 
              ? `${relativePath}/${entry.name}` 
              : entry.name;
            await scanAndRegister(subDir, subRelativePath);
          } else if (entry.isFile() && entry.name.endsWith('.hbs')) {
            // 读取并注册 partial
            const filePath = path.join(dir, entry.name);
            const content = await fs.readFile(filePath, "utf8");
            const size = Buffer.byteLength(content, "utf8");
            
            // 生成 partial 名称：移除 .hbs 扩展名，保留路径
            const partialName = relativePath 
              ? `${relativePath}/${entry.name.slice(0, -4)}` 
              : entry.name.slice(0, -4);
            
            Handlebars.registerPartial(partialName, content);
            cache.partials.add(partialName);
            
            registered.push({ name: partialName, file: entry.name, size });
          }
        })
      );
    } catch (err) {
      if (err.code === 'ENOENT') {
        // 目录不存在，静默忽略
        return;
      }
      throw err;
    }
  }
  
  try {
    await scanAndRegister(widgetsPath);
    
    // 输出注册信息
    registered.forEach(({ name, file, size }) => {
      console.log(`   ✓ ${name.padEnd(30)} (${file}, ${size} bytes)`);
    });
    
    if (registered.length > 0) {
      console.log(`✓ Registered ${registered.length} widget(s)`);
    }
  } catch (err) {
    console.warn("⚠ Widget loading failed:", err.message);
  }
}

/**
 * 渲染中间件
 */
function renderMiddleware() {
  return async (ctx, next) => {
    ctx.render = async (view, data = {}) => {
      try {
        // 编译模板（使用缓存）
        if (!cache.templates.has(view)) {
          const [viewContent, layoutContent] = await Promise.all([
            fs.readFile(path.join(PATHS.views, `${view}.hbs`), "utf8"),
            fs.readFile(path.join(PATHS.views, "layout.hbs"), "utf8"),
          ]);

          cache.templates.set(view, Handlebars.compile(viewContent));
          cache.templates.set("layout", Handlebars.compile(layoutContent));
        }

        // 渲染
        const body = cache.templates.get(view)(data);
        ctx.body = cache.templates.get("layout")({ ...data, body });
        ctx.type = "html";
      } catch (err) {
        console.error(`Render error for view "${view}":`, err);
        ctx.status = 500;
        ctx.body = "Internal Server Error";
      }
    };

    await next();
  };
}

/**
 * SCSS 实时编译中间件（仅开发环境）
 */
function scssCompiler() {
  return async (ctx, next) => {
    // 只处理 .scss 文件请求
    if (ctx.path.endsWith(".scss")) {
      try {
        const scssPath = path.join(PATHS.public, ctx.path);

        // 检查文件是否存在
        if (fsSync.existsSync(scssPath)) {
          // 读取 SCSS 文件
          const scssContent = fsSync.readFileSync(scssPath, "utf8");

          // 编译 SCSS 为 CSS
          const result = sass.compileString(scssContent, {
            includePaths: [
              path.join(__dirname, "node_modules"),
              path.dirname(scssPath),
            ],
            style: "expanded",
          });

          // 设置响应
          ctx.type = "text/css";
          ctx.body = result.css;
          return;
        }
      } catch (err) {
        console.error("SCSS compilation error:", err);
        ctx.status = 500;
        ctx.body = `/* SCSS Compilation Error: ${err.message} */`;
        return;
      }
    }

    await next();
  };
}

/**
 * 错误处理中间件
 */
function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();

      // 处理 404
      if (ctx.status === 404) {
        ctx.status = 404;
        ctx.body = "Page Not Found";
      }
    } catch (err) {
      console.error("Server error:", err);
      ctx.status = err.status || 500;
      ctx.body =
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message;
    }
  };
}

/**
 * 启动服务器
 */
async function startServer() {
  try {
    // 注册自定义 helpers
    registerHelpers();
    // 注册 widgets
    await registerWidgets();

    // 应用中间件
    app.use(errorHandler());
    app.use(requestLogger());

    // SCSS 实时编译（仅在开发环境，必须在静态文件服务之前）
    if (process.env.NODE_ENV !== "production") {
      app.use(scssCompiler());
      console.log("✓ SCSS real-time compilation enabled (development mode)");
    }

    app.use(renderMiddleware());
    app.use(routes.routes()).use(routes.allowedMethods());
    app.use(serve(PATHS.public));

    // 启动监听
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
}

// 启动
startServer();

module.exports = app;

