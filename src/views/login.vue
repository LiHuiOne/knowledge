<template>
    <div class="login-warpper">
        <div class="login_header">
            <img src="@/assets/logo/logo.png" alt=""/>
            <span>知识库</span>
        </div>
        <div class="loginContainer">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="name">
                    <el-input v-model="loginForm.name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model.trim="loginForm.password"  @keyup.enter="login" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
           <div class="login_btn" @click="login">登录</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm:{name:'',password:''},
                rules:{
                    name:[
                        {required: true, message:'请输入账号', trigger: 'blur'}
                    ],
                    password:[
                        {required: true, message:'请输入密码', trigger: 'blur'}
                    ]
                }

            };
        },

        components: {},

        mounted() {},

        methods: {
            login(){
                this.$refs['loginForm'].validate((vaild)=>{
                    if(vaild){
                        this.$api.login(this.loginForm).then(res=>{
                            if(res.status=='ok'){
                                localStorage.setItem('token',res.token)
                                this.$router.push('/home')
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang='less' scoped>
.login-warpper{
    height: 100vh;
    background-image: url('~@/assets/images/login_bg.jpeg');
    background-size: 100% 100%;
    .login_header{
        position: absolute;
        height: 40px;
        width: 400px;
        top:calc(50% - 200px);
        left:calc(50% - 200px);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        img{
            height: 100%;
        }
    }
    .loginContainer{
        position: absolute;
        top:calc(50% - 150px);
        left:calc(50% - 200px);
        width: 400px;
        height: 250px;
        box-sizing: border-box;
        padding:20px;
        border: 1px solid skyblue;
        border-radius: 2px;
        .login_btn{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 4px;
            color: #ffffff;
            background:#409eff;
            cursor: pointer;
        }
    }
}
</style>