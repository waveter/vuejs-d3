<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <div class="info">{{ $t("layout.footer") }}</div>
  </b-navbar>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style scoped>
.info {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
}
</style>
