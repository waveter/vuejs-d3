<template>
  <div class="toggle-container" @click="handleToggle()">
    <div v-if="isOn" class="toggle-on-text">{{ mapOptions.on }}</div>
    <div v-if="isOn" class="toggle-button toggle-button-on"></div>
    <div v-if="!isOn" class="toggle-button toggle-button-off"></div>
    <div v-if="!isOn" class="toggle-on-text toggle-text-right">
      {{ mapOptions.off }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ToggleButton",
  props: {
    value: Boolean,
    mapOptions: Object
  },
  data() {
    return {
      isOn: this.value
    };
  },
  methods: {
    handleToggle() {
      this.isOn = !this.isOn;
      this.$emit("input", this.isOn);
    }
  }
};
</script>
<style scoped>
.toggle-container {
  display: flex;
  background-color: rgb(0, 119, 255);
  width: 120px;
  border-radius: 12px;
  align-items: center;
  color: white;
  cursor: pointer;
}

.toggle-on-text {
  flex-grow: 1;
  text-align: center;
}

.toggle-button {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  margin: 4px;
}

.toggle-button-on {
  background-color: white;
}

.toggle-button-off {
  background-color: white;
}

.toggle-text-right {
  padding-right: 9px;
}
</style>
