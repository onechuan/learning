# interface和type有什么区别吗？
当我们使用 TypeScript时，就会用到 interface和type去描述对象的形状和结构，平时感觉他们用法好像是一样的，有区别又好像没有的感觉。这两个概念对于多数人而言还是有点容易混淆，那么这篇文章带领你去看看他们的异同。

## interface和type

interface用于描述对象的形状和结构，可以给数据增加类型，而且方便进行复用。而type是通过别名进行重新定义类型的，类型别名指的是为类型创建新名称，需要注意的是，我们并没有定义一个新类型。。**两者是对接口定义的两种不同形式，目的都是在于定义对象的形状和结构。**

但是，两者还是有些许差别：
- interface和type都能够被扩展，interface可以拓展type，但是type不能继承interface
- 类可以以相同的方式实现(implements)接口或类型别名，但类不能实现使用类型别名定义的联合类型。
- type 可以使用联合类型和交集，interface 不能使用联合类型和交集组合
- 类型别名声明可用于任何基元类型、联合或交集。在这方面，interface被限制为对象类型和函数签名。
- interface可以实现声明合并，type不能实现声明合并

### 使用interface和type描述对象的形状和结构
```ts
interface ISum {
    (num1: number, num2: number):number
}
const sum: ISum = (num1,num2)=>{
    return num1+num2
}


type TSum = (num1: number, num2: number)=>number
const sum2: TSum = (num1,num2)=>{
    return num1+num2
}
```

### 如果有联合类型，就使用type
```ts
interface IUser{
    name:string
    age:number
}

interface IStudent{
    university: string
}

// Error: 不能使用interface进行联合类型，不存在interface IPerson = IUser | IStudent;
type TPerson = IUser | IStudent;
```




### type 可以使用联合类型和交集，interface 不能使用联合类型和交集组合
```ts
type TPersonA = {
    name: string
}
type TPersonB = {
    age: number
}
// 交集
type PartialPerson = TPersonA & TPersonB;
// 并集 联合类型
type PartialPerson = TPersonA | TPersonB;
```
### interface的特性
对于接口上没有定义的属性，可以使用以下方法进行声明：

1、使用类型断言
```ts
interface IPerson{
    name:string;
    age:number;
}

const pingping: IPerson = {
    name:"pingping",
    age:18,
    address:"北京"
} as IPerson
```

2、可以使用继承
```ts
interface IPerson{
    name:string;
    age:number;
}

interface IUser extends IPerson{
    address:string
}

const pingping: IUser = {
    name:"pingping",
    age:18,
    address:"北京"
}
```
3、可以使用可选类型
```ts
interface IPerson{
    name:string;
    age:number;
    address?: string;
}

const pingping: IPerson = {
    name:"pingping",
    age:18,
    address:"北京"
}
```
4、可使用可索引接口
```ts
interface IPerson{
    name:string;
    age:number;
    [key: string]: any;
}
const pingping: IPerson = {
    name:"pingping",
    age:18,
    address:"北京"
}
```

### interface和type都能够被扩展，interface可以拓展type，但是type不能继承interface，type可以使用&联合类型来实现类似的功能
```ts
interface IPerson{
    name:string
    age:number
}

type TPerson = {
    name:string
    age:number
}

interface IStudent extends IPerson{
    university:string
}
interface IStudent extends TPerson{
    university:string
}

type TStudent = TPerson & {
    university:string
}

type TStudent = IPerson & {
    university:string
}

```

### 类可以以相同的方式实现(implements)接口或类型别名，但类不能实现使用类型别名定义的联合类型。
```ts
interface IPerson {
    name:string
    age:number
}

class User implements IPerson {
    name = "pingping";
    age = 18;
}

type TPerson = {
    name:string
    age:number
};

class User implements TPerson {
    name = "pingping";
    age = 18;
}

type PartialPerson = { name: string } | { age: number };

// A class can only implement an object type or 
// intersection of object types with statically known members.
class SomePartialPerson implements PartialPerson { // Error
    name = "pingping";
    age = 18;
}
```

### interface可以实现声明合并，type不能实现声明合并
```ts
interface IPerson{
    name: string
}
interface IPerson{
    age: number
}
const user: IPerson = {
    name: "pingping",
    age: 18
}
```

### 类型别名声明可用于任何基元类型、联合或交集。在这方面，interface被限制为对象类型和函数签名。
```ts
type TPerson = [name: string, age: number];
```
我们没有办法使用接口声明元组。不过，我们可以在接口内部使用元组
```ts
interface IPerson{
    user: [name: string, age: number]
}
```





## 参考文章
- [《使用 TypeScript 常见困惑：interface 和 type 的区别是什么？》](https://juejin.cn/post/6977147950266859557)
- [《一份不可多得的 TS 学习指南（1.8W字）》](https://juejin.cn/post/6872111128135073806#heading-43)
- [《type和interface的区别知多少？》](https://juejin.cn/post/7059725643365220366)

## 写在最后
在typescript里，还有很多容易搞混淆的概念，interface和type是最典型的，目的都是实现对象的类型和结构定义，但是又有些许不同。对于使用的建议，在库或第三方类型定义中的公共API定义，应使用interface来提供声明合并功能。除此之外，随你如何使用，但是在整个代码库中应该尽量要保持一致性。
