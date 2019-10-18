<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width:100%;
  height:100%;
  z-index:999999;
  /* background:url('./assets/images/bg_bg.png') no-repeat; */
  background-size:100% 100%;
  background-position: 0% 0%;
  background-attachment: fixed;
}
.el-range-editor--mini.el-input__inner{
  width: 200px!important;
}
.el-range-editor--mini.el-input__inner .el-range-input{
  width: 70px!important;
}
.el-range-editor--mini.el-input__inner .el-range-separator{
  width: 20px!important;
}

</style>
