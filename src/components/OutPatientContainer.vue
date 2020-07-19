<template>
    <div class="container">
            <el-row>
                <el-col :span="22" :offset="1" class="my-row">
                    <el-row>
                        <el-col :span="24">
                            <div class="my-tag">
                                <div>基本信息</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" class="base-info">
                            <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :disabled="true">
                                <el-row>
                                    <el-col :span="4">
                                        <el-form-item label="姓名：">
                                            <el-input v-model="baseInfoForm.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item label="年龄：">
                                            <el-input v-model="baseInfoForm.age"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="性别：">
                                            <el-input v-model="baseInfoForm.sex"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item label="出生日期：">
                                            <el-input v-model="baseInfoForm.birth"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="银行卡号：">
                                            <el-input v-model="baseInfoForm.bankCard"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="性质：">
                                            <el-input v-model="baseInfoForm.patientFeature"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="地址：">
                                            <el-input v-model="baseInfoForm.address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="身份证号码：">
                                            <el-input v-model="baseInfoForm.idCard"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="电话号码：">
                                            <el-input v-model="baseInfoForm.tel"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col  :span="24">
                                        <el-form-item label="备注：">
                                            <el-input v-model="baseInfoForm.remark"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="my-row my-second">
                    <el-row>
                        <el-col :span="24">
                            <div class="my-tag">
                                <div>科室信息</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" class="base-info">
                            <el-form ref="doctorInfoForm" :model="doctorInfoForm" label-width="100px">
                                <el-row>
                                    <el-col :span="5">
                                        <el-form-item label="科室：" prop="department">
                                            <el-select v-model="doctorInfoForm.department" placeholder="请选择所挂科室" @change="getDoctors()">
                                                <el-option v-for="(item,index) in departName" :label="item" :value="item" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="医生：" prop="doctor">
                                            <el-select v-model="doctorInfoForm.doctor" placeholder="请选择医生" :disabled="doctorInfoForm.formIsDisabled" @change="getFees()">
                                                <el-option v-for="(item,index) in doctorName" :label="item" :value="item" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1" class="my-row my-third">
                    <el-row>
                        <el-col :span="24">
                            <div class="my-tag">
                                <div>收费信息</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" class="base-info">
                            <el-form ref="feeInfoForm" :model="feeInfoForm" label-width="100px" :disabled="true">
                                <el-row>
                                    <el-col :span="5">
                                        <el-form-item label="挂号费：">
                                            <el-input v-model="feeInfoForm.numberFee"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="手续费：">
                                            <el-input v-model="feeInfoForm.proceduresFee"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-dialog title="提示" :visible.sync="subFlag" width="30%">
                <el-row class="myTips">
                    <el-col :span="24">
                        <span>您的挂号信息如下：</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <span>姓名：{{baseInfoForm.name}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>科室：{{doctorInfoForm.department}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>医生：{{doctorInfoForm.doctor}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>费用：{{feeInfoForm.numberFee+feeInfoForm.proceduresFee}}</span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancle()">取 消</el-button>
                    <el-button type="primary" @click="guahao()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</template>

<script>
export default {
    name:'outpatientContainer',
    data(){
        return {
            tk:'',
            pd:'',
            baseInfoForm: {
                name: '',
                age:'',
                sex:'',
                birth:'',
                bankCard:'',
                patientFeature:'',
                address:'',
                idCard:'',
                tel:'',
                remark:''
            },
            doctorInfoForm:{
                department:'',
                doctor:'',
                formIsDisabled:true
            },
            feeInfoForm:{
                //挂号费和手续费
                numberFee:0,
                proceduresFee:0
            },
            departName:[],
            doctorName:[],
            subFlag:false,
            departData:''
        }
    },
    created(){
        var that = this;
        that.tk = that.$cookie.get("token");
        //that.pd = that.$cookie.get("id");
        //console.log(that.pd);
    },
    mounted(){
        var that = this;
        //发送数据请求
        // that.dataGet();
    },
    methods:{
        //获取页面数据
        dataGet:function(){
            var that = this;
            //构造请求url
            var url = "http://localhost:8003/out/api/patients/"+that.pd;
            that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.tk
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    //数据渲染
                    var data = res.data;
                    that.baseInfoForm.name = data.patientName;
                    that.baseInfoForm.age = data.age;
                    that.baseInfoForm.sex = data.sex;
                    that.baseInfoForm.birth = (data.birth || "").split("T")[0];
                    that.baseInfoForm.bankCard = data.bankCard;
                    that.baseInfoForm.patientFeature = data.patientFeature;
                    that.baseInfoForm.address = data.address;
                    that.baseInfoForm.idCard = data.identityCard;
                    that.baseInfoForm.tel = data.phone;
                    that.baseInfoForm.remark = data.remark;
                }else{
                    this.$message({
                        message: '数据获取失败',
                        type: 'error'
                    });
                }
            });

            //构造请求的url
            var ul = 'http://localhost:8003/doct/api/departments';
            that.$axios.get(ul,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.tk
                }
            }).then((response)=>{
                response = response.data;
                if(response.code==20000 && response.flag==true){
                    //获取成功
                    var data = response.data;
                    //数据先清空
                    that.departName = [];
                    that.doctorInfoForm.department = '';
                    that.departData = data;
                    for(var i = 0;i<data.length;i++){
                        that.departName.push(data[i].departName);
                    }
                }else{
                    console.log("数据获取失败");
                }
            });
        },
        //获取医生数据
        getDoctors:function(){
            var that = this;
            that.doctorInfoForm.formIsDisabled = false;
            //构造请求的url
            var url = "http://localhost:8003/doct/api/doctor/depart/"+that.doctorInfoForm.department;
            that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.tk
                }
            }).then((res)=>{
                res = res.data;
                //数据清除
                that.doctorName = [];
                that.doctorInfoForm.doctor = '';
                if(res.code==20000 && res.flag==true){
                    that.doctorName = res.data;
                }else{
                    console.log("数据获取失败");
                }
            });
            this.$emit('finalFee',"0");
            this.$emit('canUse',true);
            that.feeInfoForm.numberFee = 0;
            that.feeInfoForm.proceduresFee = 0;
        },
        //获取挂号费用
        getFees:function(){
            var that = this;
            var feeOne = 6 + Math.floor(Math.random() * 11);
            var feeTwo = 1 + Math.floor(Math.random() * 6);
            that.feeInfoForm.numberFee = feeOne;
            that.feeInfoForm.proceduresFee = feeTwo;
            //向父组件发送数据
            this.$emit('finalFee',feeOne+feeTwo+"");
            this.$emit('canUse',false);
        },
        guahao:function(){
            var that = this;
            //构造请求的url
            var url = "http://localhost:8003/out/api/outpatients";
            //获取部门id
            var code = undefined;
            for(var i=0;i<that.departData.length;i++){
                if(that.departData[i].departName==that.doctorInfoForm.department){
                    code = that.departData[i].departId;
                }
            }
            var data = {
                "patientId":that.pd,
                "employeeName":that.doctorInfoForm.doctor,
                "departId":code,
                "registerPrice":that.feeInfoForm.numberFee+that.feeInfoForm.proceduresFee
            };
            that.setVisable(false);
            that.$axios.post(url,JSON.stringify(data),{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.tk
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    this.$message({
                        message: '挂号成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '挂号失败',
                        type: 'error'
                    });
                }
            });
        },
        cancle(){
            this.subFlag = false;
        },
        setVisable(val){
            this.subFlag = val;
        },
        setId(val){
            this.pd = val;
        }
    }
}
</script>

<style scoped>
    .container{
        width:100%;
        height:100%;
    }

    .my-row{
        background-color: #fff;
        margin-top:10px;
        padding:20px;
    }

    .my-tag{
        width:90px;
        height:34px;
        color:#fff;
        text-align: center;
        background-color: rgb(46,105,235);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .base-info{
        margin-top:16px;
    }

    .fee-about{
        width: 100%;
        border-top:1px solid red;
        background-color: #fff;
        position: absolute;
        bottom:0;
        z-index: 2;
    }

    .myTips{
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 16px;
    }
</style>