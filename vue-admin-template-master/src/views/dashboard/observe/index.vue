<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="12">
            <serach></serach>
        </el-col>
        <el-col :span="12">
            <chart></chart>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import serach from './serach'
import chart from './chart'
export default {
  data () {
    return {}
  },
  methods: {},
  components:{
    serach,chart
  }
}
</script>

<style type="text/css" scoped>
</style>
