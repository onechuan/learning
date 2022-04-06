import { isArray, isIntegerKey } from "@vue/shared";
import { TriggerOrTypes } from "./operators";


// 副作用函数会默认执行一次，会进行取值操作，只要取值就会调用get方法，可以使用effect函数进行存储 只有数据变化才会重新执行
export function effect(fn, options:any = {}){
    // 我需要让这个effect变成响应的effect，可以做到数据变化重新执行
    const effect = createReactiveEffect(fn, options);

    if(!options.lazy){//默认的effect会先执行
        effect();//响应式的effect默认会执行一次
    }

    return effect
}

let uid = 0;
let activeEffect;//存储当前的effect
const effectStack = []
function createReactiveEffect(fn, options){
    const effect = function reactiveEffect(){
        // 判断当前执行栈中是否此副作用函数，保证不会重复执行
        if(!effectStack.includes(effect)){
            try{
                activeEffect = effect;
                effectStack.push(activeEffect)
                // 函数执行时会取值，会执行get方法
                return fn()
            }finally{
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
        
    }
    effect.id = uid++;//制作一个effect标识，用于区分effect
    effect._isEffect = true;//用于标识这个是响应式effect
    effect.raw = fn;//保留effect对应的原函数
    effect.options = options;//在effect上保护用户的属性
    return effect;
}

// 让某个对象中的属性，收集当前它对应的effect函数
// 可以拿到当前的effect
const targetMap = new WeakMap()
export function track(target, type, key){
    // 当前正在运行的effect
    // activeEffect;
    if(activeEffect === undefined){//此属性不用收集依赖，因为没在effect中使用
        return
    }
    let depsMap = targetMap.get(target);
    if(!depsMap){
        targetMap.set(target, depsMap= new Map())
    }
    let dep = depsMap.get(key);
    if(!dep){
        depsMap.set(key,dep=>new Set());
    }
    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
    }
}

export function trigger(target, type,key?,value?,oldValue?){
    // 如果这个属性没有收集过effect，那么不需要做任何操作
    const depsMap = targetMap.get(target);
    if(!depsMap) return
    
    const effects = new Set();
    const add = effectsToAdd => {
        if(effectsToAdd){
            effectsToAdd.forEach(effect => effects.add(effect));
        }
    }
    // 将所有要执行的effect全部存到一个新的集合中，最终一块执行

    // 1. 看修改的是不是数组的长度，因为改变长度影响比较大
    if(key === "length" && isArray(target)){
        // 如果对应的长度，有依赖收集需要更新
        depsMap.forEach((dep, key) => {
            // 如果更改的长度小于收集的索引，那么这个索引也需要触发effect重新执行
            if(key === "length" || key > value){
                add(dep);
            }
        });
    }else{
        // 可能是对象
        if(key !== undefined){
            // 这里肯定是修改，不能是新增
            add(depsMap.get(key))
        }

        // 如果修改数组中的某个索引
        switch(type){
            // 如果添加了一个索引就触发长度的更新
            case TriggerOrTypes.ADD:
                if(isArray(target) && isIntegerKey(key)){
                    add(depsMap.get("length"))
                }

        }
    }
    console.log(effects);
    effects.forEach((effect:any)=>effect())
    
}