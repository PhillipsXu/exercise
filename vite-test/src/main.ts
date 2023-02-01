import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import mitt from 'mitt';
import router from './router';
import { createPinia, PiniaPluginContext } from 'pinia';

const Mit = mitt();

// 初始化pinia
const store = createPinia();
// pinia持久化
// 定义标识变量
const _piniaKey = '_PINIAKEY_';
function setStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}
function getStorage(key: string): object {
    return (localStorage.getItem(key) ? JSON.parse(<string>localStorage.getItem(key)) : {})
}
// 利用函数柯里化接收参数
const piniaPlugin = () => {
    // 将函数返回给pinia 让pinia调用 注入context
    return (context: PiniaPluginContext) => {
        const { store } = context;
        store.$subscribe(() => {
            setStorage(_piniaKey + store.$id, toRaw(store.$state));
        })
        const data = getStorage(_piniaKey + store.$id)
        return { ...data }
    }
}
store.use(piniaPlugin());


type Filter = {
    format<T>(str: T): string
}

declare module 'vue' {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit,
        $filter: Filter
    }
}

const app = createApp(App);

app.config.globalProperties.$Bus = Mit;

app.config.globalProperties.$filter = {
    format<T>(str: T): string {
        return `全局-${str}`
    }
}
app.use(router);
app.use(store);
app.mount('#app');

// 环境变量
console.log(import.meta.env);
