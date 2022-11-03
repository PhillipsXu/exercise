module.exports = {
    // 解析选项
    env: {
        node: true, // 启用node全局变量
        browser: true // 启用浏览器全局变量
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    // 继承规则
    extends: "eslint:recommended",
    // 具体规则
    rules: {
        "no-var": 1 // 禁止使用var
    }
}