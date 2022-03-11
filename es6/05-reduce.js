// reduce收敛函数，可以把一个数组转换为其他格式

// 执行过程 求和函数
// reduce方法使用的前提是 数组不能为空数组，如果只有一个值则返回当前值

Array.prototype.reduce = function(callback,prev){
    for(let i = 0; i < this.length; i++){
        if(!prev){
            prev = callback(this[i], this[i+1], i+1, this)
            i++;
        }else{
            prev = callback(prev, this[i],i,this)
        }
    }
    return prev
}


const r = [1,2,3,4,5].reduce(function(prev,curr,index,array){
    console.log(prev,curr);
    return prev + curr
})

console.log("r",r);