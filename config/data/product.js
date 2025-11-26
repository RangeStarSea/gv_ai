/**
 * 产品页面数据配置
 */

async function getProductData() {
  return {
    productBox: [
      {
        style: {
          level: 2, // 标题级别 1-6
          alignment: "left", // 对齐方式 三种：left, center, right
          fontWeight: "600", // 字体粗细
          fontSize: "0.48rem", // 字体大小
          fontColor: "#1F1F1F", // 字体颜色
          padding: "0 0 0.24rem 0", // 内边距
        },
        type: "partial",
        componentPositioning: "partials/h_txt",
        remark: "[==>当前标题<==]", //::不参与渲染,仅作提示作用
        content: "市场部门",
      },
      {
        style: {
          alignment: "left", // 对齐方式 三种：left, center, right
          fontWeight: "600", // 字体粗细
          fontSize: "18px", // 字体大小
          fontColor: "#1F1F1F", // 字体颜色
          padding: "0 0 0.50rem 0", // 内边距
          line: 2, // 行数
        },
        type: "partial",
        componentPositioning: "partials/p_txt",
        remark: "[==>当前描述<==]", //::不参与渲染,仅作提示作用
        content:
          "基于ABCD原则，空谷将品牌和营销的关键点融合到客户的网站设计中，实现品牌与业绩双增长",
      },
      {
        style: {
          flex_width: 2,
          negativeSpaceTopBottom: "20px", // row 间距
          space: "20px", // row 间距
          align: "flex-start", // col 每项的垂直对齐方式
          // borderRadius: "20px", // 圆角
          padding: "0px 0px 0px 0px", // 内边距
          // border: "1px solid #B5B5B5",
          backgroundColor: "rgba(245,245,247,0.5564)",
          itemNum: 2, // 每项的列数
        },
        attr: {},
        type: "widgets",
        componentPositioning: "custom_row",
        remark: "[==>left左边模块<==]", //::不参与渲染,仅作提示作用
        content: "",
      },
      {
        style: {
          // alignment: "left", // 对齐方式 三种：left, center, right
          // fontSize: "20px", // 字体大小
          // fontWeight: "bold", // 字体粗细
          // fontColor: "#000000", // 字体颜色
          margin: "-10px 0px -10px 0px", // 内边距
          wrap: "false", // 是否换行
          /**
           * flex_layout组件参数配置
           */
          gap: "20px", // row 间距
          equal: "false", // 是否等宽
          num: "2", // row 每项的列数
          /**
           * flex_layout组件参数配置
           */
        },
        type: "widgets",
        componentPositioning: "flex_layout",
        remark: "[==>custom_row组件<==]", //::不参与渲染,仅作提示作用
        content: "",
        children: [
          {
            style: {
              flex_width: 2,
              negativeSpaceTopBottom: "20px", // row 间距
              space: "20px", // row 间距
              align: "flex-start", // col 每项的垂直对齐方式
              // borderRadius: "20px", // 圆角
              padding: "0px 0px 0px 0px", // 内边距
              // border: "1px solid #B5B5B5",
              backgroundColor: "rgba(245,245,247,0.5564)",
              itemNum: 2, // 每项的列数
            },
            attr: {},
            type: "widgets",
            componentPositioning: "custom_row",
            remark: "[==>left左边模块<==]", //::不参与渲染,仅作提示作用
            content: "",
            children: [
              // 一个item样式
              {
                style: {
                  padding: "30px", // 内边距
                  borderRadius: "20px", // row 每项的列数
                  border: "1px solid #B5B5B5",
                  backgroundColor: "rgba(245,245,247,0.5564)",
                },
                attr: {},
                type: "widgets",
                componentPositioning: "custom_row",
                remark: "[==>ITEM<==]", //::不参与渲染,仅作提示作用
                content: "",
                children: [
                  {
                    style: {
                      /**
                       * custom_img组件参数配置
                       */
                      alignment: "left", // 对齐方式 三种：left, center, right
                      width: "36px", // row 间距
                      borderRadius: "0px", // row 每项的列数
                      aspectRatio: "1/1", // 宽高比
                      padding: "0px 0px 0px 0px", // 内边距
                      margin: "0px 0px 37px 0px", // 内边距
                      // border: "1px solid #B5B5B5",
                      // backgroundColor: "#B5B5B5",
                      backgroundOpacity: "100%"
                      /**
                       * custom_img组件参数配置
                       */
                    },
                    attr: {
                      alt: "图片_你好!",
                    },
                    type: "partial",
                    componentPositioning: "partials/custom_img",
                    remark: "[==>图片<==]", //::不参与渲染,仅作提示作用
                    content: "images/ico_01.png",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "600", // 字体粗细
                      fontSize: "18px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 16px 0px", // 内边距
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/p_txt",
                    remark: "[==>标题<==]", //::不参与渲染,仅作提示作用
                    content: "自定义TDK、图片Alt和Title",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "500", // 字体粗细
                      fontSize: "14px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 0px 0px", // 内边距
                      line: 2
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/span_txt",
                    remark: "[==>描述<==]", //::不参与渲染,仅作提示作用
                    content: "灵活自定义全站、栏目、内容页SEO的TDK以及图片Alt和Title",
                  },
                ]
              },
              // 一个item样式
              {
                style: {
                  padding: "30px", // 内边距
                  borderRadius: "20px", // row 每项的列数
                  border: "1px solid #B5B5B5",
                  backgroundColor: "rgba(245,245,247,0.5564)",
                },
                attr: {},
                type: "widgets",
                componentPositioning: "custom_row",
                remark: "[==>ITEM<==]", //::不参与渲染,仅作提示作用
                content: "",
                children: [
                  {
                    style: {
                      /**
                       * custom_img组件参数配置
                       */
                      alignment: "left", // 对齐方式 三种：left, center, right
                      width: "36px", // row 间距
                      borderRadius: "0px", // row 每项的列数
                      aspectRatio: "1/1", // 宽高比
                      padding: "0px 0px 0px 0px", // 内边距
                      margin: "0px 0px 37px 0px", // 内边距
                      // border: "1px solid #B5B5B5",
                      // backgroundColor: "#B5B5B5",
                      backgroundOpacity: "100%"
                      /**
                       * custom_img组件参数配置
                       */
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/custom_img",
                    remark: "[==>图片<==]", //::不参与渲染,仅作提示作用
                    content: "images/ico_02.png",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "600", // 字体粗细
                      fontSize: "18px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 16px 0px", // 内边距
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/p_txt",
                    remark: "[==>标题<==]", //::不参与渲染,仅作提示作用
                    content: "URL重定向",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "500", // 字体粗细
                      fontSize: "14px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 0px 0px", // 内边距
                      line: 2
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/span_txt",
                    remark: "[==>描述<==]", //::不参与渲染,仅作提示作用
                    content: "支持原有URL访问，保障用户的使用体验",
                  },
                ]
              },
              // 一个item样式
              {
                style: {
                  padding: "30px", // 内边距
                  borderRadius: "20px", // row 每项的列数
                  border: "1px solid #B5B5B5",
                  backgroundColor: "rgba(245,245,247,0.5564)",
                },
                attr: {},
                type: "widgets",
                componentPositioning: "custom_row",
                remark: "[==>ITEM<==]", //::不参与渲染,仅作提示作用
                content: "",
                children: [
                  {
                    style: {
                      /**
                       * custom_img组件参数配置
                       */
                      alignment: "left", // 对齐方式 三种：left, center, right
                      width: "36px", // row 间距
                      borderRadius: "0px", // row 每项的列数
                      aspectRatio: "1/1", // 宽高比
                      padding: "0px 0px 0px 0px", // 内边距
                      margin: "0px 0px 37px 0px", // 内边距
                      // border: "1px solid #B5B5B5",
                      // backgroundColor: "#B5B5B5",
                      backgroundOpacity: "100%"
                      /**
                       * custom_img组件参数配置
                       */
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/custom_img",
                    remark: "[==>图片<==]", //::不参与渲染,仅作提示作用
                    content: "images/ico_03.png",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "600", // 字体粗细
                      fontSize: "18px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 16px 0px", // 内边距
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/p_txt",
                    remark: "[==>标题<==]", //::不参与渲染,仅作提示作用
                    content: "SEO自动化",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "500", // 字体粗细
                      fontSize: "14px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 0px 0px", // 内边距
                      line: 2
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/span_txt",
                    remark: "[==>描述<==]", //::不参与渲染,仅作提示作用
                    content: "自动设置A标签内链跳转地址及Title，自动构建网状结构",
                  },
                ]
              },
              // 一个item样式
              {
                style: {
                  padding: "30px", // 内边距
                  borderRadius: "20px", // row 每项的列数
                  border: "1px solid #B5B5B5",
                  backgroundColor: "rgba(245,245,247,0.5564)",
                },
                attr: {},
                type: "widgets",
                componentPositioning: "custom_row",
                remark: "[==>ITEM<==]", //::不参与渲染,仅作提示作用
                content: "",
                children: [
                  {
                    style: {
                      /**
                       * custom_img组件参数配置
                       */
                      alignment: "left", // 对齐方式 三种：left, center, right
                      width: "36px", // row 间距
                      borderRadius: "0px", // row 每项的列数
                      aspectRatio: "1/1", // 宽高比
                      padding: "0px 0px 0px 0px", // 内边距
                      margin: "0px 0px 37px 0px", // 内边距
                      // border: "1px solid #B5B5B5",
                      // backgroundColor: "#B5B5B5",
                      backgroundOpacity: "100%"
                      /**
                       * custom_img组件参数配置
                       */
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/custom_img",
                    remark: "[==>图片<==]", //::不参与渲染,仅作提示作用
                    content: "images/ico_04.png",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "600", // 字体粗细
                      fontSize: "18px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 16px 0px", // 内边距
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/p_txt",
                    remark: "[==>标题<==]", //::不参与渲染,仅作提示作用
                    content: "Sitemap构建与自动提交",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "500", // 字体粗细
                      fontSize: "14px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 0px 0px", // 内边距
                      line: 2
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/span_txt",
                    remark: "[==>描述<==]", //::不参与渲染,仅作提示作用
                    content: "遵循Sitemap协议，自动提交sitemap，增加收录量，提升收录速度，加速提升搜索引擎排名",
                  },
                ]
              },
            ]
          },
          {
            style: {
              flex_width: 1,
              negativeSpaceTopBottom: "20px", // row 间距
              space: "20px", // row 间距
              align: "flex-start", // col 每项的垂直对齐方式
              // borderRadius: "20px", // row 每项的列数
              fontColor: "#1F1F1F", // 字体颜色
              padding: "0px 0px 0px 0px", // 内边距
              // border: "1px solid #B5B5B5",
              backgroundColor: "rgba(245,245,247,0.5564)",
              itemNum: 1, // 每项的列数
            },
            attr: {},
            type: "widgets",
            componentPositioning: "custom_row",
            remark: "[==>right右边模块<==]", //::不参与渲染,仅作提示作用
            content: "",
            children: [
              // 一个item样式
              {
                style: {
                  padding: "30px", // 内边距
                  borderRadius: "20px", // row 每项的列数
                  border: "1px solid #B5B5B5",
                  backgroundColor: "rgba(245,245,247,0.5564)",
                },
                attr: {},
                type: "widgets",
                componentPositioning: "custom_row",
                remark: "[==>right右边模块<==]", //::不参与渲染,仅作提示作用
                content: "",
                children: [
                  {
                    style: {
                      /**
                       * custom_img组件参数配置
                       */
                      alignment: "left", // 对齐方式 三种：left, center, right
                      width: "36px", // row 间距
                      borderRadius: "0px", // row 每项的列数
                      aspectRatio: "1/1", // 宽高比
                      padding: "0px 0px 0px 0px", // 内边距
                      margin: "0px 0px 37px 0px", // 内边距
                      // border: "1px solid #B5B5B5",
                      // backgroundColor: "#B5B5B5",
                      backgroundOpacity: "100%"
                      /**
                       * custom_img组件参数配置
                       */
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/custom_img",
                    remark: "[==>图片<==]", //::不参与渲染,仅作提示作用
                    content: "images/ico_01.png",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "600", // 字体粗细
                      fontSize: "18px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 16px 0px", // 内边距
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/p_txt",
                    remark: "[==>标题<==]", //::不参与渲染,仅作提示作用
                    content: "数字营销",
                  },
                  {
                    style: {
                      alignment: "left", // 对齐方式 三种：left, center, right
                      fontWeight: "500", // 字体粗细
                      fontSize: "14px", // 字体大小
                      fontColor: "#1F1F1F", // 字体颜色
                      padding: "0px 0px 0px 0px", // 内边距
                      line: 5
                    },
                    attr: {},
                    type: "partial",
                    componentPositioning: "partials/span_txt",
                    remark: "[==>描述<==]", //::不参与渲染,仅作提示作用
                    content: "线上线下抽奖模块 自动生成展会、产品、营销活动、页面二维码 邮件营销模块 在线调查模块 客户信息进入K-SCRM，驱动二次营销",
                  },
                ]
              }
            ]
          },
        ],
      },
    ],
  };
}

module.exports = {
  getProductData
};

