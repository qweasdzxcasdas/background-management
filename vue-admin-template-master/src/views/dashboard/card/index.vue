<template>
  <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card>
            <detali title="销售属性" price='￥12306'>
              <template slot="thress">
                <span >周同比55.55%<svg t="1664082211615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4187" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="4188"></path></svg>
                日同比22.22%<svg t="1664082249094" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5171" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="5172"></path></svg></span>
              </template>
              <template slot="four">
                <span>日销售额￥24234</span>
              </template>
            </detali>
          </el-card>
           
        </el-col>
        <el-col :span="6">
          <el-card>
            <detali title="访问量"  price='743928'>
              <template slot="thress">
                <charts></charts>
              </template>
              <template slot="four">
                <span>日销售额￥24234</span>
              </template>
            </detali>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <detali title="支付笔数"  price='2139120'>
              <template slot="thress">
                <varcharts></varcharts>
              </template>
              <template slot="four">
                <span>日销售额￥24234</span>
              </template>
            </detali>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <detali title="运营活动效果"  price='55%'>
              <template slot="thress">
                <hengcharts></hengcharts>
              </template>
              <template slot="four">
                <span>日销售额￥24234</span>
              </template>
            </detali>
          </el-card>
        </el-col>
      </el-row>
    
  </div>
</template>

<script>
import detali from "./detali";
import charts from './charts'
import varcharts from './varcharts'
import hengcharts from './hengcharts'
export default {
  data() {
    return {};
  },
  components: {
    detali,charts,varcharts,hengcharts
  },
  methods: {},
};
</script>

<style type="text/css" scoped>
span{
  font-size: 16px;
}
</style>
