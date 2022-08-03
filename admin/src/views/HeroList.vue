<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <img :src="scope.row.avatar" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="proxy.$router.push(`/heros/edit/${scope.row._id}`)">
            编辑</el-button>
          <el-button link type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const { proxy } = getCurrentInstance();
let items = ref([]);

async function fetch() {
  const res = await proxy.$http.get("rest/heros");
  items.value = res.data; //用ref的话需要用value来访问
  console.log(res.data)
}

async function remove(row) {
  ElMessageBox.confirm(`是否确定要删除分类 "${row.name}"?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await proxy.$http.delete(`rest/heros/${row._id}`);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      fetch();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
}

onMounted(fetch);
</script>

<style lang="scss" scoped>
</style>
