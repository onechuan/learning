/**
 * ts中的兼容性，我们希望类型可以相互赋值
 * 
 * 普通类型：接口、函数、类
 */

// 1、基础类型的兼容性 默认情况下都是定义好类型后，不能赋值给其他类型
type NumberOrString = number | string // | 表示大的类型，子类型->父类型

const numOrStr: NumberOrString = "yichuan"

// 检测方式：鸭子检测，只要叫声像鸭子，就是鸭子
type MyStr = {toString():string}

// 多的条件可以赋予给少的条件，一切都是为了安全
let str: MyStr = "hello"

interface IVegetables {
    color:string
    taste:string
}

// 将一个值赋值类型，是不会出现兼容性的，要求满足这个接口，两个接口之间是存在兼容性问题
interface ITomato {
    color:string
    taste:string
    size:string
}

// let vegetables!: IVegetables;

// let tomato!: ITomato

let vegetables: IVegetables;
let tomato = {
    color:"red",
    taste:"sour",
    size:"big"
}

// 通过接口的兼容性，可以处理赋予多的属性
vegetables = tomato

// 3、函数兼容性 (1)函数的参数 和 返回值，类型的兼容、类型的赋值可能会发生兼容性处理

// 针对参数的个数做兼容性处理
let sum1 = (x: string,y: string)=> x + y
let sum2 = (x: string): string => x

sum1 = sum2


function forEach<T>(arr:T[],cb:(item:T,index:number,arr:T[])=>void){
    for(let i = 0; i < arr.length; i++){
        cb(arr[i],i,arr)
    }
}

// 针对参数的类型做兼容性处理
// 逆变和协变：函数的参数是逆变的可以传递父类，函数返回值是协变的可以返回子类

class Parent{
    money!:string;
}
class Child extends Parent{
    house!:string;
}
class Grandson extends Child{
    eat!:string;
}

// 对于参数而言，子类可以处理父类的属性和方法
function getFn(cb:(person: Child)=>Child){

}
getFn((person: Parent)=>{
    return new Grandson()
})

/**
 * 对于函数的参数是联合类型的时候
 * 1.并集 可以用少的赋值给多的 string|number=>number、string
 * 2.多的属性可以赋值给少的属性
 * 3.函数的参数个数少的可以赋值给个数多的
 */

export {}