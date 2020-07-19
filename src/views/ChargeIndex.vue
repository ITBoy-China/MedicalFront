<template>
    <div class="main">
        <el-row class="whole">
            <el-col :span="3" class="left">
                <sideBar :itemOne="itemOne" :itemTwo="itemTwo" :itemThree="itemThree" class="si-bar"></sideBar>
            </el-col>
            <el-col :span="21" class="right">
                <heads :title="title" class="my-head" :pa="pa"></heads>
                <div class="container">
                    <router-view @amount="getAmount" @percent="getPercent" ref="child"></router-view>
                </div>
                <chargeFooter class="charge-footer" :myAmount="amount" :percent="percent" @ensurePay="getEnsurePay" v-if="showOrNot"></chargeFooter>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import heads from 'components/header.vue'
import sideBar from 'components/side-bar.vue'
import chargeFooter from 'components/chargeFooter.vue'
export default {
    name:"ChargeIndex",
    components:{
        heads,
        sideBar,
        chargeFooter
    },
    data(){
        return{
            title:'医院收费系统',
            itemOne:'门诊收费',
            itemTwo:'门诊退费',
            itemThree:'收费查询',
            pa:'charge',
            amount:0,
            percent:1.0,
            ensurePay:false,
            showOrNot:true
        }
    },
    mounted(){
        var that = this;
        var last = that.$route.path.split('/')[3];
        if(last=='pcharge'){
            that.showOrNot = true;
        }else if(last=='qcharge' || last=='rcharge'){
            that.showOrNot = false;
        }
    },
    methods:{
        getAmount(val){
            this.amount = val;
        },
        getPercent(val){
            this.percent = val;
        },
        getEnsurePay(val){
            this.ensurePay = val;
            //调用子组件的方法执行收款操作
            this.$refs.child.ensureGetPaid();
            var payList = localStorage.getItem('payList');
        }
    }
}
</script>

<style scoped>
     .main{
        width:100%;
        height:100%;
        background-color: rgb(241,241,241);
    }

    .right{
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .my-head{
        height: 10%;
    }

    .si-bar{
        height: 100%;
    }

    .whole{
        width: 100%;
        height:100%;
    }

    .container{
        width:100%;
        height: 75%;
        flex-grow: 1;
        overflow-x:hidden;
        overflow-y: scroll;
    }

    .left{
        height:100%;
        overflow: hidden;
    }

    .charge-footer{
        width:100%;
        height: 15%;
    }
</style>