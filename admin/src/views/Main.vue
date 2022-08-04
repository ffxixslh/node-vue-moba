<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          router
          :default-openeds="['3']"
          unique-opened
          default-active="proxy.$router.path"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon> <message></message> </el-icon>内容管理
            </template>
            <el-menu-item-group>
              <template #title>物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>英雄</template>
              <el-menu-item index="/heros/create">新建英雄</el-menu-item>
              <el-menu-item index="/heros/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon> <Stopwatch /> </el-icon>运营管理
            </template>
            <el-menu-item-group>
              <template #title>广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon> <Setting /> </el-icon>系统设置
            </template>
            <el-menu-item-group>
              <template #title>分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>管理员</template>
              <el-menu-item index="/admin_users/create"
                >新建管理员</el-menu-item
              >
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting></setting>
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="adminLogout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>你好，{{username}}</span>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view :key="route.path"></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { Menu, Message, Setting } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

// setup 中用 useRoute 获取路由地址
// 可以用 useRouter 获取路由对象
const route = useRoute();
const router = useRouter();

const username = localStorage.getItem("username");

// 退出登录
const adminLogout = () => {
  ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      router.push("/login");
      ElMessage.success("退出成功！");
    })
    .catch(() => {
      ElMessage.info("取消退出！");
    });
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
