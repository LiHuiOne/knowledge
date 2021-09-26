<template>
    <div class="main_warpper">
        <div class="main_header">
            <div class="logo">
                <img :src="imgSrc" alt=""/>
                <span>知识库</span>
            </div>
        </div>
        <div class="main_content">
            <div class="asideContainer">
                <div class="asideHeader">
                    <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="tooggleCollapse"></i>
                </div>
                <MenuContainer></MenuContainer>
            </div>
            <div class="content_warpper">
                <div class="breadContainer">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="(breadItem,index) in breadList" :key="index" :to="breadItem.path">
                            {{breadItem.title}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
//
import { defineAsyncComponent } from 'vue'
import {mapState,mapMutations} from 'vuex'
    export default {
        name: 'index',
        data() {
            return {
                imgSrc:require('@/assets/logo/logo.png'),
                breadList:[]
            };
        },
        computed:{
            ...mapState({
                isCollapse:state=>state.menuConfigInfo.isCollapse
            })
        },
        //vue3要引入defineAsyncComponent才能加载异步组件
        components: {
            MenuContainer:defineAsyncComponent(()=>import('@/components/menu/index.vue'))
        },
        watch:{
            $route(val){
                console.log(val)
                this.breadList=val.meta.breadcrumbFun?val.meta.breadcrumbFun(val):[]
            }
        },
        mounted(){
            //解决页面刷新meta获取不到问题
            this.breadList=this.$route.meta.breadcrumbFun(this.$route)
        },
        methods: {
            ...mapMutations(['toogleCollapse']),
            tooggleCollapse(){
                this.toogleCollapse(!this.isCollapse)
            }
        }
    }
</script>
<style lang='less'>
.main_warpper{
    .main_header{
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding:0px 10px;
        background:#003670;
        .logo{
            display: flex;
            align-items: center;
            height: 100%;
            width: 100px;
            font-size: 14px;
            color: #ffffff;
            img{
                margin-right: 10px;
                width:40px;
                height: 30px;
                color: #ffffff;
            }
        }
    }
    .main_content{
        height: calc(100% - 40px);
        .asideContainer{
            margin-right: 10px;
            //使用float代替flex布局，因为flex布局下，收缩时el-table不能触发resize事件，
            //详细解释看：https://blog.csdn.net/YongChao_bms/article/details/103293607
            float: left;
            height: 100%;
            background: #001C43;
            .asideHeader{
                height:40px;
                line-height:40px;
                font-size:26px;
                color:#c0c0c0;
                text-align: center;
                i{
                    cursor: pointer;
                }
            }
        }
        .content_warpper{
            width: 100%;
            box-sizing: border-box;
            padding:0px 10px 10px;
            .breadContainer{
                margin:0px 0px 10px 0px;
                height: 40px;
                background: #ffffff;
                .el-breadcrumb{
                    height: 100%;
                    line-height: 40px;
                }
            }
        }
    }
}
</style>