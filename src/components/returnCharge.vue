<template>
    <div class="rcharge">
        <el-row style="margin-top:20px;">
            <el-col :span="22" :offset="1" class="my-row">
                <div class="my-tag">
                    <div>门诊退费</div>
                </div>
                <el-row>
                    <el-col :span="18">
                        <el-form :ref="searchForm" :model="searchForm" label-width="100px" prop="department">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="就诊卡号：">
                                        <el-input v-model="searchForm.id" placeholder="请输入患者就诊卡号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item>
                                        <el-button type="primary" @click="searchPatient()">点击查询患者信息</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item>
                                        <el-button type="primary" @click="rb()">退费</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="22" :offset="1" class="my-row">
                <div class="my-tag">
                    <div>用户信息</div>
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
            <el-col :span="22" :offset="1" class="my-row">
                <div class="my-tag">
                    <div>处方药品</div>
                </div>
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
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">退费</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
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
        </el-row>
    </div>
</template>

<script>
export default {
    name:"returnCharge",
    data(){
        return{
            searchForm:{
                id:''
            },
            tableData:[],
            drugData:[],
            editForm:{
                code:'',
                name:'',
                nums:'',
                index:'',
                row:''
            },
            dialogVisible:false,
            loading:false
        }
    },
    methods:{
        rb(){
            var that = this;
            that.$message({
                message:"退费成功",
                type:"success"
            });
            //更新数据
            var data = [];
            var tp = {
                'userId':that.tableData[0].patientId,
                'userInfo':that.tableData,
                'drugData':that.drugData
            };
            data.push(tp);
            var dt = {"data":data};
            localStorage.setItem('userInfo',JSON.stringify(dt));var data = [];
            var tp = {
                'userId':that.tableData[0].patientId,
                'userInfo':that.tableData,
                'drugData':that.drugData
            };
            data.push(tp);
            var dt = {"data":data};
            localStorage.setItem('userInfo',JSON.stringify(dt));
            that.tableData = [];
            that.drugData = [];
        },
        searchPatient(){
            var that = this;
            that.loading = true;
            //获取患者信息
            //获取输入的患者Id
            var id = that.searchForm.id;
            //获取localstorage数据
            var data = JSON.parse(localStorage.getItem('userInfo'));
            data = data.data;
            var drugInfo = undefined;
            var userInfo = undefined;

            for(var i=0;i<data.length;i++){
                if(id==data[i].userId){
                    userInfo = data[i].userInfo;
                    drugInfo = data[i].drugData;
                    break;
                }
            }

             if(userInfo!=undefined && drugInfo!=undefined){
                 that.tableData = userInfo;
                 that.drugData = drugInfo;
             }else{
                 that.$message({
                    message:"查询失败，没有相关信息",
                    type:"error"
                });
             }
             that.loading = false;
        },
        editSub(){
            var that = this;
            //弹窗不可见
            that.dialogVisible = false;
            //数据更新
            that.drugData[that.editForm.index].nums = that.editForm.nums;
            that.drugData[that.editForm.index].amount = 
            Number.parseInt(that.editForm.nums)*Number.parseInt(that.drugData[that.editForm.index].unitPrice);
        },
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
      }
    }
}
</script>

<style scoped>
    .rcharge{
        width: 100%;
        height: 100%;
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