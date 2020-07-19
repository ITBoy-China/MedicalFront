<template>
    <div class="charge">
        <el-row class="charge-row">
            <el-col :span="22" :offset="1" class="main-card">
                <el-row class="rows">
                    <el-col :span="24">
                        <div class="my-tag">
                            <div>患者查询</div>
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
                                                <el-button type="primary" @click="searchPatient()">点击查询患者信息</el-button>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="rows">
                    <el-col :span="24">
                        <div class="my-tag">
                            <div>患者信息</div>
                        </div>
                        <el-row>
                            <el-col :span="24">
                                <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                                    <el-table-column prop="patientId" label="就诊卡号" width="280">
                                    </el-table-column>
                                    <el-table-column prop="patientName" label="姓名" width="120">
                                    </el-table-column>
                                    <el-table-column prop="sex" label="性别" width="120">
                                    </el-table-column>
                                    <el-table-column prop="age" label="年龄">
                                    </el-table-column>
                                    <el-table-column prop="departName" label="诊室">
                                    </el-table-column>
                                    <el-table-column prop="doctorName" label="医生">
                                    </el-table-column>
                                    <el-table-column prop="patientFeature" label="合同单位">
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="rows">
                    <el-col :span="24">
                        <div class="my-tag">
                            <div>处方药品</div>
                        </div>
                    </el-col>
                        <el-row>
                            <el-col :span="24">
                                <el-table :data="drugData" height="250" border style="width: 100%" v-loading="loading">
                                    <el-table-column prop="code" label="编码" width="120">
                                    </el-table-column>
                                    <el-table-column prop="name" label="药品名称" width="220">
                                    </el-table-column>
                                    <el-table-column prop="nums" label="数量" width="80">
                                    </el-table-column>
                                    <el-table-column prop="unit" label="单位" width="120">
                                    </el-table-column>
                                    <el-table-column prop="amount" label="金额" width="80">
                                    </el-table-column>
                                    <el-table-column prop="feature" label="结算" width="80">
                                    </el-table-column>
                                    <el-table-column prop="unitPrice" label="单价" width="80">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                      </el-row>
                </el-row>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                    <el-row>
                        <el-col :span="24">
                            <el-form :model="editForm" :ref="editForm" label-width="120px">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item prop="code" label="药品编号：">
                                            <el-input v-model="editForm.code" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-col :span="23">
                                    <el-form-item prop="name" label="药品名称：">
                                        <el-input v-model="editForm.name" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="23">
                                    <el-form-item prop="nums" label="药品数量：">
                                        <el-input v-model="editForm.nums"></el-input>
                                    </el-form-item>
                                </el-col>
                                
                            </el-form>
                        </el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editSub()">确 定</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Bus from '../assets/js/bus'
export default {
    name:"charge",
    data(){
        return {
            searchForm:{
                id:''
            },
            tableData:[],
            drugData:[],
            token:'',
            loading:false,
            mListId:'',
            dialogVisible:false,
            editForm:{
                code:'',
                name:'',
                nums:'',
                index:'',
                row:''
            },
            amount:0
        }
    },
    mounted(){
        var that = this;
        //判断 页面是否有token 如果没有token重定向到 登录页面
         var tken = this.$cookie.get("token");
         if(tken==null || tken==undefined){
             //cookie为空 重定向
             this.$router.push({'path':'/Charge/login'});
         }else{
             this.token = tken;
         }
    },
    methods:{
      handleEdit(index, row) {
          //编辑的处理方法
          var that = this;
          that.dialogVisible = true;
          //数据初始化
          that.editForm.code = '';
          that.editForm.name = '';
          that.editForm.nums = '';
          that.editForm.index = '';
          that.editForm.row = '';
          //赋值数据
          that.editForm.code = row.code;
          that.editForm.name = row.name;
          that.editForm.nums = row.nums;
          that.editForm.index = index;
          that.editForm.row = row;
      },
      handleDelete(index, row) {
        var that = this;
        //删除table中的数据
        that.drugData.splice(index,1);
        that.setAmount();
      },
      editSub(){
          var that = this;
          //弹窗不可见
          that.dialogVisible = false;
          //数据更新
          that.drugData[that.editForm.index].nums = that.editForm.nums;
          that.drugData[that.editForm.index].amount = 
          Number.parseInt(that.editForm.nums)*Number.parseInt(that.drugData[that.editForm.index].unitPrice);
          that.setAmount();
      },
      searchPatient(){
          var that = this;
          that.loading = true;
          //清空原来的数据
          that.tableData = [];
          that.drugData = [];
          that.mListId = '';
          if(that.searchForm.id==null || that.searchForm.id==undefined || that.searchForm.id==''){
              that.$message({
                message: '就诊卡号不允许为空',
                type: 'warning'
              });
              that.loading = false;
          }else{
            //构造请求的url 查询患者信息
            var url = "http://localhost:8003/out/api/PatientDetInfos/"+that.searchForm.id
            that.$axios.get(url,{
                headers:{
                    'content-type':'application/json',
                    'access_token':that.token
                }
            }).then((res)=>{
                res = res.data;
                if(res.code==20000 && res.flag==true){
                    var data = res.data;
                    that.tableData.push(data);
                    if(data.patientFeature=="医保"){
                        that.$emit('percent',0.7);
                    }else{
                        that.$emit('percent',1.0);
                    }
                    //构造请求的url查询 患者药方信息
                    var ul = "http://localhost:8003/out/api/PatientDrugs/"+data.outpatientId;
                    that.$axios.get(ul,{
                        headers:{
                            'content-type':'application/json',
                            'access_token':that.token
                        }
                    }).then((response)=>{
                        response = response.data;
                        if(response.code==20000 && response.flag==true){
                            var data = response.data;
                            //将获取的处方单号存储为全局变量
                            if(data.length>0){
                                that.mListId = data[0].mlistId;
                                for(var i=0;i<data.length;i++){
                                    that.drugData.push(data[i]);
                                }
                            }
                            that.setAmount();
                            that.loading = false;
                            this.$message({
                                message: '查询成功',
                                type: 'success'
                            });
                        }else{
                            that.loading = false;
                            this.$message({
                                message: '无开药记录',
                                type: 'error'
                            });
                        }
                    });
                }else{
                    that.loading = false;
                    this.$message({
                        message: '就诊卡号有误',
                        type: 'error'
                    });
                }
            });
          }
      },
      setAmount(){
          var that = this;
          //遍历
          var sum = 0;
          for(var i=0;i<that.drugData.length;i++){
              sum+=that.drugData[i].amount;
          }
          that.amount = sum;
          that.$emit('amount',sum);
      },
      ensureGetPaid(){
          var that = this;
          //构造请求的url
          var url = "http://localhost:8003/out/api/records";
          //构造发送的数据
          var data = [];
          for(var i=0;i<that.drugData.length;i++){
              var tmp = {
                  "medicalListId":that.drugData[i].mlistId,
                  "drugId":that.drugData[i].drugId,
                  "payCount":that.drugData[i].nums,
                  "payStatus":"1"
              };
              data.push(tmp);
          }
          that.$axios.put(url,data,{
              headers:{
                'content-type':'application/json',
                'access_token':that.token
              }
          }).then((res)=>{
              res = res.data;
              if(res.code==20000 && res.flag==true){
                  this.$message({
                    message: '收款成功',
                    type: 'success'
                  });
                  //在localstorage里存入 用户相关信息
                  var userInfo = localStorage.getItem('userInfo');
                  if(userInfo==null || userInfo==undefined){
                      var data = [];
                      var tp = {
                          'userId':that.tableData[0].patientId,
                          'userInfo':that.tableData,
                          'drugData':that.drugData
                      };
                      data.push(tp);
                      var dt = {"data":data};
                      localStorage.setItem('userInfo',JSON.stringify(dt));
                  }else{
                      var tp = {
                          'userId':that.tableData[0].patientId,
                          'userInfo':that.tableData,
                          'drugData':that.drugData
                      };
                      userInfo.data.push(tp);
                      localStorage.setItem('userInfo',JSON.stringify(userInfo));
                  }

              }else{
                  this.$message({
                    message: '收款失败',
                    type: 'error'
                  });
              }
          });
      }
    }
}
</script>

<style scoped>
    .charge{
        width:100%;
        height:100%;
        background-color: rgb(241,241,241);
    }

    .charge-row{
        height: 100%;
    }

    .main-card{
        padding:20px;
        border-radius: 2px;
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

    .rows{
        margin-bottom: 20px;
        background-color: #fff;
        padding:20px;
    }
</style>