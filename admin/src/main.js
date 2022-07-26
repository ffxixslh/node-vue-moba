import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "./router";
import http from "./http";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.$http = http;
app.config.globalProperties.$router = router;
app.use(ElementPlus).use(router);
app.mount("#app");
