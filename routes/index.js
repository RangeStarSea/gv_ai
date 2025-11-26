const Router = require("koa-router");
const { getPageData } = require("../config/pages");

const router = new Router();

// 页面路由配置
const pages = [
  { path: "/", view: "index" },
  { path: "/test_service", view: "test_service" },
  { path: "/helper", view: "helper" },
  { path: "/product", view: "product" }
];

// 动态注册路由
pages.forEach(({ path, view }) => {
  router.get(path, async (ctx) => {
    const data = await getPageData(view);
    await ctx.render(view, data);
  });
});

module.exports = router;
