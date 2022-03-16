// oc-ui作为ui组件库的统一入口
import {App} from "vue"
import Button from "@oc-ui/button";
import Icon from "@oc-ui/icon";

const components = [
    Button,
    Icon
]
console.log(Icon, Button);

const install = (app: App): void => {
    components.forEach(component=>{
        app.component(component.name, component)
    })
}

// 在使用组件库的时候可以使用 createApp().use(xxx)
export default {
    install
}

// 组件库看效果的网站=> 文档 => md => webpack



