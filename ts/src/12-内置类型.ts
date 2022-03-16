/**
 * ts中其他的内置类型，根据定义好的已有类型，演变的一些其他类型
 */
interface ICompany{
    name:string
    address:string
}

interface IPerson{
    name:string
    age?:number
    company:ICompany
}

// 表示选项是可以选填的
// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
// 深度递归
// type Partial<T> = {
//     [P in keyof T]?: T[P] extends object ? Partial<T[P]> : T[P]
// }
type MyPerson = Partial<IPerson>

// 表示去除可选之后的类型 -?
// type Required<T> = {[K in keyof T]-?: T[K]}
type MyRequired = Required<IPerson>

// Readonly 只读类型
// type Readonly<T> = {readonly [K in keyof T]: T[K]}
type MyReadonly = Readonly<IPerson>

// Pick 精挑细选 （对象里选属性） extract 抽离可用的（类型中选择类型）
// type Pick<T,K extends keyof T> = {[X in K]:T[X]}
type MyPick = Pick<IPerson,"age"|"company">

// Omit 忽略属性，两个对象合并 T&K
// type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
type MyType = Omit<IPerson,"name"> & {name:string}

// Record类型
function map<K extends keyof any, V, X>(){

}