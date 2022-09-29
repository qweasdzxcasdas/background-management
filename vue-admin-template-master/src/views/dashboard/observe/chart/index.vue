<template>
  <div>
    <el-card>
      <div class="right">
        <span>销售额占比</span>
        <el-radio-group>
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <div style="width: 100%; height: 300px" ref="b"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let charts = echarts.init(this.$refs.b);
    charts.setOption(
       {
        title:{
          text:'视频',
          subtext:'2342',
          left:'center',
          top:'center'
        },
        tooltip: {
          trigger: "item",
        },
        
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outsize",
            },
            
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      })
    
  },
};
</script>

<style type="text/css" scoped>
.right {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
</style>
