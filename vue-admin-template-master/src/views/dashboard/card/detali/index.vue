<template>
  <div>
    <div class="head" >
      <slot name="one">
        <span>{{ title }}</span>
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
      </slot>
    </div>
    <div class="two">
      <slot name="two">{{ price }}</slot>
    </div>
    <div class="thress">
      <slot name="thress"></slot>
    </div>
    
    <div class="four">
      <slot name="four"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "price"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style type="text/css" scoped>
.head {
  height: 30px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.four{
    border-top: 1px solid #cdcdcd;
    height: 30px;
    padding: 0px;
    margin: 0px;
}
</style>
