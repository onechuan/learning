
/**
 * 把对象的属性 全部转化成getter+setter，遍历所有对象，用Object.defineProperty宠幸定义属性，性能不好
 * 如果是数组 采用这种方式，性能很差
 * 如果对象里面嵌套对象，需要进行递归处理
 */


const obj = {};

Object.defineProperty(obj,"user",{
    // 描述符号
    enumerable:true,//是否可枚举
    configurable:false,//是否可编辑
    value:"yichuan",//值
    set(newValue){
        val = newValue
    },
    get(){
        return val
    }
})
obj.user = "onechuan";
delete obj.user
console.log(obj.user);

// proxy是es6的api，不用改写原对象，但是兼容性差
const proxy = new Proxy(obj,{
    // 没有对obj的属性进行重写，而且不需要递归+放访问到的属性是对象时再进行代理即可
    get(){

    },
    set(){

    },
    has(){

    }
})