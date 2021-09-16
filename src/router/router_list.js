export const routerConstantList=[
    {
        path:'/',
        component:()=>import(/* webpackChunkName: "index" */ '@/views/index'),
        children:[
            {
                path:'/home',
                name:'首页',
                component:()=>import(/* webpackChunkName: "home" */ '@/views/home/index')
            },
            {
                path:'/echarts/histogram',
                name:'柱状图',
                component:()=>import(/* webpackChunkName: "echarts" */ '@/views/echarts/histogram')
            }
        ]
    },
    {
        path:'/login',
        component:import('@/views/login')
    }

]