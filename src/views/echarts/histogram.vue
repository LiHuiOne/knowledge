<template>
    <div class="box_container">
        <div class="box_header">
            <span>柱状图</span>
            <el-button type="primary" size="small">新增</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="date" label="坐标轴设置参数"> </el-table-column>
            <el-table-column prop="name" label="描述"> </el-table-column>
            <el-table-column prop="address" label="在线效果"></el-table-column>
            <el-table-column label="操作">
                <template #default="{row}">
                    <span class="opation_txt mr5">查看</span>
                    <span class="opation_txt">修改</span>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                tableData: [{data:'eee',name:'fdd',address:'fff'}]
            };
        },

        components: {},

        mounted() {},

        methods: {
            
        }
    }
</script>
<style lang='less' scoped>
</style>