import {isObject} from "@vue/shared"
import { 
    mutableHandlers, 
    shallowReactiveHandlers, 
    readonlyHandlers,
    shallowReadonlyHandlers 
} from "./baseHandlers"

export function reactive(target){
    return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive(target){
    return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function readonly(target){
    return createReactiveObject(target, true, readonlyHandlers)
}

export function shallowReadonly(target){
    return createReactiveObject(target, true, shallowReadonlyHandlers)
}

// 是不是只读 是不是深度 使用柯里化
// new Proxy()最核心的是需要拦截，数据的读取和修改
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
export function createReactiveObject(target, isReadonly, baseHandlers){
    // 判断是否为对象类型 reactive只能拦截对象类型
    if(!isObject(target)){
        return target
    }

    const proxyMap = isReadonly ? readonlyMap : reactiveMap;

    // 判断是否存在代理
    const existProxy = proxyMap.get(target);
    if(existProxy){
        return existProxy;//如果已经进行代理直接进行返回即可
    }
     // 如果某个对象已经被代理过，那么就不需要再次代理了，可能一个对象被深度代理，又被只读代理
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);//将要代理的对象，和对应代理结果缓存起来

   
    return proxy
}