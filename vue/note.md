## VUE3和VUE2的区别
- vue3采用monorepo方式进行管理,将模块进行拆分到package中
- vue3采用ts进行开发，支持强类型检测  vue2采用的是flow
- vue3的性能优化,支持tree-shaking,不使用不会被打包
- vue2后期引用了RFC，使得每个版本可控

## 内部代码优化
- Vue3的劫持数据使用的是proxy，vue2是defineProperty defineProperty有性能缺陷，会给每个对象增加set、get
- vue3采用了模板编译优化，编译时生成Block Tree，可以对子节点的动态节点进行收集，可以减少比较，并且采用patchFlag标记动态节点
- Vue3采用CompositionAPI进行组织功能，解决了反复横跳的问题，优化复用了逻辑（解决了mixin带来的数据来源不清晰，命名冲突等问题），相比options API进行类型推断更加方便
- 增加了Fragment、Teleport、Suspense组件

## Vue3架构分析
### 1.Mo

### 2.Vue3项目结构
- reactive：响应式系统
- runtime-core：与平台运行无关的核心代码，可以针对特定平台的运行时-自定义渲染器
- runtime-dom：针对浏览器的运行时，包括DOM API、属性、事件处理等
- runtime-test：用于测试
- server-renderer：用于服务端渲染
- compiler-core：与平台无关的编译器核心
- compiler-dom：针对浏览器的编译模块
- compiler-ssr：针对服务端渲染的编译模块
- compiler-sfc：针对单文件解析
- size-check：用来测试代码体积
- template-explore：用于调试编译器输出的开发工具
- shared：多个包之间的共享内容
- vue：完整版本，包括运行时和编译时