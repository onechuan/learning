
/**
 * 泛型的作用：在于当我调用的时候确定类型，不是一开始就写好，类型不确定，而是在执行的时候才能确定类型
 */

// 声明的时候使用<>进行包裹，传值的时候也需要，其实就是把类型作为参数传递设置
function createArray<U>(times:number,value:U){//根据对应参数的类型给T传值
    let result = [];
    for(let i = 0; i < times; i++){
        result.push(value)
    }
    return result
}
console.log(createArray<string>(18,"yichuan"));

/**
 * interface后面的类型和函数前面类型的区别在于：
 * 1.泛型放在函数前面，表示是在使用函数的时候确定类型
 * 1.泛型放在接口后面，标识是在使用接口的时候确定类型
 */
interface IMyArr<T>{
    [key:number] :T
}
interface ICreateArraySuper {
    <U>(times: number, value: U): IMyArr<U>
}
const createArraySuper:ICreateArraySuper = <U>(times:number,value:U):IMyArr<U>=>{
    let result = [];
    for(let i = 0; i < times; i++){
        result.push(value)
    }
    return result
}
console.log(createArraySuper<string>(18,"yichuan"));

// 2、多个泛型 元组进行类型交换
const swap = <T,K>(tuple:[T,K]):[K,T]=>{
    return [tuple[1],tuple[0]]
}
console.log(swap([2,"yichuan"]));


// 3、泛型约束 主要强调类型中必须包含某个属性
type withLen = {length:number}
function computeArrayLength<T extends withLen, U extends withLen>(arr1:T,arr2:U):number{
    return arr1.length + arr2.length
}
console.log(computeArrayLength([1,2,3],{length:3}));

// 
function getVal<T extends object, K extends keyof T>(obj:T,key:K){

}
type T1 = keyof {a:1,b:2}
type T2 = keyof string
type T3 = keyof any
console.log();

const arr: number[] = []
// 等价于 Array<number> number[]
interface IArray<T>{
    [key:number]:T
}

// 泛型可以给类使用
class GetArrayMax<T>{
    public arr:T[] = []
    add(val:T){
        this.arr.push(val)
    }
    getMax(){
        let arr = this.arr;
        let max = arr[0];
        for(let i = 1; i < arr.length; i++){
            arr[i] > max ? max = arr[i] : max
        }
        return max
    }
}

// 泛型只有在使用之后才能知道具体的类型
const arrss = new GetArrayMax<string>()
arrss.add("s")
arrss.add("2")
console.log(arrss.getMax());

// 泛型可以在函数、类、接口、别名 中使用

// extends 是约束，keyof 取当前类型的key，typeof取当前值的类型
interface IAnimal <T = string>{//T = string相当于是默认类型
    name: T
}
type IBoolIAnimal = IAnimal<boolean>
type INumIAnimal = IAnimal<number>

export {}