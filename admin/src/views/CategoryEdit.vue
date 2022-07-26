<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="state.model.parent">
          <el-option v-for="item in state.parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="state.model.name"></el-input>
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
  parents: {},
})

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`categories/${props.id}`, state.model)
  } else {
    res = await proxy.$http.post('categories', state.model)
  }
  proxy.$router.push('/categories/list')
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}

async function fetch() {
  const res = await proxy.$http.get(`categories/${props.id}`)
  state.model = res.data
  console.log(state.model);
}

async function fetchParentOptions() {
  const res = await proxy.$http.get(`categories`)
  state.parents = res.data
  console.log(state.model);
}

onMounted(() => {
  props.id && fetch()
  fetchParentOptions()
})


</script>

<style lang="scss" scoped>
</style>