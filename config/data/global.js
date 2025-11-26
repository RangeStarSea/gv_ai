/**
 * 全局数据配置
 */

async function fetchGlobalData() {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  // 模拟异步数据获取，生产环境可替换为真实 API/数据库调用
  return {
    siteTitle: "gv_ai",
    siteName: "我的网站",
    version: "1.0.0",
    year: new Date().getFullYear(),
    author: "gavin"
  };
}

module.exports = { fetchGlobalData };
