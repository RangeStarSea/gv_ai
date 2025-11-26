/**
 * Helpers 示例页面数据
 */

async function getHelperData() {
  return {
    title: "Helpers 演示",
    description: "展示 Handlebars 自定义 Helpers 的使用",
    
    // 用户信息
    user: {
      name: "john doe",
      status: "active",
      isPremium: true,
      isOnline: true,
      joinDate: "2024-01-15T08:30:00",
      score: 8567,
      bio: "这是一段很长的个人简介文字，用来演示字符串截取功能。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    
    // 商品列表
    products: [
      {
        name: "笔记本电脑",
        price: 8999,
        stock: 25,
        discount: 15,
        rating: 5,
        publishedAt: "2025-10-15T10:00:00",
        tags: ["featured", "hot", "electronics"],
        description: "高性能笔记本电脑，适合办公和游戏"
      },
      {
        name: "无线鼠标",
        price: 199,
        stock: 3,
        discount: 0,
        rating: 4,
        publishedAt: "2025-10-20T14:30:00",
        tags: ["electronics"],
        description: "人体工学设计，舒适握持"
      },
      {
        name: "机械键盘",
        price: 599,
        stock: 0,
        discount: 20,
        rating: 5,
        publishedAt: "2025-10-25T09:15:00",
        tags: ["featured", "electronics"],
        description: "RGB背光机械键盘，青轴手感极佳"
      },
      {
        name: "显示器",
        price: 2499,
        stock: 15,
        discount: 10,
        rating: 5,
        publishedAt: "2025-10-28T16:45:00",
        tags: ["electronics"],
        description: "27英寸4K显示器，色彩还原度高"
      }
    ],
    
    // 文章列表
    articles: [
      {
        title: "Handlebars 入门指南",
        author: "alice wang",
        content: "Handlebars 是一个强大的模板引擎，可以帮助你快速构建动态网页。本文将介绍 Handlebars 的基本使用方法和最佳实践...",
        publishedAt: "2025-10-30T10:30:00",
        views: 1234,
        tags: ["tutorial", "featured", "handlebars"]
      },
      {
        title: "Node.js 性能优化技巧",
        author: "bob chen",
        content: "在构建大型 Node.js 应用时，性能优化是一个重要的话题。本文将分享一些实用的性能优化技巧和工具...",
        publishedAt: "2025-10-28T14:20:00",
        views: 567,
        tags: ["nodejs", "performance"]
      },
      {
        title: "CSS Grid 布局完全指南",
        author: "carol li",
        content: "CSS Grid 是现代网页布局的强大工具。本文将全面介绍 Grid 布局的使用方法，从基础到高级应用...",
        publishedAt: "2025-10-25T09:00:00",
        views: 890,
        tags: ["css", "tutorial", "featured"]
      },
      {
        title: "JavaScript ES2024 新特性",
        author: "david zhang",
        content: "JavaScript 持续演进，ES2024 带来了许多令人兴奋的新特性。让我们一起了解这些新功能如何改善开发体验...",
        publishedAt: "2025-10-22T11:15:00",
        views: 2345,
        tags: ["javascript", "es2024"]
      },
      {
        title: "前端安全最佳实践",
        author: "emma liu",
        content: "随着 Web 应用的复杂度增加，安全问题变得越来越重要。本文介绍前端开发中常见的安全问题和防范措施...",
        publishedAt: "2025-10-20T16:30:00",
        views: 678,
        tags: ["security", "frontend"]
      }
    ],
    
    // 统计数据
    stats: {
      totalUsers: 123456,
      activeUsers: 12345,
      totalSales: 9876543,
      conversionRate: 0.385, // 38.5%
      currentYear: new Date().getFullYear()
    },
    
    // 评分数据
    ratings: [
      { product: "商品A", rating: 5, reviews: 1234 },
      { product: "商品B", rating: 4, reviews: 567 },
      { product: "商品C", rating: 3, reviews: 89 }
    ],
    
    // 其他数据
    numbers: [10, 25, 30, 45, 50, 75, 90, 100],
    colors: ["red", "blue", "green", "yellow", "purple"],
    searchQuery: "Node.js & Handlebars",
    currentDate: new Date().toISOString()
  };
}

module.exports = {
  getHelperData
};

