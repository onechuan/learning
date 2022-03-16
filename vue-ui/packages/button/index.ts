import {App} from "@vue/runtime-dom"
import Button from "./src/button.vue";

Button.install = (app: App): void => {
    // 注册全局组件
    app.component(Button.name, Button);
}

type IWithInstall<T> = T & {
    install():void
}
const _Button: IWithInstall<typeof Button> = Button

export default _Button

