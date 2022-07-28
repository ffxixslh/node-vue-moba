<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="state.model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="state.model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, toRefs } from 'vue'
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();

const props = defineProps({
  id: {}
})

const state = reactive({
  model: {},
})

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`rest/admin_users/${props.id}`, state.model)
  } else {
    res = await proxy.$http.post('rest/admin_users', state.model)
  }
  proxy.$router.push('/admin_users/list')
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}

async function fetch() {
  const res = await proxy.$http.get(`rest/admin_users/${props.id}`)
  state.model = res.data
}

onMounted(() => {
  props.id && fetch()
})


</script>

<style lang="scss" scoped>
</style>