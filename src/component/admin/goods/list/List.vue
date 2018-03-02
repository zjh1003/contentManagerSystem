<template>
    <div class="list">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物商场</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <hr>
        <!-- 按钮组和搜索框 -->
        <div class="list_btns">
            <el-button icon="el-icon-circle-plus-outline" size="mini" plain>新增</el-button>
            <el-button icon="el-icon-circle-check-outline" size="mini" plain>全选</el-button>
            <el-button icon="el-icon-delete" size="mini" plain>删除</el-button>
            <div class="list_btns_search">
                <el-input size="mini" placeholder="请输入搜索内容">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
        <!-- 变化的列表 -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: value
            }
        },
    }
</script>

<style scoped lang="less">
    .list{
        &_btns{
            margin-top: 10px;
            border:1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            &_search{
                width: 200px;
                float: right;
            }
        }
    }
</style>