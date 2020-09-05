<template>
  <b-modal v-if="$store.getters.loadingReqNumber === 0" v-model="isShow">
    <template v-slot:modal-title> {{ $t("error-dialog.title") }}</template>
    <div class="error-body">
      <div class="error-icon-container">
        <b-icon-exclamation-triangle-fill
          class="error-icon"
        ></b-icon-exclamation-triangle-fill>
      </div>
      <div class="error-message-container">
        <div v-if="message">{{ message }}</div>
        <template v-else>
          <div>
            <div
              class="error-message"
              v-for="(mes, index) in messageList"
              :key="index"
            >
              {{ mes }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <template v-slot:modal-footer>
      <b-button class="close-btn" variant="primary" @click="closeErrorDialog">
        {{ closeLabel }}
      </b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: "ErrorDialog",
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
  methods: {
    closeErrorDialog() {
      this.isShow = false;
      if (this.onCloseCallback) {
        if (!this.callBackData) {
          this.onCloseCallback();
        } else {
          this.onCloseCallback(this.callBackData);
        }
      }
      this.hideErrorDialog();
    }
  },
  created() {
    this.$store.watch(
      state => state.errorDialog,
      value => {
        if (!value) {
          this.isShow = false;
          this.hideErrorDialog();
        } else {
          if (this.isShow) {
            return;
          }
          this.message = value.message;
          if (value.messageList) {
            this.messageList = value.messageList;
          }
          if (!value.closeLabel) {
            if (this.$i18n) {
              this.closeLabel = this.$i18n.t("error-dialog.close-button");
            }
          } else {
            this.closeLabel = value.closeLabel;
          }
          this.onCloseCallback = value.onCloseCallback;
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
.error-body {
  display: flex;
  padding-right: 24px;
}

.error-icon-container {
  display: flex;
  flex-basis: 40px;
}

.error-icon {
  font-size: 35px;
  color: red;
  margin: 0 10px;
}

.error-message-container {
  width: 58px;
  flex-grow: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.error-message:not(:last-child) {
  margin-bottom: 6px;
}
</style>
