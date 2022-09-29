<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="prtrue">
          <span>搜索用户数</span>
          <svg
          t="1664078672831"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3027"
          width="32"
          height="32"
        >
          <path
            d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
            p-id="3028"
            fill="#bfbfbf"
          ></path>
        </svg>
        </div>
        <div>
          <b>3241</b>
          <span >33.3<svg t="1664082211615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4187" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="4188"></path></svg>
                日同比22.22%<svg t="1664082249094" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5171" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="5172"></path></svg></span>
              </span>
        </div>
        <div style="width:100%;height:100px" ref="a">

        </div>
      </el-col>
      <el-col :span="12">
        <div class="prtrue">
          <span>搜索用户数</span>
          <svg
          t="1664078672831"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3027"
          width="32"
          height="32"
        >
          <path
            d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
            p-id="3028"
            fill="#bfbfbf"
          ></path>
        </svg>
        </div>
        <div>
          <b>3241</b>
          <span >33.3<svg t="1664082211615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4187" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="4188"></path></svg>
                日同比22.22%<svg t="1664082249094" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5171" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="5172"></path></svg></span>
              </span>
        </div>
        <div style="width:100%;height:100px" ref="a">

        </div>
      </el-col>
    </el-row>
    <el-table
    :data="tableData"
    style="width: 100%"
    border
    >
    <el-table-column
      type='index'
      label="排名"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="周涨幅"
      sortable
      >
    </el-table-column>
      </el-table>
    
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [{}],
    };
  },
  methods: {},
  mounted() {
    let linecharts = echarts.init(this.$refs.a);
    linecharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          smooth: true,
          type: "line",
          data: [22, 55, 11, 44, 99, 66],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style type="text/css" scoped>
.prtrue {
  display: flex;
  align-items: center;
}
span{
  font-size: 16px;
}
</style>
