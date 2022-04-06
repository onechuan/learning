// 实现 new Proxy(target, handler)

import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject } from "@vue/shared";
import { trigger } from "./effect";
import { TriggerOrTypes } from "./operators";
import { reactive, readonly } from "./reactive";

// 是不是只读的，只读的属性set时会报异常

function createGetter(isReadonly = false, shallow = false){
    return function get(target, key, receiver){// let proxy = reactive()
        // proxy + reflect

        // 后续Object上的方法，会被迁移到Reflect Reflect.getProptypeof()
        // 以前target[key] = value 方法设置值可能会失败，并不会报异常，也没有返回值标识
        // Reflect方法具备返回值
        // reflect使用可以不使用 proxy es6方法

        const res = Reflect.get(target, key, receiver);//target[key]
        if(!isReadonly){
            // 收集依赖，等会数据变化后更新对应的视图
            console.log("执行effect时会取值","收集effect");
            
        }

        if(shallow){
            return res
        }
        if(isObject(res)){
            // vue2 是一上来就递归，vue3是当取值时会进行代理，vue3的代理模式是懒代理
            return isReadonly ? readonly(res) : reactive(res)
        }
        return  res
    }
}

function createSetter(shallow = false){//拦截设置功能
    return function set(target, key, value, receiver){
        // 获取老的值
        const oldValue = target[key];
        let hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)
        
        const result = Reflect.set(target, key, value, receiver); //target[key] = value

        if(!hadKey){    
            // 新增
            trigger(target, TriggerOrTypes.ADD)
        }else if(hasChanged(oldValue, value)){
            // 修改
            trigger(target, TriggerOrTypes.SET,key,value,oldValue)
        }
        return result
    }

}

const get = createGetter();
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

let readonlyObj = {
    set: (target, key)=>{
        console.warn(`set on key ${key} failed`)
    }
}

export const mutableHandlers = {
    get
}
export const shallowReactiveHandlers = {
    get: shallowGet
}
export const readonlyHandlers = extend({
    get: readonlyGet
},readonlyObj)
export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet,
},readonlyObj)
