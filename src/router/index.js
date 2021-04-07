/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index.vue"),
    meta: {
      isRedirectIfLoggedIn: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/index.vue"),
    meta: {
      isRedirectIfLoggedIn: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/profile/index.vue"),
    meta: {
      isRedirectIfLoggedIn: true,
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/signup/index.vue"),
  },
  {
    path: "/password-retrieval/:code",
    name: "PasswordRetrieval",
    component: () => import("../views/passwordretrieval/index.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/forgotpassword/index.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    component: () => import("../views/404/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// Check token khi chuyển route
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.isRedirectIfLoggedIn) {
    if (!token) {
      store.commit("removeAuthentication");
      return next({ name: "Login" });
    }
  }
  return next();
});
export default router;
