import { createApp } from "vue";
import "./assets/sass/style.scss";
import "./assets/iconfont/iconfont.css";
import router from "@/router.js";
import App from "./App.vue";
import Card from "@/components/Card.vue";
import ListCard from "@/components/ListCard.vue";

const app = createApp(App);
app.component("m-card", Card);
app.component("m-list-card", ListCard);
app.use(router);
app.mount("#app");
