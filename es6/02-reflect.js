// 后续新增的方法都放在Reflect上->Object

let s1 = Symbol("jw");
let obj = {
    name:"zf",
    age:12,
    [s1]:"ok"
}
// 获取所有的key属性
Reflect.ownKeys(obj).forEach(item=>{
    console.log(item);
})

// Object.defineProperty -> Reflect
// Reflect.get Reflect.set Reflect.delete


const fn = (a,b)=>{
    console.log("a,b",a,b);
}

fn.apply = function(){
    console.log("apply");
}

// 调用函数本身的apply方法如何调用，call的功能是让apply方法中的this指向fn，并让apply方法执行
// fn.apply(null,[1,2])
// call的作用：
// 1.让函数执行 即apply执行
// 2.改变apply中的this指向fn
// Function.prototype.apply.call(fn,null,[1,2])

Reflect.apply(fn,null,[1,2])