<template>
  <div>
    <div class="login-container">
      <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="login" :label-position="labelPosition">
          <el-form-item label="用户名">
            <el-input v-model="state.model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="state.model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();

const labelPosition = ref("top")

const state = reactive({
  model: {
    username: "",
    password: ""
  },
})

async function login() {
  const res = await proxy.$http.post('login', state.model)
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('username', state.model.username);
  proxy.$router.push('/');
  ElMessage.success('登录成功');
}

</script>

<style lang="scss">
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>