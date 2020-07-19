<template>
  <div class="main">
    <div class="register-box">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="rules"
        :label-position="labelPosotion"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" class="whiteItem" prop="patientName">
              <el-input type="text" placeholder="请输入真实姓名" v-model="registerForm.patientName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄：" class="whiteItem" prop="age">
              <el-input type="text" placeholder="请输入真实年龄" v-model="registerForm.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" class="whiteItem" prop="sex">
              <el-radio-group v-model="registerForm.sex">
                <el-radio label="男" class="whiteItem"></el-radio>
                <el-radio label="女" class="whiteItem"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质：" class="whiteItem" prop="patientFeature">
              <el-select v-model="registerForm.patientFeature" placeholder="请选择性质">
                <el-option label="医保" value="0"></el-option>
                <el-option label="自费" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生年月：" class="whiteItem" prop="birth">
              <el-input type="date" v-model="registerForm.birth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号：" class="whiteItem" prop="identityCard">
              <el-input type="text" placeholder="请输入身份证号码" v-model="registerForm.identityCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行卡号：" class="whiteItem" prop="bankCard">
              <el-input type="text" placeholder="请输入银行卡号" v-model="registerForm.bankCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码：" class="whiteItem" prop="phone">
              <el-input type="text" placeholder="请输入电话号码" v-model="registerForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址：" class="whiteItem" prop="address">
              <el-cascader
                size="large"
                :options="options"
                v-model="registerForm.address"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址：" class="whiteItem" prop="detailAddress">
              <el-input
                type="text"
                placeholder="请输入详细地址(具体到小区)"
                v-model="registerForm.detailAddress"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button
                type="primary"
                class="my-btn-register"
                @click="register('registerForm')"
              >点击注册</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  name: "OutPatientRegister",
  data() {
    //年龄验证
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入年龄"));
      }
      value = Number.parseInt(value);
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0 || value > 150) {
            callback(new Error("请输入正常年龄"));
          } else {
            callback();
          }
        }
      }, 0);
    };
    //身份证号码验证
    var checkIdNumber = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };

      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        return callback(new Error("身份证号格式错误"));
      } else if (!city[code.substr(0, 2)]) {
        return callback(new Error("地址编码错误"));
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split(""); //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            return callback(new Error("校验位错误"));
          }
        }
      }
      return callback();
    };
    var checkBankNumber = (rule, value, callback) => {
      var reg = /^\d{19}$/g; // 以19位数字开头，以19位数字结尾
      if (!reg.test(value)) {
        return callback(new Error("银行卡号错误"));
      }
      return callback();
    };
    var checkTel = (rule, value, callback) => {
      var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (value.length == 11) {
        //手机号码
        if (!phone.test(value)) {
          return callback(new Error("电话号码错误"));
        }
      } else {
        return callback(new Error("电话号码位数错误"));
      }
      return callback();
    };
    return {
      registerForm: {
        patientName: "",
        age: "",
        sex: "男",
        birth: "",
        bankCard: "",
        phone: "",
        patientFeature: "",
        identityCard: "",
        address: "",
        detailAddress: ""
      },
      labelPosotion: "right",
      options: regionData,
      selectedOptions: [],
      rules: {
        patientName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        patientFeature: [
          { required: true, message: "请选择性质", trigger: "blur" }
        ],
        birth: [
          { required: true, message: "请选择出生年月日", trigger: "blur" }
        ],
        identityCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: checkIdNumber, trigger: "blur" }
        ],
        bankCard: [
          { required: true, message: "请输入银行卡号码", trigger: "blur" },
          { validator: checkBankNumber, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        address: [{ required: true, message: "请选择地址", trigger: "blur" }],
        detailAddress: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register:function(formName) {
      this.$refs[formName].validate((valid) => {
        var arr = this.registerForm.address;
        var feature;
        if(this.registerForm.patientFeature=="1"){
            feature = "自费";
        }else{
            feature = "医保";
        }
        if (valid) {
            var data = {
                "patientName":this.registerForm.patientName,
                "age":this.registerForm.age,
                "sex":this.registerForm.sex,
                "birth":this.registerForm.birth,
                "bankCard":this.registerForm.bankCard,
                "phone":this.registerForm.phone,
                "patientFeature":feature,
                "identityCard":this.registerForm.identityCard,
                "address":CodeToText[arr[0]]+CodeToText[arr[1]]+CodeToText[arr[2]]+this.registerForm.detailAddress,
                "delFlag":"0"
            };
            //构造url
            var url = 'http://localhost:8003/out/api/patients';
            this.$axios.post(url,JSON.stringify(data),{
              headers:{
                'content-type':'application/json'
              }
            }).then((res)=>{
                var res = res.data;
                if(res.flag==true && res.code==20000){
                    //成功申请就诊卡 拿到卡号
                    var number = res.data;
                    this.$alert(number, '您的就诊卡号如下，请牢记就诊卡号', {
                        confirmButtonText: '确定',
                        callback: action => {
                          this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                          });
                        }
                      });
                      //跳转到登录页面
                      this.$router.push({'path':'/OutPatient/login'});
                }else{
                  //申请就诊卡失败
                  this.$message({
                      message: '申请就诊卡失败',
                      type: 'error'
                  });
                }
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  /*设置背景图片*/
  background-image: url(../assets/images/background.jpg);
  /*设置背景图片尺寸*/
  background-size: cover;
  /*设置背景图片位置*/
  background-position: center;
  /*设置背景颜色*/
  background-color: #fff;
  /*使regist-box水平垂直居中*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/*设置背景继承并且模糊*/
.main:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(2px);
  z-index: 2;
}

/*设置盒子文字不模糊*/
.register-box {
  color: #fff !important;
  position: absolute;
  z-index: 11;
  width: 42%;
  height: 50%;
  border-radius: 10px;
  background-color: rgba(230, 230, 230, 0.1);
  padding: 20px 15px;
}

.my-btn-register {
  width: 100%;
}
</style>