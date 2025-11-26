/**
 * 页面数据配置
 */

const { fetchGlobalData } = require('./data/global');
const { getIndexData } = require('./data/index');
const { getAboutData } = require('./data/about');
const { getHelperData } = require('./data/helper');
const { getProductData } = require('./data/product');

// 页面数据加载器映射
const loaders = {
  index: getIndexData,
  test_service: getAboutData,
  helper: getHelperData,
  product: getProductData
};

/**
 * 获取单个页面数据（带全局数据合并）
 * @param {string} pageName - 页面名称
 * @returns {Promise<Object>}
 */
async function getPageData(pageName) {
  const [globalData, pageData] = await Promise.all([
    fetchGlobalData(),
    loaders[pageName]?.() || Promise.resolve({})
  ]);

  return { ...globalData, ...pageData };
}

/**
 * 获取所有页面数据（用于构建）
 * @returns {Promise<Object>}
 */
async function getAllPagesData() {
  const globalData = await fetchGlobalData();
  const pages = {};

  await Promise.all(
    Object.entries(loaders).map(async ([name, loader]) => {
      pages[name] = { ...globalData, ...(await loader()) };
    })
  );

  return pages;
}

module.exports = { getPageData, getAllPagesData };
