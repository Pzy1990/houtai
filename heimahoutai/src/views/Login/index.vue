<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="rules" label-width="0px">
      <img src="./images/login-img.png" alt />
      <el-form-item prop="mobile">
        <el-input v-model="loginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code"></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="loginForm.checked">我已经阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" :loading="isLoging" @click="login">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/network/api/login';
export default {
  name: 'Login',
  components: {

  },
  props: {

  },
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        checked: false
      },
      isLoging: false,
      // 表单验证规则
      rules: {
        mobile: [
          { required: true, message: '手机号码', trigger: 'blur' },
          { pattern: /^1[3|5|8|9][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6位数', trigger: 'blur' }
        ],
        checked: [
          {
            validator: (rules, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error('请勾选协议!'));
              }
            }, trigger: 'blur'
          }
        ]
      }

    };
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    async login () {
      this.$refs['loginForm'].validate(async (res) => {
        if (res) { // 如果验证成功发送请求
          this.isLoging = true;
          try {
            const res = await login(this.loginForm);
            // 保存token到sessionStorage
            window.sessionStorage.setItem('token', res.data.data.token);
            this.$message.success('登录成功！');
            // 登录成功后进入主页面
            this.$router.push('/home');
            this.isLoging = false;
            console.log(res);
          } catch (error) {
            this.$message.error('登录失败！');
            this.isLoging = false;
          }
        } else {
          return;
        }
      });
    }

  }
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: pink;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 300px;
    height: 300px;
    background-color: white;
    padding: 0 50px;

    img {
      width: 100%;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
