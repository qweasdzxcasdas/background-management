<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <card></card>
      <contentcharts class="start"></contentcharts>
      <observe></observe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from './card'
import contentcharts from './contentcharts'
import observe from './observe'
export default {
  name: 'Dashboard',
  components:{
    card,contentcharts,observe
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.start{
  margin: 10px 0;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
