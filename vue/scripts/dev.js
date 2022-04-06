// 将package目录下的所有包进行打包

const fs = require("fs");

const target = "reactivity";
const execa = require("execa");

build(target)

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
