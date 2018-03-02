<template>
    <div class="login">
       
       <section>
            <h2>商城后台管理系统</h2>
           <el-form :model="ruleForm2" label-position="top" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="uname">
                    <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
           </el-form>
       </section>
    </div>
</template>

<script>
    export default {
      data() {
     
    //   var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.ruleForm2.checkPass !== '') {
    //         this.$refs.ruleForm2.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
      
      return {
        //表单数据
        ruleForm2: {
          uname: '',
          upwd: ''
        },
        //验证规则
        rules2: {
          uname: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          upwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        //登录
        login(){
            this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{
                // console.log(res.data);
                if(res.data.status==0){
                    localStorage.setItem('uname',res.data.message.uname)
                    this.open()
                    this.$router.push({ name: 'admin' })
                }else{
                    this.$alert(res.data.message)
                }
            })
        },
        open() {
        this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success'
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.login();
          } else {
            console.log('error submit!!');
            return false;
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    }
</script>

<style scoped lang="less">

    .login{
        height: 100%;
        background-color: #35495e;
        // padding-top: 80px;
        h2{
            text-align: center;
            color: #fff;
            position: absolute;
            top: -80px;
            left: 75px;
        }
        
        section{
            width: 400px;
            height: 300px;
            border: 1px solid #fff;
            border-radius: 5px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin: 0 auto;
            .demo-ruleForm{
                padding: 10px;
            }
        }
    }
</style>