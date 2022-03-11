/**
 * 装饰器 是一个实验性语法，后面会有改动 需要设置experimentalDecorators为true
 * 
 * 装饰器的作用就是用于扩展类，扩展类中的属性和方法，不能修饰函数，函数会有变量提升的问题
 * 
 * @addSay //等价于addSay2(addSay1(addSay(Person)))
*  @addSay1
* @addSay2("inner")
class Person{

}


function addSay(target:any){
    console.log(0);
    
}
function addSay1(target:any){
    console.log(1);
    
}
function addSay2(target:any){
    console.log(target);
    
    return function(val:any){
    }
}
 */



function eat(target:any){
    // 在target对象的原型添加方法
    target.prototype.eat = function(){
        console.log("eat"); 
    }
}

// target指的是类的原型
function toUpperCase(target:any,key:string){
    let val: string = ""
    Object.defineProperty(target,key,{
        get(){
            return val
        },
        set(newVal:string){
            console.log(newVal);
            
            val = newVal
        }
    })
}

function double(num:number){
    
    // target是类
    return function(target:any,key:string){
        let v = target[key]
        Object.defineProperty(target, key,{
            get(){
                return v * num
            }
        })
    }
}

function enums(bool:boolean){
    return function(target:any, key:string, descriptor: PropertyDescriptor){
        // 打印的是对象的属性
        console.log(descriptor);
        descriptor.enumerable = bool
    }
}

@eat
class Person{
    eat!:()=>void
    
    @toUpperCase
    public name: string ="oenchuan";//放在this上，不会放在原型上

    @double(2)
    static age: number = 18;//静态属性，通过类名进行调用

    @enums(false)
    drink(){
        console.log("喝酒了");
    }
}
let p = new Person();
p.eat();
p.drink()
console.log(p.name,Person.age,Person);


export {}