<template>
    <el-table :data="tableDataInfo.data||[]">
        <el-table-column v-for="col in columnList" :label="col.label" :prop="col.prop" :key="col.prop"></el-table-column>
        <slot></slot>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
        :page-sizes="[1, 2, 3]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="tableDataInfo.count||0">
    </el-pagination>
</template>

<script>
    export default {
        props:['tableDataInfo','columnList'],
        data() {
            return {
                pageInfo:{
                    currentPage: 1,
                    pageSize:1,
                }
               
            };
        },
        components: {},
        created(){
            
        },
        mounted() {
            this.$emit('getTableData',this.pageInfo)
        },

        methods: {
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