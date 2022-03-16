
// rollup默认只支持es6语法，只有es6才能做到tree shaking

/**
 * ts为了支持commonjs语法，单独提出了一个导出方式 export = / import x = require("")
 * 用ts的时候除非你引用了的模块不是ts写的，我们可以使用require直接使用
 * 如果模块是ts写的，那就需要import x = require("")
 * 如果是es6模块，全部使用export default export {} / import 即可
 * 
 * es6模块和cjs模块不兼容，有可能包是cjs打包出来的结果，es6引入会出问题
 * 为了解决这个问题，ts生成了新语法export = 
 *
 */


// 有的时候在开发引入的一些第三方模块，我们发现不是ts进行编写的
// 如果当前模块有ts写的，需要进行安装引入`npm i --save-dev @types/jquery`
// 如果没有，那么我们需要在.d.ts文件进行声明`declare module 'jquery`，此声明是单纯为了避免报错，没有任何意义
// 声明语法用于在引用第三方模块时，无法找到变量的类型，通过declare后使用
// declare默认不需要导出，因为.d.ts文件的声明默认就是全局的

/**
 * declare名字可能存在冲突
 * interface同名默认会进行合并，命名空间也可能
 */
import jquery from "jquery"

// unknown是any的安全类型
let u: unknown = 1;//unknown不能通过属性变量取值，为了安全性

// unknown和其他类型在联合类型都是unknown类型
// unknown和其他类型 交叉类型都是其他类型
type x = boolean & unknown

// keyof any 但是不能使用keyof unknown