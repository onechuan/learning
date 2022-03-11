
// Symbol 独一无二的类型，通常用作对象的key

let s1 = Symbol("jw");
let s2 = Symbol("jw");
console.log(s1 === s2);

let obj = {
    name:"zf",
    age:12,
    [s1]:"ok"
}

// Symbol 默认是不可以进行枚举的
for(let key in obj){
    console.log(obj[key]);
}

// 获取所有symbol
console.log(Object.getOwnPropertySymbols(obj));
//获取普通类型的key
console.log(Object.keys(obj));
// [ 'name', 'age' ]


let s3 =  Symbol.for("jw");//声明全新的
let s4 =  Symbol.for("jw");//后面进行复用
console.log("s3",s3,"s4",s4);


// typeof 判断类型 基本类型，判断类型时 Object.prototype.toString.call()
let obj2 = {
    [Symbol.toStringTag]:"jw"
}
console.log(Object.prototype.toString.call(obj2));

// 隐式类型转换
let obj3 = {
    [Symbol.toPrimitive](type){
        return "123"
    }
}
console.log(obj3+1);

let instance = {
    [Symbol.hasInstance](value){
        return "name" in value
    }
}
// __proto__实现一个instanceof
console.log({name:"yichuan"} instanceof instance);