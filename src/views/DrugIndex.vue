<template>
    <div class="main">
        <heads :title="title" :pa="pa"></heads>
        <div class="container">
            <el-row>
                <el-col :span="22" :offset="1" class="my-row">
                    <el-row>
                        <el-col :span="24">
                            <div class="my-tag">
                                <div>买药表查询</div>

                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23" class="base-info">
                            <!--表格禁用 关闭-->
                            <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :disabled="false">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="就诊卡号：">
                                            <el-input v-model="baseInfoForm.patientId" placeholder="请输入就诊卡号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item>
                                            <el-button type="primary" round @click=dataQuery()>查询</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>


                        </el-col>
                    </el-row>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="22" :offset="1" class="my-row">
                    <el-row>
                        <el-col :span="24">
                            <div class="my-tag">
                                <div>买药表信息</div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="23" class="base-info">
                            <!--                                                                    表格禁用 关闭-->
                            <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :disabled="false">
                                <el-row>
                                    <el-col :span="5">
                                        <el-form-item label="姓名：">
                                            <el-input
                                                    placeholder="我叫姓名"
                                                    v-model="baseInfoForm.name"
                                                    :disabled="true">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="年龄：">
                                            <el-input
                                                    placeholder="我是年龄"
                                                    v-model="baseInfoForm.age"
                                                    :disabled="true">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="性别：">
                                            <el-input
                                                    placeholder="我是性别"
                                                    v-model="baseInfoForm.sex"
                                                    :disabled="true">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-table
                                            :data="tableData"
                                            style="width: 100%">
                                        <el-table-column type="expand">
                                            <template slot-scope="props">
                                                <el-form label-position="left" inline class="demo-table-expand">
                                                    <el-form-item label="就诊时间">
                                                        <span>{{ props.row.recordTime}}</span>
<!--                                                            <span>你好</span>-->
                                                    </el-form-item>
                                                    <el-form-item label=" ">
                                                        <span>{{ props.row.recordId2 }}</span>
                                                    </el-form-item>



                                                    <el-form-item
                                                            v-for=" (item) in props.row.drugNames"
                                                            v-bind:item="item"
                                                            v-bind:index="index"
                                                            v-bind:key="item.index"

                                                            label="药品" >
                                                        <span>{{ item.drugName }}</span>
                                                        <span>{{ item.payCount}}</span>
                                                    </el-form-item>
<!--                                                    <el-form-item-->


<!--                                                            label="药品数量">-->
<!--                                                        <span>{{ props.row.payCount }}</span>-->
<!--                                                    </el-form-item>-->


                                                    <el-form-item label="收费状态">
                                                        <span>{{ props.row.payStatus }}</span>
                                                    </el-form-item>
                                                    <el-form-item label=" ">
                                                        <span>{{ props.row.desc }}</span>
                                                        <el-button type="success" round @click=sendDrug(props.row)>核销药品</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="就诊时间"
                                                prop="recordTime">
                                        </el-table-column>
                                        <el-table-column
                                                label="处方单号"
                                                prop="medicalListId">
                                        </el-table-column>

                                        <el-table-column
                                                label="收费状态"
                                                prop="payStatus">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import heads from 'components/header.vue'
    import Bus from '../assets/js/bus'

    export default {
        name: "DrugIndex",
        //注册组件
        components: {
            heads
        },
        data() {
            return {
                token: '',
                patientID:'',
                baseInfoForm: {
                    name: '',
                    age: '',
                    sex: '',
                    patientId: '',
                },
                title:'药房发药系统',
                pa:'drug',
                //    处方单表用--开始   固定数据
                // tableData: [{
                    //name
                    //age
                    //sex
                    //medicalListId
                    //recordDate
                    //drug[{drugId:"01",drugName:"",drugCount="*"}]
                    //payStatus: 1:已付款 2：未付款 3：已发货 0 暂存
                    //传过来是一个 数组 按medicalListId 划分的
                    // recordTime:"1",
                    // medicalListId:"2",
                    // payStatus:"3",
                    // recordId2:" ",
                    // drugName:[{
                    //     drugid:"01",
                    //     drugname:"名字1",
                    //     payCount:"*2"
                    // },{
                    //     drugid: "02",
                //         drugname: "名字2",
                //         payCount:"*3"
                //
                //     }],
                //     // payCount:"6"
                // },
                //     {
                //         recordTime:"1",
                //         medicalListId:"2",
                //         payStatus:"3",
                //         recordId2:" ",
                //         drugName:"5",
                //         payCount:"6"
                //     },
                //     {}]
                //动态数据
                tableData:[]
                //    处方单表用--结束
            }
        },
        created() {
            var that = this;
            Bus.$on('patientId', (val) => {
                that.patientID = val;
                //将id写入cookie
                that.$cookie.set("id", val);
            });
            var id = that.$cookie.get("id");
            if (id != null && id != undefined) {
                that.patientID = id;
            }
        },
        mounted() {
            var that = this;
            //判断 页面是否有token 如果没有token重定向到 登录页面
            var tken = this.$cookie.get("token");
            if (tken == null || tken == undefined) {
                //cookie为空 重定向
                this.$router.push({'path': '/Drug/login'});
            } else {
                this.token = tken;
            }
            //发送数据请求
            // that.dataGet();
        },
        beforeDestroy() {
            Bus.$off('patientId');
        },
        methods: {
            //获取页面数据
            /* dataGet:function(){
                 var that = this;
                 //构造请求url
                 var url = "http://localhost:8003/out/api/patients/"+that.patientID;
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
                         that.baseInfoForm.name = data.patientName;
                         that.baseInfoForm.age = data.age;
                         that.baseInfoForm.sex = data.sex;
                         that.baseInfoForm.birth = data.birth.split("T")[0];
                         that.baseInfoForm.bankCard = data.bankCard;
                         that.baseInfoForm.patientFeature = data.patientFeature;
                         that.baseInfoForm.address = data.address;
                         that.baseInfoForm.address = data.address;
                         that.baseInfoForm.idCard = data.identityCard;
                         that.baseInfoForm.tel = data.phone;
                         that.baseInfoForm.remark = data.remark;
                     }
                  });
             },
 */
            //获取买药表数据
            // dataQuery:function(){

            dataQuery: function () {

                var that = this;
                // console.log(that.tableData);
                //构造请求url
                var url = "http://localhost:8003/out/api/patients/" + that.baseInfoForm.patientId;
                // console.log("-------------" + that.baseInfoForm.patientId)
                that.$axios.get(url, {
                    headers: {
                        'content-type': 'application/json',
                        'access_token': that.token
                    }
                }).then((res) => {
                    // console.log(res);
                    res = res.data;
                    // console.log(that.tableData);
                    this.baseInfoForm.name = " ";
                    this.baseInfoForm.age = " ";
                    this.baseInfoForm.sex = " ";
  /*                  this.tableData.recordDate = " 1";
                    this.tableData.medicalListId = " 2";
                    this.tableData.payStatus = "3 ";*/

                    if (res.code == 20000 && res.flag == true) {
                        //数据渲染
                        var data = res.data;
                        this.baseInfoForm.name = data.patientName;
                        this.baseInfoForm.age = data.age;
                        this.baseInfoForm.sex = data.sex;
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '查询失败',
                            type: 'error'
                        });
                    }

})

                // console.log("----------------"+ that.baseInfoForm.patientId)
                //
                // url = "http://localhost:8003/drg/api/medicallists/" + that.baseInfoForm.patientId;
                url = "http://localhost:8003/drg/api/DrugInfos/" + that.baseInfoForm.patientId;
                // console.log(url);
                //
                that.$axios.get(url, {
                    headers: {
                        'content-type': 'application/json',
                        'access_token': that.token
                    }
                }).then((res) => {
                    // console.log("--------------------");
                    // console.log("--------------------");
                    // console.log("--------------------");
                    // console.log("--------------------");
                    console.log(res);
                    res = res.data;

                    if (res.code == 20000 && res.flag == true) {
                        //数据渲染
                        // var data = res.data;

                        // console.log(that.tableData);
                        that.tableData = res.data.tableData;
                        // console.log(that.data);
                        // this.tableData = data;
                        // console.log(this.tableData);
                        // console.log(that.tableData);
                        // this.tableData.recordTime = data.recordTime;
                        // this.tableData.medicalListId = data.medicalListId;
                        // this.tableData.payStatus = data.payStatus;
                        // this.tableData.id = data.recordDate;
                        // this.tableData.name = data.medicalListId;
                        // this.tableData.desc = data.payStatus;
                        //         this.$message({
                        //             message: '查询成功',
                        //             type: 'success'
                        //         });
                    }
                    else {
                        this.$message({
                            message: '查询失败',
                            type: 'error'
                        });
                    }
                });
                //
                //
                // console.log("----------------"+ that.baseInfoForm.patientId)
                //
                // url = "http://localhost:8003/drg/api/records/" + that.baseInfoForm.patientId;
                //
                // that.$axios.get(url, {
                //     headers: {
                //         'content-type': 'application/json',
                //         'access_token': that.token
                //     }
                // }).then((res) => {
                //     console.log("--------------------");
                //     console.log("--------------------");
                //     console.log("--------------------");
                //     console.log("--------------------");
                //     console.log(res);
                //     res = res.data;
                //
                //     if (res.code == 20000 && res.flag == true) {
                //         //数据渲染
                //         var data = res.data;
                //
                //         that.tableData = data;
                //         // this.tableData.recordDate = data.recordDate;
                //         // this.tableData.medicalListId = data.medicalListId;
                //         // this.tableData.payStatus = data.payStatus;
                //         // this.tableData.id = data.recordDate;
                //         // this.tableData.name = data.medicalListId;
                //         // this.tableData.desc = data.payStatus;
                //         /*        this.$message({
                //                     message: '查询成功',
                //                     type: 'success'
                //                 });*/
                //     }
                //     else {
                //         this.$message({
                //             message: '查询失败',
                //             type: 'error'
                //         });
                //     }
                // });




            },

            sendDrug: function (param){
                // console.log(param);
                var that = this;
                // 构造请求url
                var url = "http://localhost:8003/drg/api/records/updateStatus/" + param.medicalListId;
                // console.log("-------------" + that.baseInfoForm.patientId)
                that.$axios.put(url, {},{
                    headers: {
                        'content-type': 'application/json',
                        'access_token': that.token
                    }
                }).then((res) => {
                    // console.log(res);
                    res = res.data;
                    // console.log(that.tableData);
                    // this.baseInfoForm.name = " ";
                    // this.baseInfoForm.age = " ";
                    // this.baseInfoForm.sex = " ";
                    /*                  this.tableData.recordDate = " 1";
                                      this.tableData.medicalListId = " 2";
                                      this.tableData.payStatus = "3 ";*/

                    if (res.code == 20000 && res.flag == true) {
                        //数据渲染
                        var data = res.data;
                        // this.baseInfoForm.name = data.patientName;
                        // this.baseInfoForm.age = data.age;
                        // this.baseInfoForm.sex = data.sex;
                        this.$message({
                            message: '发货成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '发货失败',
                            type: 'error'
                        });
                    }

                })

            }





        },}







</script>


<style scoped>
    .main {
        width: 100%;
        height: 100%;
        background-color: rgb(241, 241, 241);
    }

    .container {
        position: relative;
    }

    .my-row {
        background-color: #fff;
        margin-top: 10px;
        padding: 20px;
    }

    .my-tag {
        width: 90px;
        height: 34px;
        color: #fff;
        text-align: center;
        background-color: rgb(46, 105, 235);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .base-info {
        margin-top: 16px;
    }

    .fee-about {
        width: 100%;
        border-top: 1px solid red;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        z-index: 2;
    }

    /*处方单表格用--开始*/
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    /*处方单表格用--结束*/
</style>