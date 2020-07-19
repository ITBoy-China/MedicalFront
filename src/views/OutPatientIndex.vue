<template>
    <div class="main">
        <heads :title="title" class="my-head"  @quitNumber="getQuitNumberFlag" :pa="pa"></heads>
        <outpatientContainer class="my-container" @finalFee="getFees" @canUse="getDisabled" ref="child"></outpatientContainer>
        <settlement class="my-settle" :finalFee="allFees" :canUse="isDisabled" @gua="getFlag"></settlement>
        <el-dialog title="提示" :visible.sync="quitNumberFlag" width="60%">
            <el-row>
                <el-col>
                    <el-table :data="outpatientData" style="width: 100%">
                        <el-table-column prop="outpatientId" label="病历号" width="240px">
                        </el-table-column>
                        <el-table-column prop="patientName" label="姓名" width="100px">
                        </el-table-column>
                        <el-table-column prop="departName" label="科室" width="80px">
                        </el-table-column>
                        <el-table-column prop="name" label="医生姓名" width="100px">
                        </el-table-column>
                        <el-table-column prop="registerTime" label="挂号时间">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">退号</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="quitNumberFlag = false">取 消</el-button>
                <el-button type="primary" @click="subQuitNumber()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import heads from 'components/header.vue'
import outpatientContainer from 'components/OutPatientContainer.vue'
import settlement from 'components/Settlement.vue'
import Bus from '../assets/js/bus'

export default {
    name:"OutPatientIndex",
    //注册组件
    components:{
        heads,
        outpatientContainer,
        settlement
    },
    data(){
        return {
            token:'',
            patientID:'',
            title:'门诊挂号系统',
            allFees:'0',
            isDisabled:true,
            quitNumberFlag:false,
            outpatientData:[],
            pa:'patient'
        }
    },
    created(){
        var that = this;
        var id = that.$cookie.get("id");
        if(id!=null && id!=undefined){
            that.patientID = id;
        }else{
            Bus.$on('patientId',(val)=>{
                that.patientID = val;
                //将id写入cookie
                that.$cookie.set("id",val);
            });
        }
    },
    mounted(){
        var that = this;
        //判断 页面是否有token 如果没有token重定向到 登录页面
         var tken = this.$cookie.get("token");
         if(tken==null || tken==undefined){
             //cookie为空 重定向
             this.$router.push({'path':'/OutPatient/login'});
         }else{
             this.token = tken;
         }
         that.$refs.child.setId(that.patientID);
         that.$refs.child.dataGet();
    },
    beforeDestroy(){
        Bus.$off('patientId');
    },
    methods:{
        getFees(val){
            this.allFees = val;
        },
        getDisabled(val){
            this.isDisabled = val;
        },
        getFlag(val){
            this.$refs.child.setVisable(true);
        },
        getQuitNumberFlag(val){
            var that = this;
            that.quitNumberFlag = val;
            that.getAppointments();
        },
        subQuitNumber(){
            var that = this;
            this.quitNumberFlag = false;
        },
        handleDelete(index, row) {
            var that = this;
            //获取病历号
            var id = that.outpatientData[index].outpatientId;
            //构造请求的url
            var url = "http://localhost:8003/out/api/outpatients/"+id;
            var data = {
                "status":"3"
            };
            that.$axios.put(url,JSON.stringify(data),{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    that.$message({
                        message: '退号成功',
                        type: 'success'
                    });
                }else{
                    that.$message({
                        message: '退号失败',
                        type: 'error'
                    });
                }
            });
            //从前端删除
            that.outpatientData.splice(index,1);
        },
        getAppointments(){
            var that = this;
            var url = "http://localhost:8003/out/api/outpatientInfos/patients/"+that.patientID;
            that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    var data = res.data;
                    for(var i=0;i<data.length;i++){
                       data[i].registerTime = data[i].registerTime.split(/[T|+|.]/)[0]+" "+data[i].registerTime.split(/[T|+|.]/)[1];
                    }
                    that.outpatientData = data;
                }else{
                    that.$message({
                        message: '挂号数据获取失败',
                        type: 'error'
                    });
                }

            })
        }
    }
}
</script>

<style scoped>
    .main{
        width:100%;
        height:100%;
        background-color: rgb(241,241,241);
        overflow: hidden;
    }

    .my-head{
        width:100%;
        height: 10%;
    }

    .my-container{
        width: 100%;
        height: 75%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .my-settle{
        width:100%;
        height: 15%;
    }
</style>