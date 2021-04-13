import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ArticleDetail from "@/views/ArticleDetail.vue";
import Login from "@/views/Login.vue";
import UserCenter from "@/views/UserCenter.vue";
import ArticleCreate from "@/views/ArticleCreate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/article/:id", // 动态路由
    name: "ArticleDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ArticleDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/:username",
    name: "UserCenter",
    component: UserCenter,
  },
  {
    path: "/article/create",
    name: "ArticleCreate",
    component: ArticleCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
