<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper texter">
          <div class="titles">
            <span>标题：</span>
            <input type="text" v-model="title" placeholder="请输入标题" />
          </div>
          <div>
            <span style="float: left;">正文：</span>

            <textarea v-model="desc" placeholder="请输入正文"></textarea>
          </div>
          <p>
            <span @click="submit">提交</span>
            <span @click="reset">重置</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title:'',
      desc:''
    };
  },
  methods:{
    reset() {
      this.title = "";
      this.desc="";
    },
    submit() {
      console.log(1);
    },
  }
};
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
.texter {
  margin: 50px 30px;
  color: #fff;
  font-size: 14px;
  .titles {
    margin-bottom: 20px;
    input {
      font-size: 14px;
      padding: 5px 10px;
      background: rgba(24, 136, 203, 0.6);
      border: 1px solid rgba(47, 228, 255, 1);
      margin-left: 25px;
    }
  }
  textarea {
    width: 510px;
    height: 300px;
    padding: 10px;
    margin-left: 31px;
    margin-bottom: 50px;
    background: rgba(24, 136, 203, 0.6);
      border: 1px solid rgba(47, 228, 255, 1);
    color: #fff;
    resize: none;
  }
  textarea::-webkit-input-placeholder{
    color: #fff;
  }
  p{
    padding: 0 50px;
    span{
      font-size: 14px;
      // padding: 8px 20px;
      // border:1px solid gainsboro;
      margin:0 50px;
      display: inline-block;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url('../../assets/images/bg_xuankuang.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    span:nth-of-type(1){
      // background: #4986FF;
color:whitesmoke;
    }
  }
}
</style>
