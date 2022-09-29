<template>
  <div>
    <el-card>
      <div class="head">
        <span>线上热门搜索</span>
        <el-dropdown>
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <obsdata></obsdata>
    </el-card>
  </div>
</template>

<script>
import obsdata from './obsdata'
export default {
  data() {
    return {};
  },
  methods: {},
  components:{
    obsdata
  }
};
</script>

<style type="text/css" scoped>
.head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
</style>
