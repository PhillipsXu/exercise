import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

import 'virtual:windi.css';
import "element-plus/theme-chalk/el-notification.css";
