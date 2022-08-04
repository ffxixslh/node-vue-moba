import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "main",
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
      // 文章
      {
        path: "/articles/create",
        component: () => import("./views/ArticleEdit.vue"),
      },
      {
        path: "/articles/edit/:id",
        component: () => import("./views/ArticleEdit.vue"),
        props: true,
      },
      {
        path: "/articles/list",
        component: () => import("./views/ArticleList.vue"),
      },
      // 广告位
      {
        path: "/ads/create",
        component: () => import("./views/AdEdit.vue"),
      },
      {
        path: "/ads/edit/:id",
        component: () => import("./views/AdEdit.vue"),
        props: true,
      },
      {
        path: "/ads/list",
        component: () => import("./views/AdList.vue"),
      },
      // 管理员
      {
        path: "/admin_users/create",
        component: () => import("./views/AdminUserEdit.vue"),
      },
      {
        path: "/admin_users/edit/:id",
        component: () => import("./views/AdminUserEdit.vue"),
        props: true,
      },
      {
        path: "/admin_users/list",
        component: () => import("./views/AdminUserList.vue"),
      },
    ],
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("./views/404.vue"),
  },
];

const router = createRouter({
  // 配置地址栏中的路径
  history: createWebHistory("/admin"),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
