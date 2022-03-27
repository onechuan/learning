import {createApp} from "vue"

import App from "./App.vue"

import OCUI from "oc-ui"
import "theme-chalk/index.scss"

// 创建应用 并使用组件库
createApp(App).use(OCUI).mount("#app")