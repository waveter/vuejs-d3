import Vue from "vue";
import VueRouter from "vue-router";
import { CORONA_TIMELINE } from "@/constants/routing-url";

Vue.use(VueRouter);

const routes = [
  {
    path: CORONA_TIMELINE,
    name: "corona-timeline",
    component: () => import("@/views/CoronaTimeLine")
  },
  {
    path: "*",
    component: () => import("@/views/CoronaTimeLine")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
