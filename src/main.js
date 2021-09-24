import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/service/interface.js'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'dayjs/locale/zh-cn' //中文
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import 'element-plus/dist/index.css'
import './permission.js'
//引入table作为全局组件
import tableContainer from '@/components/tableComponents/index'
//引入搜索作为全局组件
import searchContainer from '@/components/searchComponent/index'
const app = createApp(App)
//将api方法挂载到原型上
app.config.globalProperties.$api=api
app.config.globalProperties.$message=ElMessage
app.component('tableContainer',tableContainer)
app.component('searchContainer',searchContainer)
app.use(ElementPlus,{locale})
.use(api)
.use(store)
.use(router).mount('#app')
