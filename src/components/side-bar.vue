<template>
    <div class="side">
        <el-row class="tac">
            <el-col :span="24" class="my-nav">
                <div class="logo-row">
                    <el-avatar :src="picUrl"></el-avatar>
                </div>
                <el-menu
                :default-active="activate"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="0" @click="navi(0)">
                    <i class="el-icon-coin"></i>
                    <span slot="title">{{itemOne}}</span>
                </el-menu-item>
                <el-menu-item index="1" @click="navi(1)">
                    <i class="el-icon-s-check"></i>
                    <span slot="title">{{itemTwo}}</span>
                </el-menu-item>
                <el-menu-item index="2" @click="navi(2)">
                    <i class="el-icon-search"></i>
                    <span slot="title">{{itemThree}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'sideBar',
    data(){
        return {
            picUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1388202087,739452272&fm=26&gp=0.jpg',
            activate:'0'
        }
    },
    props:[
        'itemOne',
        'itemTwo',
        'itemThree'
    ],
    created(){
        var that = this;
        var last = that.$route.path.split('/')[3];
        if(last=='pcharge'){
            that.activate = '0';
        }else if(last=='rcharge'){
            that.activate = '1';
        }else if(last=='qcharge'){
            that.activate = '2';
        }
    },
    methods:{
        //路由跳转
        navi:function(val){
            if(val==0){
                this.$router.push({'path':'/Charge/index/pcharge'});
            }else if(val==1){
                this.$router.push({'path':'/Charge/index/rcharge'});
            }else if(val==2){
                this.$router.push({'path':'/Charge/index/qcharge'});
            }else{
                this.$router.push({'path':'/Charge/index/pcharge'});
            }
        }
    }
}
</script>

<style scoped>
    .side{
        height:100%;
        background-color:#545c64;
    }

    .tac,.my-nav{
        height:100%;
    }

    .logo-row{
        height:10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-menu{
        border-right-width: 0px !important;
    }
</style>