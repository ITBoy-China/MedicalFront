<template>
<div class="main">
        <heads :title="title"></heads>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: '/Doctor/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">挂号情况</a></el-breadcrumb-item>
        </el-breadcrumb>

        <el-container class="container">
            <el-header>
                 <el-row>
                    <el-col :span="22" :offset="1" class="my-row">
                        <el-row>
                            <el-col :span="24">
                                <div class="my-tag">
                                    <div class="font-title">挂号查看中心</div>
                                    <el-col :span="24" class="select_layout">
                                        <el-form label-width="100px" :model="doctorInfoForm">
                                            <el-row >
                                                <el-col :span="8">
                                                    <el-form-item label="姓名：" >
                                                        <el-input placeholder="请输入患者姓名" v-model="doctorInfoForm.patientName"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item label="科室："  >
                                                        <el-select  placeholder="请选择所挂科室" prop="departName" v-model="doctorInfoForm.departName">
                                                        
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item label="医生："  >
                                                        <el-select  placeholder="请选择医生" prop="doctorName" v-model="doctorInfoForm.doctorName">
    
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row >
                                                <el-col :span="8">
                                                    <el-form-item label="状态：" >
                                                        <el-select     v-model="value" prop="status">
                                                            <el-option
                                                            v-for="item in status"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col> 
                                                <el-col :span="10">
                                                    <el-form-item label="挂号时间：" >
                                                        <el-date-picker
                                                            v-model="value1"
                                                            type="date"
                                                            placeholder="选择日期" prop="date">
                                                        </el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="6"  class="search_layout">
                                                    <el-button type="primary" icon="el-icon-search" @click="searchByRule">搜索</el-button>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </el-col>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-header>
           <el-main class="main_layout">
               <el-row :span="24" :gutter="30">
                <el-col :span="6" v-for="(o, index) in this.casedisplay" :key="index" :offset="index > 0 ? 4 : 0" :data="casedisplay" style="margin-left:0px;margin-top:20px"   >
                    <el-card >
                    <div class="card_layout" >
                        <el-row :class="generateClassName(o.status)"> 
                            <el-col :span="10">
                                <el-row>
                                    <el-col><img src="../assets/images/head_test.png" alt="" class="img_layout"></el-col>
                                    
                                    <el-col><div class="patientame">{{o.patientName}}</div></el-col>
                                    <el-col><div class="feature">{{o.patientFeature}}</div></el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="14">
                                <el-row class="content">
                                    <el-col @click.native="hrefnext(o.status,o.outPatientId)">{{o.status}}</el-col>
                                    <el-col>{{o.sex}}/{{o.age}}岁/{{o.phone}}</el-col>
                                    <el-col>{{o.departName}}/{{o.doctorName}}</el-col>
                                    <el-col>{{getPartTime(o.registerTime)}}</el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="bk_layout" >
                            <el-col :span="6" ><el-button type="text" class="button"><i class="el-icon-edit-outline"></i></el-button></el-col>
                            <el-col :span="6"><el-button type="text" class="button"><i class="el-icon-user-solid"></i></el-button></el-col>
                            <el-col :span="6"><el-button type="text" class="button"><i class="el-icon-position"></i></el-button></el-col>
                            <el-col :span="6"><el-button type="text" class="button"><i class="el-icon-guide"></i></el-button></el-col>
                        </el-row>
                        <!-- <span>挂号</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                        </div> -->
                    </div>
                    </el-card>
                </el-col>
                </el-row>
           </el-main>
        </el-container>
</div>
  
</template>

<script>
import heads from 'components/header.vue'
import Bus from '../assets/js/bus'
export default {
    name:"DoctorIndex",
    //注册组件
    components:{
        heads
    },
    data(){
        return {
            title:'医生站',
            token:'',
            patientID:'',
            userName:'',
            casedisplay:[],
            doctorInfoForm:
            {
                patientName:'',
                doctorName:'',
                departName:'',
                date:'',
                status:''
            },
        status: [{
          value: '0',
          label: '挂号'
        }, {
          value: '1',
          label: '就诊'
        }, {
          value: '2',
          label: '处方开立'
        }, {
          value: '3',
          label: '退号'
        }],
        value: '',
            pickerOptions: {
            disabledDate(time) {
            return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
                }
            }]
        },
        value1: '',
        currentDate: new Date()
    
        }
    },created(){
        var that = this;
        Bus.$on('userName',(val)=>{
             that.userName = val;
             //将id写入cookie
            that.$cookie.set("id",val);
        });
        var id = that.$cookie.get("id");
        if(id!=null && id!=undefined){
            that.userName = id;
        }
    },
    
    mounted(){ 
        
        var that = this;
        //判断 页面是否有token 如果没有token重定向到 登录页面
         var tken = this.$cookie.get("token");
         if(tken==null || tken==undefined){
             //cookie为空 重定向
             this.$router.push({'path':'/Doctor/login'});
         }else{
             this.token = tken;
         }
         //发送数据请求
         that.dataGet();
    },
 
       methods:{
        hrefnext(val1 ,val2){
            if(val1=='挂号'){
            var that=this;
             var url="http://localhost:8003/doct/api/casedisplay/status/"+val2;
             console.log(url);
              that.$axios.put(url,{},{
                headers:{
                    
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){that.$router.push({path:'/Doctor/MedicalList'} )}});
            }
             
         },
           generateClassName(index){
               if (index == '挂号') {
                    index=0;
                } 
                else if (index == '就诊') {
                            index = 1;
                } else if (index=='处方开立') {
                            index=2 ;      
                } else if(index=='退号'){
                    index=3;
                    }
               return `card_layout${index}`
           },
    //        tostatus : function(values){
    //     let chin_list=['挂号','就诊','处方开立','候诊','退号'];
    //     let sn = parseInt(values);
    //     this.chinese = chin_list[sn];
    //   },
            getPartTime(val){
                let ti = val.substring(0, 10);
                var timestr = ti.replace("-", "/").replace("-","/");
                return timestr;
            },searchByRule(){
                var that=this;
                if (that.doctorInfoForm.status == '挂号') {
                    that.doctorInfoForm.status=0;
                } 
                else if (that.doctorInfoForm.status == '就诊') {
                            that.doctorInfoForm.status = 1;
                } else if (that.doctorInfoForm.status=='处方开立') {
                            that.doctorInfoForm.status=2 ;      
                } else if(that.doctorInfoForm.status=='退号'){
                    that.doctorInfoForm.status=3;
                    }
                
                var url = "http://localhost:8003/doct/api/casedisplay/"+that.doctorInfoForm.doctorName
                +'/'+that.doctorInfoForm.patientName+'/2020-07-12';
                console.log(url);
                 that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    //数据渲染
                    var data = res.data;
                    that.casedisplay=[];
                    for(var i = 0;i<data.length;i++){
                        that.casedisplay.push(data[i]);
                        that.casedisplay.map(function (val) {
                        if (val.status == 0) {
                            val.status = '挂号'
                        } else if (val.status == 1) {
                            val.status = '就诊'
                        } else if (val.status == 2) {
                            val.status = '处方开立'
                        } else if(val.status==3){
                            val.status = '退号'
                        }   else  {
                            return
                        }
                        })

                    }
                    

                }
            });
            },

        //获取页面数据
        dataGet:function(){
            var that = this;
            //构造请求url
            var uri2 ="http://localhost:8003/doct/api/userdoctor/"+this.userName;
             
             that.$axios.get(uri2,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    var data = res.data;
                    that.doctorInfoForm.doctorName=data.doctorName;
                    that.doctorInfoForm.departName=data.departName;
                var url = "http://localhost:8003/doct/api/casedisplay/"+that.doctorInfoForm.doctorName;
                that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    //数据渲染
                    var data = res.data;
                    for(var i = 0;i<data.length;i++){
                        that.casedisplay.push(data[i]);
                        that.casedisplay.map(function (val) {
                        if (val.status == 0) {
                            val.status = '挂号'
                        } else if (val.status == 1) {
                            val.status = '就诊'
                        } else if (val.status == 2) {
                            val.status = '处方开立'
                        } else if(val.status==3){
                            val.status = '退号'
                        }   else  {
                            return
                        }
                        })

                    }
                    

                }
            });
    
                }});
                
        }
    }

    

}
</script>

<style>
    .main{
        width:100%;
        height:100%;
        background-color: rgb(241,241,241);
    }

    .container{
        position: relative;
    }

    .my-row{
        background-color: #fff;
        margin-top:10px;
        padding:10px;
    }
     .my-tag{
        display: flex;
        justify-content: space-between;
    }
    .font-title{
        font-size: 32px;
        font-weight: bold;
        width: 50%;
    }
    .select_layout{
        width: 50%;
    }
    .search_layout{
        padding-left: 50px;
    }
    .container .main_layout{
        margin-top:105px;
        background-color: #fff;
        width:90%;
        position: relative;
        margin-left:auto;
        margin-right: auto;
        
    }
    .card_layout2{
        background: linear-gradient(to bottom,rgb(99,122,237),rgb(64,164,243));
        color:white;
        padding-bottom: 1rem;
    }
    .card_layout1{
        background: linear-gradient(to bottom,rgb(255,241,30),rgb(244,171,58));
        color:white;
        padding-bottom: 1rem;
    }
    .card_layout0{
        background:linear-gradient(to bottom,rgb(5,198,213),rgb(36,193,123));
        color:white;
        padding-bottom: 1rem;
    }
   .card_layout3{
        background: linear-gradient(to bottom,rgb(254,158,113),rgb(255,109,142));;
        color:white;
        padding-bottom: 1rem;
    }
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .img_layout{
    margin-top: 1rem;
    width: 4rem;
    border-radius: 50%;
    margin-left: 1rem;
    

  }
  .card_layout .patientame{
      margin-top: 0.5rem;
      margin-left: 1rem;
      width:3rem;
      text-align: center;
    
  }

  .card_layout .feature{
      width:3rem;
      margin-left: 1rem;
      text-align: center;
      background: rgba(20,60,119,192);
      margin-top: 0.5rem;
  }
  .card_layout .content>.el-col{
      margin-top:1rem;
  }
  .card_layout .bk_layout{
      background: white;
  }
.card_layout .bk_layout i{
    font-size: 2rem;
}
  .card_layout .bk_layout>.el-col{
    padding: 0;
    justify-content: center;
    display: flex;
  }
  .container .main_layout .el-card__body{
      padding: 0;
  }
</style>