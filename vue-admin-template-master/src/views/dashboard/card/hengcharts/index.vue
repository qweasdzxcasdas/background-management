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
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series:[
        {
            type:'bar',
            color:'blue',
            data:[74],
            barWidth:'10px',
            showBackground:true,
            backgroundStyle:{
                color:'#eee'
            },
            label:{
                show:true,
                formatter:'|',
                position:'right'
            }
            
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
