<template>
    <div>
        <el-dropdown @command="handleCommand" size="medium" split-button type="primary">
            <span>你好,{{uname}}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cpwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                uname: localStorage.getItem('uname')
            }
        },
        methods: {
            handleCommand(command){
                if(command=='logout'){
                    this.$alert("确认退出吗？","提示",{
                            callback: action => {
                                this.logout();
                                // this.$message({
                                // type: 'info',
                                // message: `action: ${ action }`
                                // });
                        }
                    })
                    // this.logout();
                }
            },
            logout(){
                this.$http.get(this.$api.logout).then(()=>{
                    this.$router.push({ name: 'login' })
                })
            }
        }
    }
</script>

<style scoped>

</style>