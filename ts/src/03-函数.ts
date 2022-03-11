/**
 * js的默认值和可选参数不能够一起使用
 */
const sum1 = (x:number,y?:number,...args:number[]):number=>{
    return x + (y as number);
}
console.log(sum1(1,2,3,4,5));


/**
 * 一个方法 根据参数的不同实现不同的功能，ts目的就是根据不同的参数返回类型
 */
function toArray(value: string):string[]
function toArray(value: number):number[]
// 重载方法在真是方法的上面
function toArray(value:string|number){
    if(typeof value === "string"){
        return value.split("");
    }else{
        return value.toString().split("").map(item=>Number(item))
    }
}
console.log(toArray("abc"));

export{}