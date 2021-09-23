<template>
  <div class="echartsDia">
        <el-dialog :title="dialogTitleObj[type]" v-model="dialogVisible" @close="colseDia" :close-on-click-modal="false">
            <el-form :model="form" label-position="right" label-width="100px" size="small">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <el-option v-for="(val,key,index) in echartTypeObj" :key="key" :label="val" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="description" label="描述">
                    <el-input v-model="form.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="代码片段">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows:8 }" v-model="form.code" placeholder="请输入代码片段"></el-input>
                </el-form-item>
                <el-form-item prop="imageSrc" label="图片预览">
                    <el-input v-model="form.imageSrc" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="colseDia">取 消</el-button>
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
    props: ['isShow','type','codeInfo'],
  data () {
    return {
        echartTypeObj,
        dialogTitleObj,
        diaTitle:'',
        dialogVisible:false,
        form:{}
    };
  },

    watch:{
        isShow(val){
            this.dialogVisible=val
            this.form=this.codeInfo||{}
        }
    },

  mounted(){
      this.form=this.codeInfo||{}
  },

  methods: {
      colseDia(){
           this.dialogVisible=false
           this.$emit('close',false)
      },
      sureSubmit(){
            this.dialogVisible=false
            this.$emit('submit',this.form)
      }
  }
}

</script>
<style lang='less' scoped>
</style>