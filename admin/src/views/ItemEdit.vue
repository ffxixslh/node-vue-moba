<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="state.model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="proxy.$http.defaults.baseURL + '/upload'" :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="state.model.icon" :src="state.model.icon" class="avatar" />
          <el-icon v-else class="el-icon-plus avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();

const props = defineProps({
  id: {},
});

const state = reactive({
  model: {},
});

function afterUpload(res) {
  state.model.icon = res.url;
}

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`rest/items/${props.id}`, state.model);
  } else {
    res = await proxy.$http.post("rest/items", state.model);
  }
  proxy.$router.push("/items/list");
  ElMessage({
    type: "success",
    message: "保存成功",
  });
}

async function fetch() {
  const res = await proxy.$http.get(`rest/items/${props.id}`);
  state.model = res.data;
}

onMounted(() => {
  props.id && fetch();
});
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
