import Vue from "vue";
import {
  METHOD_SET_ERROR_DIALOG,
  METHOD_SET_CONFIRM_DIALOG,
  METHOD_SET_TOAST_MESSAGE,
  METHOD_MODIFY_LOADING_REQ_NUMBER
} from "../constants/vuex-methods.js";

Vue.mixin({
  methods: {
    showErrorDialog(error) {
      this.$store.dispatch(METHOD_SET_ERROR_DIALOG, error);
    },
    showConfirmDialog(confirm) {
      this.$store.dispatch(METHOD_SET_CONFIRM_DIALOG, confirm);
    },
    showToastMessage(message) {
      this.$store.dispatch(METHOD_SET_TOAST_MESSAGE, { message: message });
    },
    showLoading() {
      this.$store.dispatch(METHOD_MODIFY_LOADING_REQ_NUMBER, 1);
    },
    hideLoading() {
      this.$store.dispatch(METHOD_MODIFY_LOADING_REQ_NUMBER, -1);
    },
    hideErrorDialog() {
      this.$store.dispatch(METHOD_SET_ERROR_DIALOG, null);
    },
    hideConfirmDialog() {
      this.$store.dispatch(METHOD_SET_CONFIRM_DIALOG, null);
    },
    showToast(content) {
      this.$bvToast.toast(content, {
        title: `Success`,
        variant: "success",
        solid: true
      });
    }
  }
});
