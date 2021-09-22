<template>
    <div class="box_container">
        <div class="box_header">
            <span>柱状图</span>
            <el-button type="primary" size="small" @click="add('0','')">新增</el-button>
        </div>
        <tableContainer ref="echartTable" :tableDataInfo="tableDataInfo" :columnList="tableColumn" @getTableData="getTableData">
            <el-table-column prop="code" label="在线效果" show-overflow-tooltip>
                <template #default="{row}">
                     <span class="opation_txt" @click="getView(row)">预览</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{row}">
                    <span class="opation_txt mr5" @click="add('2',row)">修改</span>
                    <span class="opation_txt" @click="del(row)">删除</span>
                </template>
            </el-table-column>
        </tableContainer>
        <el-dialog :title="diaTitle" v-model="dialogVisible">
            <el-form :model="form" label-position="right" label-width="100px" size="small">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <el-option v-for="(val,key,index) in echartTypeObj" :key="val" :label="key" :value="val">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="description" label="描述">
                    <el-input v-model="form.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="代码片段">
                    <el-input type="textarea" v-model="form.code" placeholder="请输入代码片段"></el-input>
                </el-form-item>
                <el-form-item prop="imageSrc" label="图片预览">
                    <el-input v-model="form.imageSrc" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureSubmit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
<script>
    import {
        echartTypeObj
    } from '@/until/echart_type.js'
    import {
        dialogTitleObj
    } from '@/until/dictionary.js'
    export default {
        data() {
            return {
                echartTypeObj,
                dialogTitleObj,
                dialogVisible: false,
                tableDataInfo: {},
                form: {},
                tableColumn:[
                    {
                        label:'名称',
                        prop:'name'
                    },
                    {
                        label:'描述',
                        prop:'description'
                    }

                ],
                diaTitle:''
            };
        },
        components: {
            
        },

        mounted() {
            
        },

        methods: {
            getTableData(pageInfo){
                this.$api.getEcharts(pageInfo).then(res=>{
                    if(res.status=='ok'){
                        this.tableDataInfo=res
                    }
                })
            },
            add(type,data){
                this.diaTitle = this.dialogTitleObj[type]
                this.dialogVisible=true
                this.form=data
            },
            sureSubmit(){
                let apiUrl = this.diaTitle=='新增'?'postEcharts':'modifyEcharts'
                this.$api[apiUrl](this.form).then(res=>{
                    if(res.status=='ok'){
                        this.$message.success('成功')
                        this.dialogVisible=false
                        this.$refs['echartTable'].reload()
                    }
                })
            },
            del(row){
                this.$confirm('确认删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                    .then(() => {
                        this.$api.deleteEcharts({id:row._id}).then(res=>{
                            this.$message.success('成功')
                            this.$refs['echartTable'].reload()
                        })
                        
                    })
                
            },
            getView(row){

            }
        }
    }
</script>
<style lang='less' scoped>
</style>