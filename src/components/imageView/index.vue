<template>
    <el-image :src="imgUrl" :preview-src-list="srcList"></el-image>
</template>

<script>
    export default {
        props:['imgUrl'],
        data() {
            return {
                srcList:[]
            };
        },

        components: {},
        created(){
            this.srcList.push(this.imgUrl)
        },
        methods: {}
    }
</script>
<style lang='less' scoped>
img{
    width: 40px;
    height: 20px;
    cursor: pointer;
}
</style>