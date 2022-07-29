<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" model-value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="英雄名称">
            <el-input v-model="state.model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="state.model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="uploadUrl"
              :headers="Authorization" :show-file-list="false" :on-success="afterUpload">
              <img v-if="state.model.avatar" :src="state.model.avatar" class="avatar" />
              <el-icon v-else class="el-icon-plus avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="state.model.categories" multiple>
              <el-option v-for="item in state.categories" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.5rem" :max="9" show-score v-model="state.model.scores.difficult" />
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.5rem" :max="9" show-score v-model="state.model.scores.skills" />
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.5rem" :max="9" show-score v-model="state.model.scores.attack" />
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.5rem" :max="9" show-score v-model="state.model.scores.survive" />
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="state.model.items1" multiple>
              <el-option v-for="item in state.items" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="state.model.items2" multiple>
              <el-option v-for="item in state.items" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="state.model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="state.model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="state.model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="state.model.skills.push({})">
            <el-icon>
              <Plus />
            </el-icon>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :span="12" v-for="(item, index) in state.model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="uploadUrl"
                  :headers="Authorization" :show-file-list="false" :on-success="res => item.icon = res.data.url">
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <el-icon v-else class="el-icon-plus avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="state.model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();

const props = defineProps({
  id: {},
});

const state = reactive({
  model: {
    name: "",
    avatar: "",
    title: "",
    categories: [],
    scores: {
      difficult: 0,
      skills: 0,
      attack: 0,
      survive: 0,
    },
    skills: {},
  },
  categories: [],
  items: [],
});

const uploadUrl = computed(() => {
  return `${proxy.$http.defaults.baseURL}/upload`
})

const Authorization = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}

function afterUpload(res) {
  console.log(res)
  state.model.avatar = res.data.url;
}

async function save() {
  let res;
  if (props.id) {
    res = await proxy.$http.put(`rest/heros/${props.id}`, state.model);
  } else {
    res = await proxy.$http.post("rest/heros", state.model);
  }
  proxy.$router.push("/heros/list");
  ElMessage({
    type: "success",
    message: "保存成功",
  });
}

async function fetch() {
  const res = await proxy.$http.get(`rest/heros/${props.id}`);
  state.model = Object.assign({}, state.model, res.data);
}

async function fetchCategories() {
  const res = await proxy.$http.get(`rest/categories`);
  state.categories = res.data;
}

async function fetchItems() {
  const res = await proxy.$http.get(`rest/items`);
  state.items = res.data;
}

onMounted(() => {
  props.id && fetch();
  fetchCategories();
  fetchItems();
});
</script>

<style lang="scss">
</style>
