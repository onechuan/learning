const express = require("express")

const app = express()

const whitList = ["http://localhost:3002"]
app.use((req, res, next)=>{
    const origin = req.headers.origin;
    if(whitList.includes(origin)){
        // 设置哪个源可以访问我们
        res.setHeader("Access-Control-Allow-Origin",origin);
        // 允许携带哪个头访问我
        res.setHeader("Access-Control-Allow-Headers","name");
        // 允许哪个方法访问我 默认允许get post请求
        res.setHeader("Access-Control-Allow-Methods","PUT");
        // 允许携带cookie
        res.setHeader("Access-Control-Allow-Credentials",true);
        // 预检的存活时间
        res.setHeader("Access-Control-Max-Age",10);
        // 允许返回的头
        res.setHeader("Access-Control-Expose-Headers","name");
        if(req.method === "OPTIONS"){
            res.end();//OPTIONS请求不做任何处理
        }

    }
    next()
})
app.get("/getData",(req,res)=>{
    const {wd, cb} = req.query;
    console.log("wd", wd);
    res.end(`${cb}("Pingping i love you")`)
})

app.listen(3001,()=>{
    console.log(`this is server is running...`);
})