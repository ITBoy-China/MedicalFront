<template>
    <div class="my-footer">
        <el-row>
            <el-col :span="12" :offset="6">
                <el-row>
                    <el-col :span="8"  class="my-font">
                        <div>合计：{{finalFee}}元</div>
                    </el-col>
                    <el-col :span="10">
                        <el-button type="primary" @click="sub()" :disabled="canUse">立即挂号</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'settlement',
    props:{
        finalFee:{
            type:String,
            default:"0"
        },
        canUse:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        sub:function(){
            this.$emit('gua',true);
        }
    }
}
</script>

<style scoped>
    .my-footer{
        width:100%;
        height: 100%;
        background-color: #fff;
        border-top: 1px solid rgba(0,0,0,0.1);
        padding:40px;
    }

    .my-font{
        font-size: 20px;
        font-weight: bold;
        color:rgb(46,105,235);
        padding-right: 60px;
        text-align: right;
        height:40px;
        line-height: 40px;
    }
</style>