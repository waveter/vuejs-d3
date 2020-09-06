<template>
  <div class="line-chart-container">
    <div class="button-container">
      <ToggleButton
        v-model="isLinear"
        :mapOptions="{ on: 'Linear', off: 'Logarithmic' }"
      />
    </div>

    <svg
      class="line-chart"
      :viewBox="
        `0 0 ${chartWidth + marginLeft + marginRight} ${chartHeight +
          marginTop +
          marginBottom}`
      "
      preserveAspectRatio="xMidYMid meet"
      ref="chartContainer"
    >
      <text class="chart-title" x="50%" :y="marginTop / 2" text-anchor="middle">
        Cumulative COVID-19 cases in US
      </text>
      <g class="lineChart" :transform="`translate(${marginLeft},${marginTop})`">
        <g
          class="legend"
          v-for="(key, index) in Object.keys(colorMap)"
          :key="'key-color-' + index"
        >
          <rect
            width="20"
            height="10"
            :fill="colorMap[key]"
            x="10"
            :y="index * 30 + 10"
          ></rect>
          <text x="40" :y="index * 30 + 20">{{ upperCaseFirst(key) }}</text>
        </g>
        <g
          class="x-axis"
          v-axis="getScaleXAxis()"
          :transform="`translate(0,${chartHeight})`"
        ></g>
        <g v-axis="getScaleYAxis()"></g>
        <g class="grid" v-axis="getGridXAxis()"></g>
        <g class="grid" v-axis="getGridYAxis()"></g>
        <svg>
          <path
            v-for="(line, index) in listLine"
            :key="'line' + index"
            class="line"
            :d="line.path"
            :stroke="line.color"
          />

          <circle
            v-for="(point, index) in listPoint"
            :key="'point' + index"
            :id="'point-' + index"
            :r="2"
            :cx="point.x"
            :cy="point.y"
            :fill="point.color"
          />
        </svg>
        <b-tooltip
          custom-class="line-chart-tooltip"
          v-for="(point, index) in listPoint"
          :target="'point-' + index"
          :key="'tooltip-' + index"
          triggers="hover"
        >
          <div class="tooltip-content" :style="{ color: point.color }">
            {{ point.tooltip }}
          </div>
        </b-tooltip>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import numeral from "numeral";
import { getCountryTimeline } from "@/services/corona-api";
import ToggleButton from "@/components/common/ToggleButton";
export default {
  name: "TimeLineChart",
  components: { ToggleButton },
  data: function() {
    return {
      chartMode: true,
      chartWidth: 800,
      chartHeight: 300,
      marginLeft: 50,
      marginRight: 50,
      marginTop: 50,
      marginBottom: 50,
      timelineData: [],
      listLine: [],
      listPoint: [],
      colorMap: {
        confirmed: "blue",
        active: "orange",
        deaths: "red",
        recovered: "green"
      },
      isLinear: true
    };
  },
  created() {
    window.addEventListener("resize", this.handleResizeScreen);
    getCountryTimeline("US").then(res => {
      this.timelineData = res.data.data.timeline;
      this.drawChart();
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResizeScreen);
  },
  watch: {
    isLinear: {
      handler() {
        this.drawChart();
      }
    }
  },
  methods: {
    handleResizeScreen() {
      this.drawChart();
    },
    drawChart() {
      this.showLoading();

      this.chartWidth =
        this.$refs.chartContainer.getBoundingClientRect().width -
        this.marginLeft -
        this.marginRight;
      this.chartHeight =
        this.$refs.chartContainer.getBoundingClientRect().height -
        this.marginTop -
        this.marginBottom;
      this.listLine = [];
      this.listPoint = [];
      setTimeout(() => {
        for (const key of Object.keys(this.colorMap)) {
          this.listLine.push({
            path: this.getLine(key),
            color: this.colorMap[key]
          });
          this.getPoint(key);
        }
        this.hideLoading();
      });
    },
    getPoint(key) {
      for (const record of this.timelineData) {
        if (record[key] === 0) {
          continue;
        }
        this.listPoint.push({
          x: this.getScaleX()(d3.timeParse("%Y-%m-%d")(record.date)),
          y: this.getScaleY()(record[key]),
          color: this.colorMap[key],
          tooltip: `Date: ${record.date}\n${this.upperCaseFirst(
            key
          )}: ${numeral(record[key]).format("0,0")}`
        });
      }
    },
    getLine(key) {
      let timelineData = this.timelineData;
      if (!this.isLinear) {
        timelineData = this.timelineData.filter(d => d[key] !== 0);
      }
      return d3
        .line()
        .x(record => {
          return this.getScaleX()(d3.timeParse("%Y-%m-%d")(record.date));
        })
        .y(d => {
          return this.getScaleY()(d[key]);
        })(timelineData);
    },
    getMaxValue() {
      if (this.timelineData.length === 0) {
        return 1;
      }
      return d3.max(this.timelineData, record => record.confirmed);
    },
    getDateRange() {
      const parseDate = d3.timeParse("%Y-%m-%d");
      return d3.extent(this.timelineData, record => parseDate(record.date));
    },
    getScaleX() {
      return d3
        .scaleTime()
        .domain(this.getDateRange())
        .rangeRound([0, this.chartWidth]);
    },
    getScaleY() {
      if (this.isLinear) {
        return d3
          .scaleLinear()
          .domain([0, this.getMaxValue()])
          .range([this.chartHeight, 0]);
      } else {
        return d3
          .scaleLog()
          .domain([1, this.getMaxValue()])
          .range([this.chartHeight, 0]);
      }
    },
    getScaleXAxis() {
      const scaleXAxis = d3
        .axisBottom()
        .scale(this.getScaleX())
        .tickFormat(d3.timeFormat("%Y/%m"));
      return scaleXAxis;
    },
    getScaleYAxis() {
      const scaleYAxis = d3
        .axisLeft()
        .scale(this.getScaleY())
        .tickFormat(value => d3.format("~s")(value));
      if (!this.isLinear) {
        scaleYAxis.ticks(6);
      }
      return scaleYAxis;
    },
    getGridXAxis() {
      return this.getScaleXAxis()
        .tickSize(this.chartHeight)
        .tickFormat("");
    },
    getGridYAxis() {
      return this.getScaleYAxis()
        .tickSize(-this.chartWidth)
        .tickFormat("");
    }
  },
  directives: {
    axis(el, binding) {
      d3.select(el).call(binding.value);
    }
  }
};
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 500px;
}

.line-chart-container {
  margin: 10px;
}

.line {
  fill: none;
}

.tooltip-content {
  white-space: pre-wrap;
}

.chart-title {
  font-size: 20px;
  font-weight: bold;
}

.button-container {
  margin-left: 30px;
}
</style>
