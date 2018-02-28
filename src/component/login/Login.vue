<template>
    <div>
        {{key}}
    </div>
</template>

<script>
   
    export default {
        data() {
            return {
                key: '登录'
            }
        },
        created () {
            // axios.get(domain+api.logout).then(()=>{
            //     console.log("logout");
                
            // })
            this.$http.get(this.$api.logout).then(()=>{
                console.log('tuichu');
                
            })
        }
    }
</script>

<style scoped>

</style>