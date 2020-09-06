<template>
  <div class="abc">
    <TimeLineChart />
  </div>
</template>
<script>
import TimeLineChart from "@/components/chart/TimeLineChart";
export default {
  name: "CoronaTimeLine",
  components: {
    TimeLineChart
  }
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
