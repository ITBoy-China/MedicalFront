<template>
    <div class="header">
        <el-row>
            <el-col :span="6" class="title">
                <!--                <span>门诊挂号系统</span>-->
                <span>药房发药系统</span>
            </el-col>
            <el-col :span="18" class="rigth-status">
                <el-dropdown class="dropdownList">
                    <span class="el-dropdown-link">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"heads"
    }
</script>

<style scoped>
    .header{
        height:60px;
        border-bottom: 1px solid rgb(0,0,0,0.1);
        background-color: #fff;
    }

    .title{
        font-weight: bold;
        font-size: 20px;
        padding:17px;
    }
    .rigth-status{
        text-align: right;
        padding-right: 40px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dropdownList{
        vertical-align: middle;
    }
</style>