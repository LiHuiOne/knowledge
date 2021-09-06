import { createRouter, createWebHistory } from 'vue-router'
import {routerConstantList} from './router_list.js'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ y: 0 }),//每次切换路由回到页面最顶部
  routes:routerConstantList
})

export default router
