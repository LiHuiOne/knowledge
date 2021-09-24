<template>
    <div class="searchContainer">
        <el-form ref="searchFrom" :model="searchForm" size="mini" :inline="true" label-position="right">
            <el-form-item v-for="sItem in searchData" :key="sItem.prop" :label="sItem.label">
                <el-input v-if="sItem.type == 'text'" v-model="searchForm[sItem.prop]"
                    :placeholder="sItem.placeholder || '请输入'"></el-input>
                <el-select v-else-if="sItem.type == 'select'" v-model="searchForm[sItem.prop]"
                    :placeholder="sItem.placeholder || '请选择'">
                    <el-option v-for="optionItem in sItem.option" :label="optionItem.label" :value="optionItem.value"
                        :key="optionItem.val"></el-option>
                </el-select>
                <el-date-picker v-else-if="sItem.type == 'year'" format="YYYY" type="year" value-format="x"
                    v-model="searchForm[sItem.prop]" :placeholder="sItem.placeholder || '请选择日期'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'month'" format="YYYY-MM" type="month" value-format="x"
                    v-model="searchForm[sItem.prop]" :placeholder="sItem.placeholder || '请选择月份'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'monthrange'" format="YYYY-MM" type="monthrange"
                    value-format="x" v-model="searchForm[sItem.prop]" range-separator="至" start-placeholder="开始月份"
                    end-placeholder="结束月份" :placeholder="sItem.placeholder || '请选择日期'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'date'" format="YYYY-MM-DD" type="date" value-format="x"
                    v-model="searchForm[sItem.prop]" :placeholder="sItem.placeholder || '请选择日期'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'daterange'" format="YYYY-MM-DD" type="daterange"
                    value-format="x" v-model="searchForm[sItem.prop]" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" :placeholder="sItem.placeholder || '请选择日期'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'datetime'" type="datetime" value-format="x"
                    v-model="searchForm[sItem.prop]" :placeholder="sItem.placeholder || '请选择时间'"></el-date-picker>
                <el-date-picker v-else-if="sItem.type == 'datetimerange'" type="datetimerange" value-format="x"
                    v-model="searchForm[sItem.prop]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                    :placeholder="sItem.placeholder || '请选择时间'"></el-date-picker>
                <el-input v-else v-model="searchForm[sItem.prop]" :placeholder="sItem.placeholder || '请输入'"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="search">查询</el-button>
                <el-button type="warning" size="mini" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: ["searchData"],
        data() {
            return {
                searchForm: {},
                dataList: [],
            };
        },

        components: {},
        mounted() {
        },

        methods: {
            search(){
                this.$emit('search',{currentPage:1,pageSize:10},this.getData())
            },
            reset(){
                this.searchForm={}
            },
            getData(){
                let responseForm={}
                this.searchData.forEach(s => {
                    if(this.searchForm[s.prop]){
                        //处理范围性时间:注意转换的格式视需求而定，可以随时更改
                        if(s.type=='monthrange'||s.type=='daterange'||s.type=='datetimerange'){
                            if(Array.isArray(s.prop)){
                                //如果传递的范围时间是数组。例如prop:['startTime','endTime']，
                                //将时间改为key:val形式.startTime:'xxxx',endTime:'xxxx'
                                responseForm[s.prop[0]] = this.searchForm[s.prop][0]
                                responseForm[s.prop[1]] = this.searchForm[s.prop][1]
                            }else{
                                //如果传递的范围时间是字符串。例如：prop:time格式,把时间转为time:['xx','xx']
                                responseForm[s.prop] = [this.searchForm[s.prop][0]||'',this.searchForm[s.prop][1]||'']
                            }
                        }else{
                            responseForm[s.prop] = this.searchForm[s.prop]
                        }
                    }
                    
                    
                });
                return responseForm
            }
        },
    };
</script>
<style lang='less' scoped>
.searchContainer{
    margin-top:10px;
    border-bottom: 1px solid #E6E6E6;
}
</style>