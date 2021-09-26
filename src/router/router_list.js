export const routerConstantList=[
    {
        path:'/',
        component:()=>import(/* webpackChunkName: "index" */ '@/views/index'),
        children:[
            {
                path:'/home',
                name:'首页',
                component:()=>import(/* webpackChunkName: "home" */ '@/views/home/index'),
                meta:{
                    breadcrumbFun(route){
                        return [{title:'首页'}]
                    }
                }
            },
            {
                path:'/echarts/histogram',
                name:'柱状图',
                component:()=>import(/* webpackChunkName: "echarts" */ '@/views/echarts/histogram'),
                meta:{
                    breadcrumbFun(route){
                        return [{title:'echarts'},{title:'柱状图'}]
                    }
                }
            },
            {
                path:'/echarts/detail',
                name:'',
                component:()=>import(/* webpackChunkName: "echarts" */ '@/views/echarts/echarts_detail'),
                meta:{
                    breadcrumbFun(route){
                        let titleType=route.query.type=='0'?'新增':'详情'
                        return [{title:'echarts',path:''},{title:'柱状图',path:'/echarts/histogram'},{title:titleType,path:''},]
                    }
                    
                }
            },
            {
                path:'/echarts/pie',
                name:'饼状图',
                component:()=>import(/* webpackChunkName: "echarts" */ '@/views/echarts/pie'),
                meta:{
                    breadcrumbFun(route){
                        return [{title:'echarts'},{title:'饼状图'}]
                    }
                }
            },
            {
                path:'/echarts/gaodeMap',
                name:'高德地图',
                component:()=>import(/* webpackChunkName: "map" */ '@/views/map/gaodeMap.vue'),
                meta:{
                    breadcrumbFun(route){
                        return [{title:'地图'},{title:'高德地图'}]
                    }
                }
            }
        ]
    },
    {
        path:'/login',
        component:import('@/views/login')
    }

]