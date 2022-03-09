import {nodeResolve} from "@rollup/plugin-node-resolve"

import ts from "rollup-plugin-typescript"
import serve from "rollup-plugin-serve"

import path from "path"

export default {
    input:"src/index.ts",
    output:{
        file:path.resolve(__dirname, "dist/bundle.js"),
        format:"iife",
        sourcemap:true
    },
    plugins:[
        nodeResolve({
            extensions:[".js",".ts"]
        }),
        ts({
            tsconfig:path.resolve(__dirname,"tsconfig.json")
        }),
        serve({
            port:3000,
            contentBase:"",
            openPage:"/public/index.html"
        })
    ]
}