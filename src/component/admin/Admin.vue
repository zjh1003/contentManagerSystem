<template>
    <div>
      <!-- 头部 -->
      <app-header></app-header>
      <!-- 侧边 -->
      <app-aside></app-aside>
      <!-- 主体 -->
      <router-view></router-view>
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

<style scoped>

</style>