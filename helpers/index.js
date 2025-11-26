/**
 * Handlebars 自定义 Helpers
 */

module.exports = {
  /**
   * 相等比较
   * 用法: {{#if (eq value1 value2)}}...{{/if}}
   */
  eq: (a, b) => a === b,

  /**
   * 不等比较
   * 用法: {{#if (ne value1 value2)}}...{{/if}}
   */
  ne: (a, b) => a !== b,

  /**
   * 大于比较
   * 用法: {{#if (gt value1 value2)}}...{{/if}}
   */
  gt: (a, b) => a > b,

  /**
   * 小于比较
   * 用法: {{#if (lt value1 value2)}}...{{/if}}
   */
  lt: (a, b) => a < b,

  /**
   * 大于等于比较
   * 用法: {{#if (gte value1 value2)}}...{{/if}}
   */
  gte: (a, b) => a >= b,

  /**
   * 小于等于比较
   * 用法: {{#if (lte value1 value2)}}...{{/if}}
   */
  lte: (a, b) => a <= b,

  /**
   * 逻辑与
   * 用法: {{#if (and value1 value2)}}...{{/if}}
   */
  and: (a, b) => a && b,

  /**
   * 逻辑或
   * 用法: {{#if (or value1 value2)}}...{{/if}}
   */
  or: (a, b) => a || b,

  /**
   * 逻辑非
   * 用法: {{#if (not value)}}...{{/if}}
   */
  not: (a) => !a,

  /**
   * 日期格式化
   * 用法: {{formatDate date "YYYY-MM-DD"}}
   */
  formatDate: (date, format) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return (format || 'YYYY-MM-DD')
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },

  /**
   * 字符串截取
   * 用法: {{truncate text 100}}
   */
  truncate: (str, length) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },

  /**
   * 大写转换
   * 用法: {{uppercase text}}
   */
  uppercase: (str) => {
    return str ? str.toUpperCase() : '';
  },

  /**
   * 小写转换
   * 用法: {{lowercase text}}
   */
  lowercase: (str) => {
    return str ? str.toLowerCase() : '';
  },

  /**
   * 首字母大写
   * 用法: {{capitalize text}}
   */
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * 数字格式化（添加千分位）
   * 用法: {{formatNumber 1234567}}
   */
  formatNumber: (num) => {
    if (num === null || num === undefined) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * JSON 字符串化
   * 用法: {{json object}}
   */
  json: (obj) => {
    return JSON.stringify(obj, null, 2);
  },

  /**
   * 数组长度
   * 用法: {{length array}}
   */
  length: (arr) => {
    return Array.isArray(arr) ? arr.length : 0;
  },

  /**
   * 数组索引
   * 用法: {{#each items}}{{inc @index}}{{/each}}
   */
  inc: (value) => {
    return parseInt(value) + 1;
  },

  /**
   * 数字减法
   * 用法: {{subtract 10 3}} => 7
   */
  subtract: (a, b) => {
    return a - b;
  },

  /**
   * 数字除法
   * 用法: {{divide 10 2}} => 5
   * 支持带单位的字符串: {{divide "20px" 2}} => "10px"
   */
  divide: (a, b) => {
    if (typeof a === 'string') {
      // 处理带单位的字符串（如 "20px", "10rem"）
      const match = a.match(/^([\d.]+)(.*)$/);
      if (match) {
        const num = parseFloat(match[1]);
        const unit = match[2] || '';
        return (num / b) + unit;
      }
    }
    return a / b;
  },

  /**
   * 数组包含检查
   * 用法: {{#if (contains array value)}}...{{/if}}
   */
  contains: (array, value) => {
    if (!Array.isArray(array)) return false;
    return array.includes(value);
  },

  /**
   * 默认值
   * 用法: {{default value "默认值"}}
   */
  default: (value, defaultValue) => {
    return value || defaultValue;
  },

  /**
   * 多次重复
   * 用法: {{#times 5}}...{{/times}}
   */
  times: function(n, options) {
    let result = '';
    for (let i = 0; i < n; i++) {
      result += options.fn(i);
    }
    return result;
  },

  /**
   * 条件判断（三元运算符）
   * 用法: {{ternary condition "真值" "假值"}}
   */
  ternary: (condition, trueValue, falseValue) => {
    return condition ? trueValue : falseValue;
  },

  /**
   * URL 编码
   * 用法: {{encodeURI url}}
   */
  encodeURI: (str) => {
    return encodeURIComponent(str || '');
  },

  /**
   * 百分比计算
   * 用法: {{percentage 25 100}} => 25%
   */
  percentage: (value, total) => {
    if (!total || total === 0) return '0%';
    return Math.round((value / total) * 100) + '%';
  },

  /**
   * 数组切片
   * 用法: {{#slice array 0 3}}...{{/slice}}
   */
  slice: function(array, start, end, options) {
    if (!Array.isArray(array)) return '';
    const sliced = array.slice(start, end);
    let result = '';
    sliced.forEach((item, index) => {
      result += options.fn(item, { data: { index } });
    });
    return result;
  },

  /**
   * 奇偶判断
   * 用法: {{#if (isEven @index)}}偶数{{else}}奇数{{/if}}
   */
  isEven: (num) => {
    return num % 2 === 0;
  },

  /**
   * 奇数判断
   * 用法: {{#if (isOdd @index)}}奇数{{else}}偶数{{/if}}
   */
  isOdd: (num) => {
    return num % 2 !== 0;
  },

  /**
   * 拼接字符串
   * 用法: {{concat "Hello" " " "World"}}
   */
  concat: (...args) => {
    args.pop(); // 移除 Handlebars options 对象
    return args.join('');
  },

  /**
   * 替换字符串
   * 用法: {{replace text "old" "new"}}
   */
  replace: (str, search, replace) => {
    if (!str) return '';
    return str.replace(new RegExp(search, 'g'), replace);
  },

  /**
   * 数组排序
   * 用法: {{#sort array "name"}}...{{/sort}}
   */
  sort: function(array, key, options) {
    if (!Array.isArray(array)) return '';
    const sorted = [...array].sort((a, b) => {
      if (key) {
        return a[key] > b[key] ? 1 : -1;
      }
      return a > b ? 1 : -1;
    });
    let result = '';
    sorted.forEach((item, index) => {
      result += options.fn(item, { data: { index } });
    });
    return result;
  },

  /**
   * 数组反转
   * 用法: {{#reverse array}}...{{/reverse}}
   */
  reverse: function(array, options) {
    if (!Array.isArray(array)) return '';
    const reversed = [...array].reverse();
    let result = '';
    reversed.forEach((item, index) => {
      result += options.fn(item, { data: { index } });
    });
    return result;
  },

  /**
   * 解析宽高比字符串为数字
   * 用法: {{parseAspectRatio "1/1"}} => 1
   * 用法: {{parseAspectRatio "16/9"}} => 1.777...
   */
  parseAspectRatio: (ratio) => {
    if (typeof ratio === 'number') return ratio;
    if (typeof ratio !== 'string') return 1;
    const match = ratio.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (match) {
      const numerator = parseFloat(match[1]);
      const denominator = parseFloat(match[2]);
      return denominator !== 0 ? numerator / denominator : 1;
    }
    return parseFloat(ratio) || 1;
  }
};

