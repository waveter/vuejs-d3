import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mixins/common-state-functions";
import "./mixins/data-format-functions";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueI18n from "vue-i18n";
import en from "@/assets/i18n/en.json";

Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
export const languages = {
  en: en
};
const i18n = new VueI18n({
  locale: "en",
  messages: Object.assign(languages)
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
