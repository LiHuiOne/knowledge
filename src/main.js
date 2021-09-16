import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/service/interface.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
//将api方法挂载到原型上
app.config.globalProperties.$api=api
app.use(ElementPlus)
.use(api)
.use(store)
.use(router).mount('#app')
