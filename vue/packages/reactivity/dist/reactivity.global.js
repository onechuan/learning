var VueReactivity = (function (exports) {
    'use strict';

    const isObject = (value) => typeof value === "object" && value !== null;
    const extend = Object.assign;

    // 副作用函数会默认执行一次，会进行取值操作，只要取值就会调用get方法，可以使用effect函数进行存储 只有数据变化才会重新执行
    function effect(fn, options = {}) {
        // 我需要让这个effect变成响应的effect，可以做到数据变化重新执行
        const effect = createReactiveEffect(fn, options);
        if (!options.lazy) { //默认的effect会先执行
            effect(); //响应式的effect默认会执行一次
        }
        return effect;
    }
    let uid = 0;
    let activeEffect; //存储当前的effect
    const effectStack = [];
    function createReactiveEffect(fn, options) {
        const effect = function reactiveEffect() {
            // 判断当前执行栈中是否此副作用函数，保证不会重复执行
            if (!effectStack.includes(effect)) {
                try {
                    activeEffect = effect;
                    effectStack.push(activeEffect);
                    // 函数执行时会取值，会执行get方法
                    return fn();
                }
                finally {
                    effectStack.pop();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect.id = uid++; //制作一个effect标识，用于区分effect
        effect._isEffect = true; //用于标识这个是响应式effect
        effect.raw = fn; //保留effect对应的原函数
        effect.options = options; //在effect上保护用户的属性
        return effect;
    }

    // 实现 new Proxy(target, handler)
    // 是不是只读的，只读的属性set时会报异常
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            // proxy + reflect
            // 后续Object上的方法，会被迁移到Reflect Reflect.getProptypeof()
            // 以前target[key] = value 方法设置值可能会失败，并不会报异常，也没有返回值标识
            // Reflect方法具备返回值
            // reflect使用可以不使用 proxy es6方法
            const res = Reflect.get(target, key, receiver); //target[key]
            if (!isReadonly) {
                // 收集依赖，等会数据变化后更新对应的视图
                console.log("执行effect时会取值", "收集effect");
            }
            if (shallow) {
                return res;
            }
            if (isObject(res)) {
                // vue2 是一上来就递归，vue3是当取值时会进行代理，vue3的代理模式是懒代理
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    const get = createGetter();
    const shallowGet = createGetter(false, true);
    const readonlyGet = createGetter(true);
    const shallowReadonlyGet = createGetter(true, true);
    let readonlyObj = {
        set: (target, key) => {
            console.warn(`set on key ${key} failed`);
        }
    };
    const mutableHandlers = {
        get
    };
    const shallowReactiveHandlers = {
        get: shallowGet
    };
    const readonlyHandlers = extend({
        get: readonlyGet
    }, readonlyObj);
    const shallowReadonlyHandlers = extend({
        get: shallowReadonlyGet,
    }, readonlyObj);

    function reactive(target) {
        return createReactiveObject(target, false, mutableHandlers);
    }
    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers);
    }
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers);
    }
    function shallowReadonly(target) {
        return createReactiveObject(target, true, shallowReadonlyHandlers);
    }
    // 是不是只读 是不是深度 使用柯里化
    // new Proxy()最核心的是需要拦截，数据的读取和修改
    const reactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    function createReactiveObject(target, isReadonly, baseHandlers) {
        // 判断是否为对象类型 reactive只能拦截对象类型
        if (!isObject(target)) {
            return target;
        }
        const proxyMap = isReadonly ? readonlyMap : reactiveMap;
        // 判断是否存在代理
        const existProxy = proxyMap.get(target);
        if (existProxy) {
            return existProxy; //如果已经进行代理直接进行返回即可
        }
        // 如果某个对象已经被代理过，那么就不需要再次代理了，可能一个对象被深度代理，又被只读代理
        const proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy); //将要代理的对象，和对应代理结果缓存起来
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
