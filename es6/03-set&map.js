// 数据类型 Set Map 可以用于去重

const set = new Set([1,1,1,1,2,3,4,4,8])
console.log(set);
set.add(666)
console.log(set);

console.log(set.entries(set));
console.log(set.has(2));

// 不能有重复的key
const map = new Map([
    ["a",1],
    ["b",2],
    ["b",2]
])
console.log("map",map);
map.set("c",3);
console.log("map",map);

console.log(Object.prototype.toString.call(new Map()));//[Object Map]
console.log(Object.prototype.toString.call(new Set()));//[Object Set]

// 数组 交集 并集 差集
const arr1 = [1,2,3,4,5]
const arr2 = [2,3,4,4,5]

// 并集
function union(arr1,arr2){
    const set = new Set([...arr1,...arr2])
    return [...set]
}
console.log(union(arr1,arr2));//[ 1, 2, 3, 4, 5 ]

// 交集
function interSection(arr1,arr2){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    return [...s1].filter(item=> s2.has(item))
}
console.log(interSection(arr1,arr2));//[ 2, 3, 4, 5 ]

// 差集
function chaSection(arr1,arr2){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    return [...s1].filter(item=> !s2.has(item))
}
console.log(chaSection(arr1,arr2));//[ 1 ]

// 
class MyTest{}
const myTest = new MyTest();//对象
const map = new WeakMap();

map.set(my,1);
my = null;
// 当给一个变量赋值为null时，不会立刻回收，而是会在合适的机会自己情况
// map引用的对象不会被回收掉，weakMap引用的对象被置为null，后续会清空



