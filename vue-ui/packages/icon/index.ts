import {App} from "@vue/runtime-dom"
import Icon from "./src/icon.vue";

Icon.install = (app: App): void => {
    // 注册全局组件
    app.component(Icon.name, Icon);
}

type IWithInstall<T> = T & {
    install():void
}
const _Icon: IWithInstall<typeof Icon> = Icon

export default _Icon