<template>
  <div id="app">
    <ErrorDialog />
    <ConfirmDialog />
    <Loading
      :active="$store.getters.loadingReqNumber > 0"
      :is-full-page="true"
      loader="dots"
    ></Loading>
    <Header />
    <div class="body-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import ErrorDialog from "@/components/common/ErrorDialog.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import Loading from "vue-loading-overlay";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App.vue",
  components: {
    ErrorDialog,
    ConfirmDialog,
    Loading,
    Header,
    Footer
  },
  created() {
    this.setupInterceptor();
  },
  methods: {
    setupInterceptor() {
      axios.interceptors.request.use(
        config => {
          console.log(config);
          this.showLoading();
          return config;
        },
        error => {
          this.hideLoading();
          return Promise.reject(error);
        }
      );
      axios.interceptors.response.use(
        response => {
          console.log(response);
          this.hideLoading();
          return response;
        },
        error => {
          console.log(error);
          this.hideLoading();
          this.showErrorDialog({ message: "TBD: There is an error" });
        }
      );
    }
  }
};
</script>

<style lang="scss">
.body-container {
  min-height: calc(100vh - 128px);
}

.line-chart-tooltip .tooltip-inner {
  background: transparent;
}

.line-chart-tooltip .arrow {
  display: none !important;
}

.grid line {
  opacity: 0.1;
}

.grid path {
  opacity: 0.1;
}

@media only screen and (max-width: 640px) {
  .x-axis text {
    transform: rotate(-30deg) translate(-10px, 10px);
  }
}
</style>
