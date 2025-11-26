/**
 * 关于页面数据配置
 */

async function getAboutData() {
  return {
    title: "关于我们",
    content: "这是一个示例项目",
    description: "我们致力于提供优质的服务",
    team: ["张三", "李四", "王五"],

    // 项目统计数据 - 用于 icon_card widget
    stats: [
      {
        icon: "📦",
        title: "项目数量",
        number: "50+",
        label: "已完成项目",
        color: "blue"
      },
      {
        icon: "👥",
        title: "团队成员",
        number: "20",
        label: "专业人员",
        color: "green"
      },
      {
        icon: "⭐",
        title: "客户满意度",
        number: "98%",
        label: "五星好评",
        color: "orange"
      },
      {
        icon: "🏆",
        title: "获奖次数",
        number: "15",
        label: "行业奖项",
        color: "purple"
      }
    ]
  };
}

module.exports = {
  getAboutData
};

