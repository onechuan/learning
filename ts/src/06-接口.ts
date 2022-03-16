/**
 * interface 用于描述对象的形状和结构，可以给数据增加类型，而且方便复用
 * type 是通过别名进行重新定义类型
 * 
 * 
 * interface 可以被类实现和继承，type没有此功能
 * type 可以使用联合类型
 * interface不能使用联合类型
 */

// 1、如何使用接口描述对象类型，如果有联合类型 就使用接口
interface IObj {
    name:string
    age:number
} 
const getObj = (obj:IObj)=>{
    
}

// 2、指定函数类型
interface ISum {
    (num1: number, num2: number):number
}

type TSum = (num1:number,num2:number)=>number

const sum: ISum = (num1,num2)=>{
    return num1+num2
}

const sum2: TSum = (num1,num2)=>{
    return num1+num2
}

// 3.接口中的混合数据类型
// 实现一个累加
interface ICount {
    (): number;
    count: number;
}

// 函数返回返回，一般需要进行as断言函数的返回类型
const fn: ICount = (()=>{
    return fn.count++
})  as ICount;

fn.count = 0;
console.log(fn());

// 4、接口的特性
interface IAnimal{
    name:string;
    age:number;
}

// 对于接口上没有定义的属性
// 4-1、可以使用类型断言
const dog: IAnimal = {
    name:"bobo",
    age:18,
    address:"北京"
} as IAnimal

// 4-2、可以使用继承
interface IDog extends IAnimal{
    address:string
}

const dog2: IDog = {
    name:"bobo",
    age:18,
    address:"北京"
}

// 4-3、可以使用可选类型
interface ICat {
    name: string;
    age: number;
    [key: string]: any;
}

const cat: ICat = {
    name:"bobo",
    age:18,
    address:"北京"
}

// 4-4、可索引接口
interface ITomato{
    [key: number]: any;
}

const tomato: ITomato = [1,2,3]
const potato: ITomato = {1:2,2:2}


// 可以用接口来描述实例

// 单例模式
let instance;
function createInstance(){
    
}



export{}