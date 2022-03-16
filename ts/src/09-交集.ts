
/**
 * 交叉类型 = 交集
 * 如果两个类型定义的同一个变量存在两个不同的类型，那么相交的结果为never
 */

interface Person1 {
    handsome: string
}

interface Person2 {
    height: string
}

// | 并集 & 交集 (交集可以理解成 函数所有属性)
type Person3 = Person1 & Person2;

const person: Person3 = {
    handsome: "yichuan",
    height:"180"
}

// 在原有的类型基础上想去扩展属性，可以用交叉类型
// ts的核心为了安全

// 类型兼容 ?
type Person4 = Person2 & {money: string}
let person4: Person4 = {
    ...person,
    money: "有钱"
}

const p: Person2 = person;

// 方法的mixin 默认推断会生成交集
function mixin<T extends object, K extends object>(x:T,y:K){
    return {
        ...x,
        ...y
    }
}

// 后续会真正合并属性的时候，是以一方为基础，不会直接相交，可能会导致never情况
const mix = mixin({
    name:"yichuan",
    age:12
},{
    address:"Beijing",
    name:"onechuan"
})

export {}
