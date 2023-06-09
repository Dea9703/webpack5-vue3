module.exports = {
  // 环境设置，环境里面没有的不能使用
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // // 继承，可以在这里继承那些配置好的规范，不再需要一条条的去手写
  extends: [
    // 继承的插件（需要在 plugins 中注册）
    'plugin:vue/strongly-recommended'
  ],
  // 插件，额外的 rules + 提供一套现成的规范
  plugins: [
    'vue'
  ],
  parserOptions: {
    ecmaVersion: 12, // 指定使用的 es 版本
    sourceType: 'module', // 模块化
    ecmaFeature: { // 额外语言特性
      jsx: true
    }
  },
  // 在这里编写eslint校验规则，会覆盖 extends 里面继承的规则
  rules: {
    /**
    * 0 or off：关闭检查
    * 1 or warn: 检查警告
    * 2 or error：检查报错
    */
    'semi': [ 'error', 'never' ],
    'quotes': [ 'error', 'single' ],
    'no-mixed-spaces-and-tabs': 'error',
    // 不是2个空格缩进报错
    'indent': [ 'error', 2 ],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    'key-spacing': 'error',
    'eol-last': [ 'error', 'always' ],
    'object-property-newline': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'object-curly-newline': [ 'error', {
      'multiline': true,
      'minProperties': 3
    } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'array-element-newline': [
      'error',
      'consistent',
      {
        'minItems': 3,
        'multiline': true
      }
    ],
    'comma-spacing': [ 'error', {
      'before': false,
      'after': true
    } ],
    'comma-dangle': [ 'error', 'never' ],
    'function-paren-newline': [ 'error', { 'minItems': 5 } ],
    'no-empty-function': 'error',
    'keyword-spacing': [ 'error', { 'after': true } ],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': [ 'error', {
      'words': true,
      'nonwords': false
    } ],
    'spaced-comment': [ 'error', 'always' ],
    'semi-spacing': [ 'error', {
      'before': false,
      'after': true
    } ],
    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'arrow-spacing': 'error',
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': [ 'off', {
      'ignoreWhenNoAttributes': true,
      'ignoreWhenEmpty': true
    } ],
    'vue/max-attributes-per-line': [ 'error', {
      'singleline': { 'max': 4 },
      'multiline': { max: 3 }
    } ]
  }
}
