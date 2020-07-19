<template>
    <div class="qcharge">
        <el-row style="margin-top:20px;">
            <el-col :span="22" :offset="1" class="my-row">
                <div class="my-tag">
                    <div>收费查询</div>
                </div>
                <el-row>
                    <el-col :span="18">
                        <el-form :ref="searchForm" :model="searchForm" label-width="100px" prop="department">
                            <el-row>
                                <el-col :span="16">
                                    <el-form-item label="就诊卡号：">
                                        <el-input v-model="searchForm.id" placeholder="请输入患者就诊卡号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                    <el-form-item>
                                        <el-button type="primary" @click="searchPay()">点击查询患者缴费记录</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="22" :offset="1" class="my-row">
                <div class="my-tag">
                    <div>缴费信息</div>
                </div>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="payInfo" stripe style="width: 100%" v-loading="loading">
                            <el-table-column prop="id" label="就诊卡号" width="280">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="120">
                            </el-table-column>
                            <el-table-column prop="feature" label="合同类型" width="120">
                            </el-table-column>
                            <el-table-column prop="paid" label="实际支付">
                            </el-table-column>
                            <el-table-column prop="helpPay" label="报销">
                            </el-table-column>
                            <el-table-column prop="shouldPay" label="原总额">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:"queryCharge",
    data(){
        return {
            searchForm:{
                id:''
            },
            payInfo:[],
            loading:false
        }
    },
    methods:{
        searchPay(){
            var that = this;
            that.loading = true;
            //数据初始化
            that.payInfo = [];
            //获取输入的患者Id
            var id = that.searchForm.id;
            //获取localstorage数据
            var data = JSON.parse(localStorage.getItem('userInfo'));
            data = data.data;
            var drugInfo = undefined;
            var userInfo = undefined;
            for(var i=0;i<data.length;i++){
                if(id==data[i].userId){
                    userInfo = data[i].userInfo[0];
                    drugInfo = data[i].drugData;
                    break;
                }
            }

            if(userInfo!=undefined && drugInfo!=undefined){
                //获取应该支付总额
                var am = 0;
                for(var i=0;i<drugInfo.length;i++){
                    am+=drugInfo[i].amount;
                }
                //获取实际支付总额
                var rlPay = 0;
                if(userInfo.patientFeature=="医保"){
                    rlPay = (Number(am)*0.7).toFixed(1);
                }else{
                    rlPay = am;
                }
                var tbData = {
                    "id":id,
                    "name":userInfo.patientName,
                    "feature":userInfo.patientFeature,
                    "paid":rlPay,
                    "helpPay":am-rlPay,
                    "shouldPay":am
                };
                that.payInfo.push(tbData);
                that.$message({
                    message:"查询成功",
                    type:"success"
                });
                that.loading = false;
            }else{
                that.$message({
                    message:"没有相关缴费信息",
                    type:"error"
                });
                that.loading = false;
            }
        }
    }
}
</script>

<style scoped>
    .qcharge{
        width:100%;
        height:100%;
    }

    .my-row{
        background-color: #fff;
        padding:20px;
        margin-bottom: 20px;
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
        margin-bottom: 15px;
    }
</style>