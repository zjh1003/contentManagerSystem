<template>
    <div class="admin">
        <el-container>
             <!-- 侧边 -->
            <el-aside width="200px">
                 <app-aside></app-aside>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                     <app-header></app-header>
                </el-header>
                <!-- 主体 -->
                <el-main>
                     <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import Header from './subcom/Header.vue'
    import Aside from './subcom/Aside.vue'

    export default {
      components: {
          appHeader:Header,
          appAside:Aside
      }
    }
</script>

<style scoped lang="less">

    .admin{
        height: 100%;
        background-color: #B3C0D1;
        .el-container{
            height: 100%;
             .el-header {
                color: #333;
                line-height: 60px;
                text-align: right;
            }
            .el-aside {
                background-color: #D3DCE6;
                color: #333;
            }
            .el-main {
                background-color: #E9EEF3;
                color: #333;
  }
        }
    }

     
</style>