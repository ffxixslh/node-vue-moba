import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Main.vue"),
      children: [
        // 分类
        {
          path: "/categories/create",
          component: () => import("./views/CategoryEdit.vue"),
        },
        {
          path: "/categories/edit/:id",
          component: () => import("./views/CategoryEdit.vue"),
          props: true,
        },
        {
          path: "/categories/list",
          component: () => import("./views/CategoryList.vue"),
        },
        // 物品
        {
          path: "/items/create",
          component: () => import("./views/ItemEdit.vue"),
        },
        {
          path: "/items/edit/:id",
          component: () => import("./views/ItemEdit.vue"),
          props: true,
        },
        {
          path: "/items/list",
          component: () => import("./views/ItemList.vue"),
        },
        // 英雄
        {
          path: "/heros/create",
          component: () => import("./views/HeroEdit.vue"),
        },
        {
          path: "/heros/edit/:id",
          component: () => import("./views/HeroEdit.vue"),
          props: true,
        },
        {
          path: "/heros/list",
          component: () => import("./views/HeroList.vue"),
        },
      ],
    },
  ],
});
