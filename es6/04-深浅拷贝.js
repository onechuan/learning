function deepClone(obj, hash = new WeakMap()){
    // 判断对象是否为null
    if(obj === null) return obj;
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    // 如果是基础数据类型
    if(typeof obj !== "object") return obj

    // 为了防止循环拷贝
    if(hash.has(obj)) return hash.get(obj)
    // 如果是对象类型，进行遍历
    const copy = new obj.constructor;
    hash.set(copy)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            copy[key] = deepClone(obj[key])
        }
    }
    return copy
}
const obj1 = {name:"yichuan",age:18,address:{
    province:"beijing",
    "city":"beijing"
}}
const obj2 = deepClone(obj1)
obj2.name = "onechuan";
console.log("obj",obj1,obj2);