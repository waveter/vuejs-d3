import Vue from "vue";
import VueRouter from "vue-router";
import { HOME_PAGE } from "@/constants/routing-url";

Vue.use(VueRouter);

const routes = [
  {
    path: HOME_PAGE,
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "*",
    component: () => import("@/views/Home")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
