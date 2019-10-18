<template>
  <div  :class="className" :style="{height:height,width:width}">
    <img  class="banner" src="../../assets/logo/banner.png" alt="">
  </div>
</template>
<script>
export default {
props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.banner{
  width: 100%;
  height: 100%;
}

</style>
