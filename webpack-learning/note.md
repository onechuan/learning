

## 2.5 JS兼容性处理
- Babel其实是一个编译Javascript的平台，可以将es6/es7、React的JSX转义为es5
  
### 2.5.1 @babel/preset-env
- Babel默认只转换新的es语法，比如箭头函数

#### 2.5.1.1 安装依赖
- babel-loader使用Babel和Webpack转义JS文件
- @babel、@babel/core 是Babel编译的核心包
- babel-preset-env 
- @babel、@babel/preset-react插件的babel预设
- @babel/plugin-proposal-decorators把类和对象装饰器转义为es5
- @babel/plugin-proposal-class-properties转换静态类属性以及使用属性初始值化语法声明的属性

```cmd
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```

注意loader和@babel的区别：
- loader本质上是一个函数，接收的是原来的内容，返回新的转义后的内容
- @babel-preset-env 指的是具体的转换规则
- babel预设是因为：有些文件进行转义时需要依赖几百个插件，把这些插件打包成一个包，就被成为一个预设preset

#### 2.5.1.2 配置文件

eslint-loader
```cmd
npm i eslint-config-airbnb eslint-loader eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y -D
```

## 2.7 source-map
- source-map是为了解决开发代码与实际运行代码不一致时，帮助我们debug到原始开发代码的技术
- webpack通过配置可以自动给我们source-map文件，map文件是一种对应编译文件和源文件的方法
- whyeval可以单独缓存map，重建性能更高
  
|类型|含义|
|source-map|原始代码 最好的source-map质量有完整的结果，但是会很慢|
|eval-source-map|原始代码 同样道理，但是是最高的质量和最低的性能|
|cheap-module-eval-source-map|原始代码（只有行内）同样道理，但是有更高的质量和更低的性能|
|cheap-eval-source-map|转换代码(行内) 每个模块被eval执行，并且sourcemap作为eval的一个dataurl|
|eval|生成代码，每个模块都被eval执行，并且存在@sourceURL,带有eval的构建模式能够cache SourceMap|
|cheap-source-map|转换代码(行内) 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用|
|cheap-module-source-map|原始代码(只有行内) 与上面一样除了每行特点的从loader中进行映射|