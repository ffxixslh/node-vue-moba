<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="state.model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="state.model.items.push({})">
          <el-icon>
            <Plus />
          </el-icon>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap; width: 100%;">
          <el-col :span="24" v-for="(item, index) in state.model.items" :key="index">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem;">
              <el-upload class="avatar-uploader" :action="proxy.$http.defaults.baseURL + '/upload'"
                :show-file-list="false" :on-success="res => item.image = res.url">
                <img v-if="item.image" :src="item.image" class="avatar" />
                <el-icon v-else class="el-icon-plus avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="state.model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
  model: {
    items: [],
  },
})

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`rest/ads/${props.id}`, state.model)
  } else {
    res = await proxy.$http.post('rest/ads', state.model)
  }
  proxy.$router.push('/ads/list')
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}

async function fetch() {
  const res = await proxy.$http.get(`rest/ads/${props.id}`)
  state.model = Object.assign({}, state.model, res.data)
}

onMounted(() => {
  props.id && fetch()
})


</script>

<style lang="scss">
</style>