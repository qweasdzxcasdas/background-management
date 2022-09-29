<template>
  <div style="width: 100%; height: 52%" ref="a"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  methods: {},
  mounted() {
    let linecharts= echarts.init(this.$refs.a)
    linecharts.setOption({
      xAxis:{
        show:false,
        type:'category'
      },
      yAxis:{
        show:false
      },
      series:[
        {
          smooth:true,
          type:'line',
          data:[22,55,11,44,99,66],
          itemStyle:{
            opacity:0
          },
          lineStyle:{
           color:'purple'
            },
            areaStyle:{
             color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
          },
          
        ],
       grid:{
          top:0,
          left:0,
          right:0,
          bottom:0,
        },
    })
  }
}
</script>

<style type="text/css" scoped>
</style>
