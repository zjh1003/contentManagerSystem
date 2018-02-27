<template>
    <div>
        {{key}}
        <router-view></router-view>
        <!-- ui组件 -->
        <el-button type="danger" round>危险按钮</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: 'hello world'
            }
        },
    }
</script>

<style scoped>

</style>