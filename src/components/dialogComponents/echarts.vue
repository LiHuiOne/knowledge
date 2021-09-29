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
                <el-form-item prop="imageSrc" label="图片上传">
                    <el-upload
                        ref="uploadImg"
                        action=""
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                        :before-upload="beforeUpload"
                        :on-change="fileChange"
                        :limit="1"
                        :show-file-list="false"
                    >
                        <i class="el-icon-upload el_upload_icon"></i>
                        <template #tip>
                        <div class="el-upload__tip">
                           支持PNG、JPG、JPEG(不超过200kb)
                        </div>
                        </template>
                    </el-upload>
                    <img class="uploadImgs" v-if="form.imageSrc" :src="form.imageSrc" alt="" />
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
    import {transformToBase64} from '@/until/untilTool.js'
export default {
    props: ['isShow','type','codeInfo'],
  data () {
    return {
        echartTypeObj,
        dialogTitleObj,
        diaTitle:'',
        dialogVisible:false,
        form:{
            imageSrc:''
        }
    };
  },

    watch:{
        isShow(val){
            this.dialogVisible=val
            this.form=this.codeInfo||{}
            console.log(this.form)
        }
    },

  mounted(){
      this.form=this.codeInfo||{}
  },

  methods: {
      transformToBase64,
      beforeUpload(file){
        if(file.size/1024>200){
            this.$message.warning('文件大小不能超过200kb')
            return false
        }
      },
      fileChange(file,fileList){
          console.log(file)
          transformToBase64(file.raw).then(res=>{
              this.form.imageSrc=res
              this.$refs.uploadImg.clearFiles()
          })
      },
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
.el_upload_icon{
    font-size: 20px;
}
.uploadImgs{
    width: 200px;
    height: 100px;
}
</style>