/**
 * 类 最早是用构造函数来替代的，es6类的概念
 */
class Pointer{
    // 声明的变量会被增加到实例上
    // x: number
    // y: number
    // 在constructor中的操作都是初始化操作
    // 此函数中依然可以使用 剩余运算符、可选参数、默认参数
    // 传入的实例直接放在实例上，无需再次声明
    // constructor(x:number,y:number){
    //     // 赋值
    //     this.x = x;
    //     this.y = y;
    // }
    // 当然你也可以不写上面的，直接在constructor写
    constructor(public x:number, public y:number){}
}

const p = new Pointer(100,100)
console.log(p);

/**
 * public 是公共属性修饰符，全局可以获取到
 * protected 是受保护的，只有当前类和子类才能获取
 * private 是类私有的，只有当前类可以获取，后代也不可获取
 * readonly 是只读属性，如果在初始化完毕后不能够在实例化后的对象中进行修改了，对于对象是可以修改的
 * 
 * 可以给构造函数添加修饰符，如果被标识成protected说明不能够被new创建实例，如果标识了private表明不能够被继承，同事不能被new
 */
class Animal{
    public readonly n :number = 1
    protected constructor(public name: string, public age: number){
        this.n = 100
        console.log("n",this.n);
    }
    // static type = "哺乳动物";//静态属性 es7语法
    // 静态方法可以被子类继承
    static get type(){//属性访问器
        return "哺乳动物"
    }
    static getName(){
        return "动物"
    }
    say(){
        console.log("旺旺");
        
    }
}
// 可以通过类.属性名直接获取
console.log(Animal.type);//哺乳动物


class Dog extends Animal{
    constructor( name: string,  age: number, address: string){
        // super默认在构造函数中和静态方法中都指向自己的父类
        super(name,age);
    }
    // static type = "犬科动物";
    static getName(){
        console.log(super.getName());
        return "狗"
    }
    // 原型方法中的super指向父类原型
    say(){
        super.say()
    }
    // 私有属性 外部不能直接访问，只能通过固定的方法使用 setter getter
    private str: string = "bobo";
    get content(){
        return this.str
    }
    set content(newVal: string){
        this.str = newVal
    }

}

const dog = new Dog("herry",19,"beijing")
// dog.n  = 200
console.log("dog",dog, Dog.type);
dog.say()
dog.content = "bibi";
console.log(dog.content);//bibi

