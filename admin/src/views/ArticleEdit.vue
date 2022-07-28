<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="state.model.categories" multiple>
          <el-option v-for="item in state.categories" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="state.model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <VueEditor v-model="state.model.body" useCustomImageHandler @imageAdded="handleImageAdded" />
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
import { VueEditor } from "vue3-editor";

const { proxy } = getCurrentInstance();

const props = defineProps({
  id: {}
})

const state = reactive({
  model: {},
  categories: {},
})

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`rest/articles/${props.id}`, state.model)
  } else {
    res = await proxy.$http.post('rest/articles', state.model)
  }
  proxy.$router.push('/articles/list')
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}

async function fetch() {
  const res = await proxy.$http.get(`rest/articles/${props.id}`)
  state.model = res.data
}

async function fetchCategories() {
  const res = await proxy.$http.get(`rest/categories`)
  state.categories = res.data
}

async function handleImageAdded(file, Editor, cursorLocation, resetUploader) {
  // An example of using FormData
  // NOTE: Your key could be different such as:
  // formData.append('file', file)

  const formData = new FormData();
  formData.append("file", file);

  const res = await proxy.$http.post("upload", formData);
  Editor.insertEmbed(cursorLocation, "image", res.data.url);
  resetUploader();
}

onMounted(() => {
  props.id && fetch()
  fetchCategories()
})


</script>

<style lang="scss" scoped>
</style>