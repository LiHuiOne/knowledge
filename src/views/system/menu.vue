<template>
    <div class="box_container">
        <div class="box_header">
            <span>菜单</span>
        </div>
        <div class="menuContainer">
            <div class="menuTree">
                <el-tree :data="menuList" :props="defaultProps" @node-click="handleNodeClick" node-key="name" :expand-on-click-node="false">
                    <template #default="{ node, data }">
                        <div class="treeItem">
                            <span>{{ data.title}}</span>
                            <span class="add_btn" @click="addMenu(data)">添加</span>
                        </div>
                    </template>
                </el-tree>
            </div>
            <div class="menuInfo">
                <div class="info_header">
                    菜单详情
                </div>
                <div class="menuInfoContent">
                    <div><span>标题title：</span>{{currentInfo.title||'--'}}</div>
                    <div><span>名称：</span>{{currentInfo.name||'--'}}</div>
                    <div><span>路由：</span>{{currentInfo.path||'--'}}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {menuList} from '@/components/menu/menu.js'
    export default {
        data() {
            return {
                menuList,
                defaultProps:{
                    label:'title',
                    children: 'children'
                },
                currentInfo:{}
            };
        },

        components: {},

        mounted() {},

        methods: {
            addMenu(data){

            },
            handleNodeClick(data,node,self){
                this.currentInfo=data
            }
        }
    }
</script>
<style lang='less' scoped>
.menuContainer{
    display: flex;
    height: 100vh;
    background: #ffffff;
    .menuTree{
        width:400px;
        border:1px solid #eeeeee;
        .treeItem{
            width: 100%;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding-right: 10px;
            .add_btn{
                color: #409eff;
                cursor: pointer;
            }
        }
    }
    .menuInfo{
        width:calc(100% - 400px);
        padding:0px 10px 10px;
        .info_header{
            height: 30px;
            line-height: 30px;
            font-size:16px;
            color: #000000;
            font-weight: bold;
            border-bottom:1px solid #E6E6E6;
        }
        .menuInfoContent{
            padding-top: 5px;
            font-size: 14px;
            color: #333;
            span{
                font-weight: bold;
                color: #000000;
            }
        }
    }
}
</style>