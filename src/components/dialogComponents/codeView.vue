<template>
    <div class="codeContaner">
        <el-dialog title="代码预览" v-model="dialogVisible" width="30%" @close="colseDia" :close-on-click-modal="false">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="codeInfo" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button ref="copy" :data-clipboard-text="codeInfo" type="primary" @click="copyCode" size="small">复制</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
//局部导入，复制插件
import Clipboard from 'clipboard'
    export default {
        props: ['isShow','codeInfo'],
        data() {
            return {
                dialogVisible: false,
                clipboard:null
            };
        },

        components: {},
        watch:{
            isShow(val){
                this.dialogVisible = val
            }
        },
        created() {
            this.dialogVisible = this.isShow

        },
        mounted(){
            //mounted中初始化实例，解决第一次复制不触发问题
            let copyDomTxt=this.$refs['copy'].$el
            this.clipboard=new Clipboard(copyDomTxt)
        },
        methods: {
            copyCode() {
                //解决在vue的弹窗组件中无效,要使用ref获取元素
                // let copyDomTxt=this.$refs['copy'].$el
                // let clipboard = new Clipboard(copyDomTxt)
                //复制成功
                this.clipboard.on('success', ()=> {
                    this.$message.success('复制成功！')
                    this.clipboard.destroy()
                })
                //复制失败
                this.clipboard.on('error', ()=> {
                    this.$message.error('复制失败！')
                    this.clipboard.destroy()
                })
            },
            colseDia() {
                this.dialogVisible = false
                this.$emit('closeDialog',false)
            }
        }
    }
</script>
<style lang='less' scoped>
</style>