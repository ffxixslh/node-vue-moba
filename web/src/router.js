import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("./views/Main.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue"),
      },
    ],
  },
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
