import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import routes from './router/routers'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const pinia = createPinia();

createApp(App)
    .use(Antd)
    .use(pinia)
    .use(routes)
    .use(ElementPlus)
    .mount('#app')
