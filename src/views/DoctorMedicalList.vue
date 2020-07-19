<template>
  <div class="main">
      <heads></heads>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Doctor/login' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/Doctor/index">挂号情况</a></el-breadcrumb-item>
            <el-breadcrumb-item>医生工作</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row  class="list_layout">
        <el-col :span="2">
            <el-link type="primary">添加处方</el-link>
        </el-col>
        <el-col :span="2">
            <el-link type="danger" >清屏</el-link>
        </el-col>
        <el-col :span="2">
            <el-link type="info" >打印</el-link>
        </el-col>
        </el-row>
        <el-row  class="out_layout" :gutter="20"> 
        <el-col :span="5" style="margin-top:-5px">
            <el-input size="mini" v-model="queryCode" @keyup.native="searchMr">
            <template slot="prepend">挂号ID</template>
            </el-input>
        </el-col>
        <el-col :span="3">
            <span>姓名:{{  casedisplay.patientName }}</span>
        </el-col>
        <el-col :span="3">
            <span>年龄:{{ casedisplay.age }}</span>
        </el-col>
        <el-col :span="3">
            <span>性别:{{ casedisplay.sex }}</span>
        </el-col>
        <el-col :span="3">
            <span>挂号科室:{{ casedisplay.departName }}</span>
        </el-col>
        <el-col :span="3">
            <span>医生:{{ casedisplay.doctorName}}</span>
        </el-col>
        <el-col :span="3">
            <span>病人性质:{{ casedisplay.patientFeature}}</span>
        </el-col>
        </el-row>
        <el-main>
            <el-row>
                <el-form ref="medicalList" :model="medicalList"  label-width="80px" class="form_layout">
                    <el-form-item label="挂号ID">
                        <el-input v-model="medicalList.outpatientId"></el-input>
                    </el-form-item>
                    <el-form-item label="医生姓名">
                        <el-input v-model="medicalList.doctorName"></el-input>
                    </el-form-item>
                    <el-form-item label="病人姓名">
                        <el-input v-model="medicalList.patientName"></el-input>
                    </el-form-item>
                    <el-form-item label="医嘱">
                        <el-input v-model="medicalList.remark"></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" round>添加所需药品</el-button>
                        <el-button type="warning" round>清除</el-button>
                    </el-form-item> -->
                </el-form>  
            </el-row>
           <el-row>
               <el-col :span="24">
                    <el-table :data="drugList">
                        <el-table-column label="药品编号" prop="drugCode">
                        </el-table-column>
                        <el-table-column label="药品名称" >
                            <template slot-scope="scope">
                                <input
                                    class="table-input"
                                    type="text"
                                    v-model="scope.row.drugName"
                                    @keyup="searchDrug(scope)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" prop="unit"></el-table-column>
                        <el-table-column label="单价" prop="price"></el-table-column>
                        <el-table-column label="数量" >
                            <template slot-scope="scope">
                            <input
                                class="table-input"
                                type="number"
                                v-model.number="scope.row.drugCount"
                            />
                            </template>
                        </el-table-column>
                        <el-table-column label="总价">
                            <template slot-scope="scope">
                            <span>{{ scope.row.price * scope.row.drugCount }}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <template >
                                    <el-button
                                    type="danger"
                                    plain
                                    size="mini"
                                    @click="deleteDrug(scope)"
                                    >删除</el-button
                                    >
                                </template>
                                </template>
                        </el-table-column>
                        <!-- <div slot="empty" ></div> -->
                    </el-table>
               </el-col>
           </el-row>
           <el-row>
               <el-col>
                   <el-form  label-width="100px" :model="medicalList" ref="medicalList">
                       <el-form-item
                            v-for="(drug, index) in medicalList.drugList"
                            :label=" index "
                            :key="drug.key"
                            
                            :rules="{
                            required: true, message: '药名不能为空', trigger: 'blur'
                            }">
                            <el-input v-model="drug.value"></el-input><el-button >删除</el-button>
                            
                        </el-form-item>
                        
                        <el-form-item style="margin-left:20rem">
                            <el-button type="primary" @click="createMedicalList">提交处方单</el-button>
                            <el-button @click="addBlankDrug">新增药品</el-button>
                            <el-button @click="clearForm">重置</el-button>
                        </el-form-item>
                   </el-form>
               </el-col>
           </el-row>
        </el-main>
            
    
  </div>
</template>

<script>
import heads from 'components/header.vue'
import Bus from '../assets/js/bus'
export default {
    components:{
        heads
    },
    data(){
        return{
            token:'',
            queryCode: '',
            casedisplay: {
            patientName: '',
            age:'',
            sex:'',
            patientFeature:'',
            doctorName:'',
            departName:'',
            },
            medicalList:{
                doctorName:'',
                patientName:'',
                outpatientId:'',
                remark:'',
                
            },
            drugList: []
            // {
            //     drugId: '',
            //     drugName:'',
            //     drugCode: '',
            //     drugCatalog: '',
            //     unit: '',
            //     price: '',
            //     drugCount:'', 
            // }
        } 
    },created(){
        var that = this;
        Bus.$on('patientId',(val)=>{
             that.patientID = val;
             //将id写入cookie
            that.$cookie.set("id",val);
        });
        var id = that.$cookie.get("id");
        if(id!=null && id!=undefined){
            that.patientID = id;
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

    },
    beforeDestroy(){
        Bus.$off('patientId');
    },
    methods:{
        searchMr() {  
	        var that = this;
            //构造请求url
            // console.log(that.queryCode);
            var url = "http://localhost:8003/doct/api/casedisplay/out/"+that.queryCode;
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
                if(data){
                    that.medicalList.outpatientId=that.queryCode;
                    that.casedisplay.patientName = data.patientName;
                    that.casedisplay.age = data.age;
                    that.casedisplay.sex = data.sex;
                    that.casedisplay.patientFeature = data.patientFeature;
                    that.casedisplay.doctorName = data.doctorName;
                    that.casedisplay.departName = data.departName;
                    that.medicalList.doctorName = that.casedisplay.doctorName;
                    that.medicalList.patientName = that.casedisplay.patientName;
                    that.clearDrugList();
                    
                }else{
                   that.clearDrugList();
                   that.clearCase(); 
                }
                
            }
        });
      },
        addBlankDrug() {
        if (
            this.drugList.length == 0 ||
            (this.drugList[this.drugList.length - 1].drugId &&
            this.drugList[this.drugList.length - 1].drugId != "")
        ) {
            this.drugList.push({
            drugId: "",
            drugName:"",
            drugCode: "",
            drugCatalog: "",
            unit: "",
            price: '',
            drugCount: '',
            });
        }
        },
      searchDrug(scope) {
          
        var url = "http://localhost:8003/doct/api/drug/"+scope.row.drugName;
        
        var that = this;
      if (scope.row.drugName && scope.row.drugName != "") {
        console.log(scope.row.drugName);
        that.$axios
          .get(url, {
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
             }).then((res) => {
                 res = res.data;
            if (res.code==20000 && res.flag==true) {
              scope.row.drugId = res.data.drugId;
              scope.row.drugCode = res.data.drugCode;
              scope.row.unit = res.data.unit;
              scope.row.drugCatalog = res.data.drugCatalog;
              scope.row.price = res.data.price;
              scope.row.drugCount = '';
              
            }
          });
      }
    },
    clearAll() {
      this.clearDrugList();
      this.clearCase();
      this.queryCode = "";
    }, clearDrugList() {
      this.drugList = [];
    },
    clearCase() {
      this.casedisplay = {
        patientName: '',
        age:'',
        sex:'',
        patientFeature:'',
        doctorName:'',
        departName:''
      };
    },
    clearForm(){
        var that=this;
        that.medicalList.outpatientId='';
        that.medicalList.doctorName = '';
        that.medicalList.patientName = '';
        that.medicalList.remark='';
    },
     deleteDrug(scope) {
      console.log(scope);
      this.drugList.splice(scope.$index, 1);
    },createMedicalList() {
      if (
        this.medicalList.outpatientId &&
        this.medicalList.outpatientId != "" &&
        this.drugList.length >= 1
      ) {
        let payload = {
            doctorName: this.medicalList.doctorName,
            patientName:this.medicalList.patientName,
            outpatientId:this.medicalList.outpatientId,
            remark:this.medicalList.remark,
            check_recordList: [],
        };
        this.drugList.forEach((drug) => {
          if (drug.drugCode && drug.drugCode != "") {
            payload.check_recordList.push({
              drugName: drug.drugName,
              payCount: drug.drugCount,
              payStatus:"0"
            });
          }
        });
        var url ="http://localhost:8003/doct/api/doctor/medical_list";
        this.$axios.post(url,payload,{
                headers:{
                    'content-type':'application/json',
                    'access_token':this.token
                }
             }).then((resp) => {
                resp=resp.data
          if (resp.code==20000 && resp.flag==true) {
            this.$message({
              type: "success",
              message: "处方单创建成功",
            });
            this.clearAll();
            this.clearForm();
          }
        });
      }
    },
  },
 }
</script>

<style>
.main{
    background: white;
}
.main .list_layout{
    border-bottom:1px solid #999;
    padding: 15px;
    
}

.el-breadcrumb{
    margin:10px ;
}
.main .out_layout{
    background-color:#ebeef5;
    padding:1rem;
}
.el-main .form_layout{
    width:40rem;
    padding: 0.5rem;;
    border:1px solid #ebeef5;
    margin:0 auto;
}   
.el-main .el-table__empty-block {
    min-height: 0px;
}
.main .table-input {
  width: 6rem;
  border: none;
  border-bottom: 1px solid #999;
  outline: none;
}

</style>