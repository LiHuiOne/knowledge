export const routerConstantList=[
    {
        path:'/',
        component:()=>import(/* webpackChunkName: "index" */ '@/views/index'),
        children:[
            {
                path:'/home',
                name:'首页',
                component:()=>import(/* webpackChunkName: "index" */ '@/views/home/index')
            }
        ]
    }

]