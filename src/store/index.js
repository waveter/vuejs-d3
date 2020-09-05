import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingReqNumber: 0,
    errorDialog: null,
    confirmDialog: null,
    toast: null
  },

  mutations: {
    modifyLoadingReqNumber(state, payload) {
      state.loadingReqNumber += payload;
    },
    setErrorDialog(state, payload) {
      state.errorDialog = payload;
    },
    setConfirmDialog(state, payload) {
      state.confirmDialog = payload;
    },
    setToast(state, payload) {
      state.toast = payload;
    }
  },

  actions: {
    modifyLoadingReqNumber({ commit }, payload) {
      commit("modifyLoadingReqNumber", payload);
    },
    setErrorDialog({ commit }, payload) {
      commit("setErrorDialog", payload);
    },
    setConfirmDialog({ commit }, payload) {
      commit("setConfirmDialog", payload);
    },
    setToast({ commit }, payload) {
      commit("setToast", payload);
    }
  },

  getters: {
    loadingReqNumber(state) {
      return state.loadingReqNumber;
    },
    errorDialog(state) {
      return state.errorDialog;
    }
  }
});
