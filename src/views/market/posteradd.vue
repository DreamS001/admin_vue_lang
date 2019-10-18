<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper texter">
          <div>
            <span style="float: left;">轮播海报：</span>

            <!-- <el-upload
              class="avatar-uploader"
               action="http://shipz.jie360.com.cn/api/product/upload/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-upload avatar-uploader-icon"> <em>点击上传</em></i>
            </el-upload> -->
            <el-upload class="avatar-uploader" action="http://shipz.jie360.com.cn/api/product/upload/" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <el-upload
              class="avatar-uploader"
              action
              :http-request="getAuthorization"
              list-type="picture-card"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png, .gif"
              :on-success="uploadUrl"
            >
              <img v-if="dataForm.url" :src="dataForm.url" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
          </div>
          <p style="padding-left:70px;font-size:15px">轮播设计图比例3:2</p>
          <section>
            排序：
            <input
              v-model="sorts"
              oninput="value=value.replace(/[^\d]/g,'')"
              type="text"
              placeholder="排序:数字"
            />
          </section>
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
import { img } from "@/api/marketing";
import { getToken } from '@/utils/auth.js'
export default {
  data() {
    return {
      sorts: "",
      imageUrl: "",
      urll:
      //  "https://jsonplaceholder.typicode.com/posts/",
      "http://shipz.jie360.com.cn/api/product/upload",
      dialogImageUrl: "",
      dialogVisible: false,
      dataForm: {
        id: undefined,
        name: undefined,
        content: undefined,
        url: undefined,
        link: undefined,
        position: 1,
        enabled: 1,
        imageUrlOk: false,
      },
      headers: {
          Authorization: 'Bearer ' + getToken()
        },
    };
  },
  methods: {
    // 上传图片
    getAuthorization(content) {
      this.img(content.file.type,  content.file);
    },
    async img(data, file) {
      try {
        let res = await img(data, file);
        this.dataForm.url = res.data.url;
        this.$message({
          type: "success",
          message: "上传成功"
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error.msg
        });
      }
    },
    uploadUrl: function(response) {
      this.dataForm.url = response.data.url;
    },
//



    reset() {
      this.sorts = "";
      this.imageUrl="";
    },
    submit() {
      console.log(1);
    },
  handleAvatarSuccess(res, file) {
        console.log(res)

        this.imageUrl = URL.createObjectURL(file.raw)

        if (res.msg == '图片上传重复限制') {
          return this.$message.error(res.msg)
        } else if (res.msg == '图片上传成功!') {
          this.$message.success(res.msg)
          this.imageUrlOk = true
          // this.form.picUrl = res.url
          console.log(res.url)
        } else {
          return this.$message.error('图片上传失败')
        }
      },
    // handleAvatarSuccess(res, file) {
    //   console.log(res)
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   console.log("成功");
    //   if (res.msg == '图片上传重复限制') {
    //       return this.$message.error(res.msg)
    //     } else if (res.msg == '图片上传成功!') {
    //       this.$message.success(res.msg)
    //       this.imageUrlOk = true
    //       this.imageUrl = res.url
    //       console.log(res.url)
    //     } else {
    //       return this.$message.error('图片上传失败')
    //     }
    // },
    handleAvatarError(res, file) {
      console.log("失败");
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    //     img().then(res => {
    // console.log(res)
    //     })
  }
};
</script>
<style  rel="stylesheet/scss"  lang="scss">
.el-upload-list--picture-card .el-upload-list__item {
  width: 300px;
  height: 200px;
}
</style>
<style rel="stylesheet/scss"  lang="scss" scoped>
.texter {
  margin: 50px 30px;
  color: #fff;
  font-size: 14px;
  section {
    margin-bottom: 80px;
    input {
      width: 510px;
      height: 37px;
      font-size: 14px;
      padding: 5px 10px;
      margin-left: 20px;
    }
  }

  .image {
    width: 320px;
    height: 210px;
    margin-left: 100px;
    margin-bottom: 20px;
    border: 1px solid gainsboro;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 77px;
      height: 60px;
    }
  }
  p {
    padding: 0 50px;
    span {
      display: inline-block;
      font-size: 14px;
      // padding: 8px 20px;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      // border: 1px solid gainsboro;
      margin: 0 50px;
      cursor: pointer;
      background: url('../../assets/images/bg_xuankuang.png') no-repeat;
      background-size: 100% 100%;
    }
    span:nth-of-type(1) {
      // background: #4986ff;
      color: whitesmoke;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 320px;
  height: 210px;
  line-height: 210px;
  text-align: center;
  border: 1px solid gainsboro;
  em {
    font-size: 14px;
  }
}
.avatar {
  width: 320px;
  height: 210px;
  display: block;
}
</style>

<style>
 input{
   background: rgba(24, 136, 203, 0.6);
   border: 1px solid rgba(47, 228, 255, 1);
   color: #fff;
 }
  input::-webkit-input-placeholder{
    color: #fff;
  }
</style>
