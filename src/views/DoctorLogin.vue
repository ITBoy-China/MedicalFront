<template>
    <div class="main">
        <div class="login-box">
            <el-row class="logo">
                <el-col :span="24">
                    <img src="../assets/logo.png">
                </el-col>
            </el-row>
            <el-row class="title">
                <el-col :span="24">
                    <h1>医生站</h1>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-form-item prop="userName">
                            <el-input type="text" placeholder="请输入账号" v-model="form.userName"></el-input>
                        </el-form-item>
                        <el-form-item prop="userPwd">
                            <el-input type="password" placeholder="请输入密码" v-model="form.userPwd"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-form-item>
                            <el-button type="primary" class="my-btn-submit" @click="login('form')">点击以登录</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import Bus from '../assets/js/bus'
export default {
    name:"DoctorLogin",
    data() {
      return {
        form: {
          userName:'',
          userPwd:''
        },
        rules:{
            userName:[
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 1, max: 20, message: '长度应为3位', trigger: 'blur' }
            ]
        }
      }
    },
    beforeDestroy(){
        //传给首页用户id
        Bus.$emit('userName',this.form.userName);
    },
    methods:{
        login:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    //验证通过
                    //构造请求的url
                    var url = 'http://localhost:8003/doct/api/doctor/tokens/'+this.form.userName+'/'+this.form.userPwd;
                    //发送登录请求
                    this.$axios.get(url).then((res)=>{
                        var res = res.data;
                        if(res.flag==true && res.code==20000){
                            //成功登录 拿到token
                            var token = res.data;
                            //token 5小时的有效期
                            this.$cookie.set('token',token,60*60*5);
                            //跳转到首页
                            this.$router.push({'path':'/Doctor/index'});
                            //显示消息框
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                        }else{
                            //登录失败
                            this.$message({
                                message: '登录失败',
                                type: 'error'
                            });
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.main{
    width:100%;
    height:100%;
    /*设置背景图片*/
    background-image: url(../assets/images/background.jpg);
    /*设置背景图片尺寸*/
    background-size: cover;
    /*设置背景图片位置*/
    background-position: center;
    /*设置背景颜色*/
    background-color: #fff;
    /*使regist-box水平垂直居中*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

/*设置背景继承并且模糊*/
.main:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
}

/*设置盒子文字不模糊*/
.login-box{
    color:#fff !important;
    position: absolute;
    z-index:11;
    width:26%;
    height:50%;
    border-radius: 10px;
    background-color:rgba(230,230,230,0.1)
}

.title{
    text-align: center;
    margin:5px 5px 0px 5px !important;
}

.logo{
    text-align: center;
    margin:5px !important;
}

.logo img{
    height:60px;
}

.tips{
    text-align: center;
    font-size: 15px;
    margin:10px;
}

.input{
    display: flex;
    justify-content: center;
    margin-top:20px !important;
}

.my-btn-submit{
    width: 100%;
}

.link-to{
    text-align: center;
    color:#fff;
    font-size: 13px;
}

.link-to a{
    text-decoration: none;
    color: #fff;
}

.link-to a:visited{
    color: #fff;
}

.link-to a:hover{
    color:rgb(102,177,255);
}
</style>