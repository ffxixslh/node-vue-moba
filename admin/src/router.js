import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/index.vue"),
      children: [
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
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about.vue"),
    },
  ],
});
