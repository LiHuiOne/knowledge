<template>
    <el-table :data="tableDataInfo.data||[]">
        <el-table-column v-for="col in columnList" :label="col.label" :prop="col.prop" :key="col.prop"></el-table-column>
        <slot></slot>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="tableDataInfo.count||0">
    </el-pagination>
</template>

<script>
    export default {
        props:['tableDataInfo','columnList'],
        data() {
            return {
                pageInfo:{
                    currentPage: 1,
                    pageSize:10,
                }
               
            };
        },
        components: {},
        created(){
            
        },
        mounted() {
            //重新获取数据渲染调用  this.$refs['name']reload()
            this.reload()
        },

        methods: {
            reload(){
                this.$emit('getTableData',this.pageInfo)
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize=val
                this.$emit('getTableData',this.pageInfo)
            },
            handleCurrentChange(val) {
                this.pageInfo.currentPage=val
                this.$emit('getTableData',this.pageInfo)
            }
        }
    }
</script>
<style lang='less' scoped>
</style>