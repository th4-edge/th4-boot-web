import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import "@/assets/style/index.scss";
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/router/router'
import {createPinia} from "pinia";
import 'amfe-flexible';
import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import print from 'vue3-print-nb'
const app=createApp(App);
app.config.globalProperties.$ElIcons=[]
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.config.globalProperties.$ElIcons.push(key)
    app.component(key, component)
}
app.use(print);
app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.mount('#app')
