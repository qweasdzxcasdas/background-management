<template>
  <div style="width: 100%; height: 52%" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let charts = echarts.init(this.$refs.charts);
    charts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series:[
        {
            type:'bar',
            data:[74,35,42,65,23,46,6,24,]
        }
      ],
      grid:{
        top:0,
          left:0,
          right:0,
          bottom:0,
      }
    });
  },
};
</script>

<style type="text/css" scoped>
</style>
