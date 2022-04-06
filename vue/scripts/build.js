// 将package目录下的所有包进行打包

const fs = require("fs");
const execa = require("execa");

// 遍历筛选packages目录下的文件
const targets = fs.readdirSync("packages").filter(file=>{
    if(!fs.statSync(`packages/${file}`).isDirectory()){
        return false;
    }
    return true;
})

// 对目标文件进行依次打包，并行打包
async function build(target){ // rollup -c --environment TARGET:shared
    await execa(
        "rollup",
        ["-c","--environment",`TARGET:${target}`],
        {
            stdio:"inherit"//当子进程打包的信息共享给父进程
        }
    )
}


function runParallel(targets, iterationFn){
    const res = [];
    for(const item of targets){
        const p = iterationFn(item);
        res.push(p);
    }
}

runParallel(targets, build)