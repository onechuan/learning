module.exports = {
    // 配置文件是可以继承的
    // root是根配置文件
    // root:true,
    // 自己写eslint规范太麻烦了，对此可以进行继承别人写好的
    extends:"airbnb",
    parser:"babel-eslint",
    parserOptions:{
        sourceType:"module",
        ecmaVersion:2015
    },
    env:{
        browser:true,
        node:true
    },
    // 启用的规则和各自错误的级别 自定义的可以覆盖继承的规则
    rules:{
       "no-console":"off",
       "no-unused-vars":"off",
       "no-constant-condition":"off"
    }
}