<template>
    <div class="box_container">
        <searchContainer ref="search" :searchData="searchData" @search="getTableData"></searchContainer>
        <div class="box_header">
            <span>柱状图</span>
            <el-button type="primary" size="small" @click="add('0','')">新增</el-button>
        </div>
        <tableContainer ref="echartTable" :tableDataInfo="tableDataInfo" :columnList="tableColumnList" @getTableData="getTableData">
             <el-table-column prop="type" label="类型">
                <template #default="{row}">
                    <span>{{echartTypeObj[row.type]||'--'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="imageSrc" label="图片预览">
                <template #default="{row}">
                    <imageView class="imgRow" :imgUrl="row.imageSrc"></imageView>
                    <!-- <img class="imgRow" :src="row.imageSrc" alt="" /> -->
                </template>
            </el-table-column>
            <el-table-column prop="code" label="核心代码">
                <template #default="{row}">
                    <span class="opation_txt" @click="getView(row)">查看</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{row}">
                    <span class="opation_txt mr5" @click="add('2',row)">修改</span>
                    <span class="opation_txt mr5" @click="del(row)">删除</span>
                    <span class="opation_txt" @click="show(row)">详情</span>
                </template>
            </el-table-column>
        </tableContainer>
        <ecahrtsDialogContainer :isShow="isShowEchartDia" :type="etype" :codeInfo="echartInfo" @close="close" @submit="submit"></ecahrtsDialogContainer>
        <dialogContainer :isShow="isShow" @closeDialog="closeDialog" :codeInfo="codeInfo"></dialogContainer>
    </div>

</template>
<script>
    import {defineAsyncComponent} from 'vue'
    import {
        echartTypeObj
    } from '@/until/echart_type.js'
    import {
        dialogTitleObj
    } from '@/until/dictionary.js'
    import searchInfo from './mixins/search.js'
    import tableColumn from './mixins/table.js'
    export default {
        mixins:[searchInfo,tableColumn],
        data() {
            return {
                echartTypeObj,
                dialogTitleObj,
                dialogVisible: false,
                tableDataInfo: {},
                form: {},
                diaTitle:'',
                isShow:false,
                isShowEchartDia:false,
                echartInfo:{},
                codeInfo:'',
                etype:0
            };
        },
        components: {
            dialogContainer:defineAsyncComponent(()=>import('@/components/dialogComponents/codeView.vue')),
            ecahrtsDialogContainer:defineAsyncComponent(()=>import('@/components/dialogComponents/echarts.vue'))
        },

        methods: {
            show(){
                this.$router.push({path:'/echarts/detail',query:{type:'1'}})
            },
            getTableData(pageInfo={}){
                const info = this.$refs['search'].getData()||{}
                this.$api.getEcharts({...pageInfo,...info}).then(res=>{
                    if(res.status=='ok'){
                        this.tableDataInfo=res
                    }
                })
            },
            add(type,data){
                this.isShowEchartDia=true
                this.etype=type
                this.echartInfo=data||{}
            },
            close(data){
                this.isShowEchartDia=data
            },
            submit(form){
                let apiUrl = this.etype=='0'?'postEcharts':'modifyEcharts'
                this.$api[apiUrl](form).then(res=>{
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
                this.codeInfo=row.code
                this.isShow=true
            },
            closeDialog(data){
                this.isShow=data
            }
        }
    }
</script>
<style lang='less' scoped>
.imgRow{
    width: 40px;
    height: 20px;
    cursor: pointer;
}
</style>