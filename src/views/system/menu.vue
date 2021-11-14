<template>
    <div class="box_container">
        <div class="box_header">
            <span>菜单</span>
        </div>
        <div class="menuContainer">
            <div class="menuTree">
                <el-row class="mt10 mb5">
                    <el-col :offset="16">
                        <el-button type="primary" size="small" @click="addMenu('')">添加一级系统菜单</el-button>
                    </el-col>
                </el-row>
                <el-tree ref="menuTrees" :data="menuList"  :props="defaultProps" @node-click="handleNodeClick" node-key="name" :expand-on-click-node="false">
                    <template #default="{ node, data }">
                        <div class="treeItem">
                            <span>{{ data.title}}</span>
                            <div>
                                <span class="add_btn" v-if="data.path==''" @click.stop="addMenu(data)">添加</span>
                                 <span class="add_btn ml10" @click.stop="deleteMenu(data)">删除</span>
                            </div>
                            
                        </div>
                    </template>
                </el-tree>
            </div>
            <div class="menuInfo">
                <div class="info_header">
                    菜单详情
                </div>
                <div class="menuInfoContent" v-if="Object.keys(currentInfo).length">
                    <div>图标：<span :class="currentInfo.icon"></span></div>
                    <div><span>标题title：</span>{{currentInfo.title||'--'}}</div>
                    <div><span>英文名称：</span>{{currentInfo.name||'--'}}</div>
                    <div><span>路由：</span>{{currentInfo.path||'--'}}</div>
                </div>
                <div class="menuInfoContent" v-else>
                    <el-form :model="treeForm" label-position="right" label-width="90px">
                        <el-form-item label="icon：">
                            <el-input v-model="treeForm.icon" placeholder="请输入icon(从iconfont查看)">
                                <template #prepend>icon iconfont </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="标题title：">
                            <el-input v-model="treeForm.title" minlength="2" maxlength="5" show-word-limit placeholder="请输入title(长度不超过5个字节)"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称：">
                            <el-input v-model="treeForm.name" minlength="2" maxlength="5" show-word-limit placeholder="请输入title(长度不超过5个字节)"></el-input>
                        </el-form-item>
                        <el-form-item label="路由：">
                            <el-input v-model="treeForm.path" placeholder="请输入组件路由(例如：/echarts/template)"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-col :offset="22">
                            <el-button type="primary" size="small" @click="sure">确认</el-button>
                        </el-col>
                    </el-row>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
// import {menuList} from '@/components/menu/menu.js'
    export default {
        data() {
            return {
                menuList:[],
                defaultProps:{
                    label:'title',
                    children: 'children'
                },
                currentInfo:{},
                treeForm:{}
            };
        },

        components: {},
        async created(){
            await this.$api.getMenu().then(res=>{
                this.menuList=res.data[0].menuList||[]
                this.$nextTick(()=>{
                //选中节点
                    this.$refs['menuTrees'].setCurrentKey(this.menuList[0].name)
                    this.currentInfo = this.$refs['menuTrees'].getCurrentNode()
                })
            })
        },
        mounted() {
            
        },

        methods: {
            addMenu(data){
                if(data==''){
                    //取消选中的状态
                    this.$refs['menuTrees'].setCurrentKey(null)
                }
                this.currentInfo = {}
            },
            deleteMenu(data){

            },
            handleNodeClick(data,node,self){
                this.currentInfo=data
            },
            sure(){
                let menuObj = JSON.parse(JSON.stringify(this.treeForm))
                menuObj.icon = 'icon iconfont '+menuObj.icon
               this.menuList.push(menuObj)
               this.$api.saveMenu({menuList:this.menuList}).then(res=>{

               })
            }
        }
    }
</script>
<style lang='less' scoped>
.menuContainer{
    display: flex;
    height: 100vh;
    background: #ffffff;
    /deep/ .menuTree{
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
        //修改树的选中样式
        .el-tree-node.is-current > .el-tree-node__content {
            background-color: #3f96e7 !important;
            color: #ffffff;
            .add_btn{
                color: #ffffff;
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