/**
 * 命名空间 js中是默认没有命名空间的，最早实现命名空间是进行字面量命名个对象
 * 
 * 命名空间解决的问题是：命名的冲突，（调用过程的问题，可能还是有命名的问题）
 * 
 * ts是自己实现了命名空间
 * 命名空间的内容默认是在外面访问不到的，如果需要使用则需要进行导出
 * 
 * 内部模块：使用命名空间来声明，解决同一个文件下的命名冲突问题，注意module使用的时候，最终还是希望你能携程namespace
 * 
 * 两个重名的命名空间会进行合并，但是合并后重名的会报错
 * module 命名空间可以进行无限嵌套
 * 
 * 空的命名空间会自动被忽略
 * 
 * 命名空间就是通过自执行函数来实现的，我们一般写代码不会使用
 */


namespace Home1{
    // 命名空间的内容需要导出
    export class Dog{  
       
    }
    export namespace Graden{
        export const name = "花园"
    }
}

Home1.Graden.name

namespace Home2{
    class Dog{

    }
    export const str = "yichuan"
}

console.log(Home2.str);

// namespace/module，我们称之为内部模块
// import/export 我们称之为外部模块
