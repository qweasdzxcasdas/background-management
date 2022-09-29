<template>
  <el-card class="start">
    <div class="chart">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <el-tabs v-model="active">
        <el-tab-pane label="销售额" name="first"> </el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="b">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>

        <el-date-picker
        v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          class="date"
          value-format='yyyy-MM-dd'
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div style="width: 100%; height: 400px" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <span>门店{{ title }}</span>
          <ul>
            <li>
              <span class="list">1</span><span>肯德基</span><span>423,123</span>
            </li>
            <li>
              <span class="list">2</span><span>肯德基</span><span>423,123</span>
            </li>
            <li>
              <span class="list">3</span><span>肯德基</span><span>423,123</span>
            </li>
            <li><span>4</span><span>肯德基</span><span>423,123</span></li>
            <li><span>5</span><span>肯德基</span><span>423,123</span></li>
            <li><span>6</span><span>肯德基</span><span>423,123</span></li>
            <li><span>7</span><span>肯德基</span><span>423,123</span></li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      active: "first",
       chart:null,
       date:[]
    };
  },
  methods: {
    setDay(){
      const stare=dayjs().format('YYYY-MM-DD')
      this.date=[stare,stare]
    },
    setWeek(){
      const start=dayjs().day(1).format('YYYY-MM-DD')
      const end=dayjs().day(6).format('YYYY-MM-DD')
      this.date=[start,end]
    },
    setMonth(){
      const start=dayjs().startOf('month').format('YYYY-MM-DD')
      const end=dayjs().endOf('month').format('YYYY-MM-DD')
      this.date=[start,end]
    },
    setYear(){
      const start=dayjs().startOf('year').format('YYYY-MM-DD')
      const end=dayjs().endOf('year').format('YYYY-MM-DD')
      this.date=[start,end]
    }
  },

  computed: {
    title() {
      return this.active == "first" ? "销售额" : "访问量";
    },
  },
  mounted() {
    this.$store.dispatch('getData')
    this.chart = echarts.init(this.$refs.charts);
    this.chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
      title: {
        text: "销售额趋势",
      },
    });
  },
  watch: {
    title() {
      this.chart.setOption({
        title: {
          text: this.title+'趋势',
        },
      });
    },
  },
};
</script>

<style type="text/css" scoped>
.chart {
  display: flex;
  justify-content: space-between;
  position: relative;
  
}
span {
  font-size: 16px;
  padding: 0 10px;
}
.date {
  width: 300px;
}
.b {
  position: absolute;
  padding-bottom: 5px;
  right: 0;
}
ul {
  position: absolute;
  top: 0;
  padding: 0;
}
ul li {
  list-style: none;
  padding: 0;
}
.list {
  width: 30px;
  height: 25px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  padding-right: -20px;
}
ul li span:last-child {
  padding-left: 50px;
}
</style>
