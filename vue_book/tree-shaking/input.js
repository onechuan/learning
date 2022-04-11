import {foo, fun} from "./utils"

// 告知rollup这是个纯函数，不会产生任何副作用，可以放心tree-shaking
/*#__PURE__*/  foo()

fun()