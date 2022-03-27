const express = require("express")

const app = express()

app.get("/say",(req,res)=>{
    const {wd, cb} = req.query;
    console.log("wd", wd);
    res.end(`${cb}("Pingping i love you")`)
})

app.listen(3000,()=>{
    console.log(`this is server is running...`);
})