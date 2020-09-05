<template>
  <b-modal v-if="$store.getters.loadingReqNumber === 0" v-model="isShow">
    <template v-slot:modal-title> {{ $t("confirm-dialog.title") }}</template>
    <div class="confirm-body">
      <div class="confirm-icon-container">
        <b-icon-exclamation-triangle-fill
          class="confirm-icon"
        ></b-icon-exclamation-triangle-fill>
      </div>
      <div class="confirm-message-container">
        <div v-if="message">{{ message }}</div>
      </div>
    </div>
    <template v-slot:modal-footer>
      <b-button class="accept-btn" variant="primary" @click="onAccept">
        {{ acceptLabel }}
      </b-button>
      <b-button class="reject-btn" variant="warning" @click="onReject">
        {{ rejectLabel }}
      </b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: "ConfirmDialog",
  data: function() {
    return {
      isShow: false,
      message: "",
      acceptLabel: "",
      rejectLabel: "",
      onCloseCallback: null,
      callBackData: null
    };
  },
  methods: {
    onAccept() {
      this.isShow = false;
      if (this.onAcceptCallback) {
        if (!this.callBackData) {
          this.onAcceptCallback();
        } else {
          this.onAcceptCallback(this.callBackData);
        }
      }
      this.showConfirmDialog(null);
    },
    onReject() {
      this.isShow = false;
      this.showConfirmDialog(null);
    }
  },
  created() {
    this.$store.watch(
      state => state.confirmDialog,
      value => {
        if (!value) {
          this.onReject();
        } else {
          if (this.isShow) {
            return;
          }
          this.message = value.message;
          if (!value.acceptLabel) {
            this.acceptLabel = this.$i18n.t("confirm-dialog.accept-button");
          } else {
            this.acceptLabel = value.acceptLabel;
          }
          if (!value.rejectLabel) {
            this.rejectLabel = this.$i18n.t("confirm-dialog.reject-button");
          } else {
            this.rejectLabel = value.rejectLabel;
          }
          this.onAcceptCallback = value.onAcceptCallback;
          this.callBackData = value.callBackData;
          this.isShow = true;
        }
      },
      { immediate: true }
    );
  }
};
</script>

<style scoped>
.confirm-body {
  display: flex;
  padding-right: 24px;
}

.confirm-icon-container {
  display: flex;
  flex-basis: 40px;
}

.confirm-icon {
  font-size: 35px;
  color: orange;
  margin: 0 10px;
}

.confirm-message-container {
  width: 58px;
  flex-grow: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>
