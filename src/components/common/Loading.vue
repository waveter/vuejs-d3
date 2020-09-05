<template>
  <loading
    active.sync="$store.getters.loadingReqNumber > 0"
    :is-full-page="true"
  ></loading>
</template>

<script>
export default {
  name: "Loading",
  data: function() {
    return {
      isShow: false,
      message: "",
      messageList: [],
      closeLabel: "",
      onCloseCallback: null,
      callBackData: null
    };
  },
  methods: {}
};
</script>
