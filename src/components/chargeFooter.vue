<template>
    <div class="charge-footer">
        <el-row>
            <el-col :span="22" :offset="1" class="center-col">
                <el-form :ref="chargeForm" :model="chargeForm" :inline="true">
                    <el-row>
                        <el-col :span="3">
                            <el-form-item label="自费金额">
                                <el-input :disabled="true" v-model="chargeForm.selfPay"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="总额">
                                <el-input :disabled="true" v-model="chargeForm.shouldPay"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="收款金额">
                                <el-input v-model="chargeForm.paid" @input="myChange()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="找零金额">
                                <el-input :disabled="true" v-model="chargeForm.rtBack"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" class="just-btn">
                            <el-form-item label="确认收款">
                                <el-button type="primary" @click="ensureGet()">确认收款</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="提示" :visible.sync="canBeSee" width="30%">
            <span>是否确认收款？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="canBeSee = false">取 消</el-button>
                <el-button type="primary" @click="finalSub()">确 定</el-button>
            </span>
         </el-dialog>
    </div>
</template>

<script>
import chargeVue from './charge.vue'
export default {
    name:'chargeFooter',
    data(){
        return {
            chargeForm:{
                selfPay:0,
                shouldPay:0,
                paid:0,
                rtBack:0
            },
            space:"",
            canBeSee:false
        }
    },
    props:[
        'myAmount',
        'percent'
    ],
    created(){
        this.chargeForm.shouldPay = this.myAmount;
        this.chargeForm.selfPay = (Number(this.myAmount)*this.percent).toFixed(1);
    },
    watch:{
        myAmount:function(val){
            this.chargeForm.shouldPay = val;
            this.chargeForm.selfPay = (Number(this.chargeForm.shouldPay)*this.percent).toFixed(1);
            this.myChange();
        },
        percent:function(val){
            this.percent = val;
            this.chargeForm.selfPay = (Number(this.chargeForm.shouldPay)*val).toFixed(1);
            this.myChange();
        }
    },
    methods:{
        ensureGet(){
            this.canBeSee = true;
        },myChange(){
            this.chargeForm.rtBack = this.chargeForm.paid - this.chargeForm.selfPay;
        },
        finalSub(){
            var that = this;
            //设置不可见
            that.canBeSee = false;
            //向父组件发送数据
            that.$emit('ensurePay',true);
        }
    }
}
</script>

<style scoped>
    .charge-footer{
        width:100%;
        height:100%;
        background-color: #fff;
        border-top:1px solid rgba(0,0,0,0.1);
    }

    .center-col{
        padding-top:5px;
    }

    .just-btn .el-form-item label{
        display: none !important;
    }
</style>