/**
 * 类型保护：主要依靠js的特性 和 ts自带的功能
 * 
 * typeof instanceof in (ts 可识别类型 is语法 完整性保护 null保护)
 */

// 1、typeof 区分类型保护变量
function fn(val: string | number){
    if(typeof val === "string"){
        val.match
    }else{
        val.toFixed
    }
}

// 2、instanceof
class Person{
    eat(){}
}
class Dog{}

const createClass = (clazz:new ()=> Person | Dog)=>{
    return new clazz
}
let r = createClass(Person)
if(r instanceof Person){
    r.eat //Person
}else{
    r //Dog
}

// 3、in语法
interface Fish{
    swimming: string;
}

interface Bird{
    flying: string;
}

// keyof 取的是类型
function getAnimalType(animal: Fish | Bird){
    if("swimming" in animal){
        animal.swimming
    }else{
        animal.flying
    }
}

// 以上情况都可以通过js语法进行判断，可以增加字面量类型来进行判断 可识别类型
interface IButton{
    color:"yellow"//可识别类型
    class:string
}
interface IButton1{
    color:"blue"
    class:string
}

function getButton(button:IButton | IButton1){
    if(button.color === "yellow"){
        button
    }else{
        button
    }
}

// is语法  用于定义自己的类型
function isString(val: any): val is string{//根据函数的返回值，确定是不是string类型
    // 是不是某个类型，得看这个值是否兼容这个类型，再进行判断，把判断的值作为最终结果
    return Object.prototype.toString.call(val) === "[object String]"
}
let str = 1
if(isString(str)){
    str
}

// ts语法为了有类型提示，不会关心js怎么执行的

// null保护 val!=null ! ?
function getNum(val?: number | null){
    val = val || 0;
    val.toFixed //明确出来是数字
    function inner(){
        // val存在局部作用域 内层函数进行类型判断的时候可能不正确
        if(val !== null){
            val?.toFixed()
        }
    }
    inner()
}

// 代码的完整性保护 主要靠的是never 利用never无法达到最终结果的特性，来保证代码的完整性
interface ISquare{
    kind: "square"
    width:number
}

interface IRant{
    kind: "rant"
    width:number
    height:number
}

interface ICircle{
    kind: "circle"
    r: number
}

const assent = (obj:never)=>{
    throw new Error("err")
}
function getArea(obj: ISquare | IRant | ICircle){
    switch(obj.kind){
        case "square":
            return obj.width ** 2
        case "rant":
            return obj.width * obj.height
        case "circle":
            return Math.PI * obj.r ** 2
        default:
            assent(obj)
    }
}
const obj = {
    width: 12,
    height: 12,
    r: 12
}
console.log(getArea({kind: "circle", r : 10}));

export {}
