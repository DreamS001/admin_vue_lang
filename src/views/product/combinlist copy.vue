<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="width:100%!important">
        <span class="demonstration" style="margin-left:30px;">自定义查询：</span>
        <el-date-picker v-model="value6" type="daterange" size="mini" range-separator="至" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" @change="timeChange"></el-date-picker>
        <span class="time" style="margin-left:4%" @click="queryData">查询</span>
        <span class="time" @click="exportTable">导出</span>
        <span
          class="time"
          style="float:right;margin-right:3%;width:88px!important"
          @click="appear"
        >新增产品</span>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table :data="list" style="width: 100%!important"  :row-class-name="setClassName" :header-cell-class-name="handlemyclass">
        <el-table-column :cell-class-name="colorblueclass" prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
        <el-table-column prop="price" label="产品价格（$）" align="center"></el-table-column>
        <el-table-column prop="period" label="周期（天）" align="center"></el-table-column>
        <el-table-column prop="profit_rate" label="回报率(%)" align="center">
          <template slot-scope="scope">{{scope.row.profit_rate|formatrRate}}</template>
        </el-table-column>
        <el-table-column prop="profit_distribute" label="收益分配" align="center"></el-table-column>
        <el-table-column prop="is_delete" label="当前状态" align="center" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_delete===0" type="success" style="border: 1px solid rgba(19, 206, 102, 1);">已启用</el-tag>
            <el-tag type="danger" size="small" v-else style="border: 1px solid rgba(255, 73, 73, 1);">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380" align="center">
          <template slot-scope="scope">
            <span class="s-btn" @click="handleEdit(scope.$index, scope.row)">编辑</span>
            <span  class="s-btn" @click="handleDelete(scope.index, scope.row)">删除</span>
          </template>
        </el-table-column>
        <!-- <template slot-scope="scope">

        </template>-->
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10, 20, 30,40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- 浮层 -->
    <div id="maskBox">
      <div v-if="FC" class="fuCeng">
        <div>
          <h4>
            <div><span>{{h1text}}产品</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
            <img @click="increase" src="../../assets/logo/cuo.png" alt />
          </h4>
          <div>
            <p>
              <span style="color:red">*</span>
              <span class="title">产品名称：</span>
              <el-input class="inputa" v-model="form1.name1" placeholder="请不要重复使用名称"></el-input>
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">产品价格：</span>
              <el-input
                class="inputa" oninput="value=value.replace(/[^\d]/g,'')" @input="onInput1" v-model="form1.price1" placeholder="请输入数字"></el-input>
              $
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">产品周期：</span>
              <!-- value=value.replace(/[^\d]/g,'') -->
              <el-input class="inputb" v-model="form1.period1" placeholder="请输入数字" @input="onInput2"  oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              天
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">回报率：</span>
              <el-input oninput="value=value.replace(/[^0\.][0-9]{3}$/g,'')" @input="onInput3" class="inputb" v-model="form1.profitRate1" placeholder="保留小数后三位"></el-input>
              (1=100%)
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">设备数量：</span>
              <el-input class="inputb" oninput="value=value.replace(/[^\d]/g,'')" @input="onInput4" v-model="form1.num1" placeholder="请输入数字"></el-input>
              台
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">收益分配：</span>
              <el-input class="inputa" v-model="form1.profitDistribute1" placeholder="请输入收益分配"></el-input>
            </p>
            <p>
              <span style="color:red">*</span>
              <span class="title">次序:</span>
              <el-input class="inputa" v-model="form1.sort1" placeholder="请输入次序" @input="onInput5" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </p>
            <p>
              <span style="color:red;float: left">*</span>
              <span class="title" style=" float: left">上传封面：</span>

              <el-upload class="avatar-uploader" action="http://shipz.jie360.com.cn/api/product/upload/" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p class="status">
              <span class="time" @click="confirm" style="cursor: pointer">确定</span>
              <span class="time" @click="increase" style="cursor: pointer">取消</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { all, add, deleter, update, list } from '@/api/produc'
  import { formatDate } from '../../utils/date.js'
  import moment from 'moment'
  import { getToken } from '@/utils/auth.js'
  import { signFigures } from '../../utils/floatToInt.js'

  export default {
    data() {
      return {
        imageUrl: '',
        value6: '',
        input1: '',
        popup: '',
        total: 1,
        h1text: '',
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        search: '',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },

        form: {
          isDelete: 0,
          name: '',
          price: '',
          period: '',
          profitRate: '',
          // enabled: "1",
          exInfo: '',
          profit_distribute: '',
          num: '',
          sort: '',
          profit_rate: '',
          picUrl: ''
        },
        form1: {
          isDelete1: 0,
          name1: '',
          price1: '',
          period1: '',
          profitRate1: '',
          // enabled: "1",
          exInfo1: '',
          profit_distribute1: '',
          num1: '',
          sort1: '',
          profit_rate1: '',
          picUrl1: ''
        },
        FC: false,
        list: [],
        beginDatePlaceHolder: '',
        endDatePlaceHolder: '',
        beginDate: '',
        endDate: '',
        allList: [],
        maxPageSize: 2147483647,
        clickQueryDate: false,
        selectTime: false,
        imageUrlOk: false,
        resDate: {},
        imageFile: false
      }
    },
    // 时间搓
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatrRate(rate) {
        return signFigures(rate)
      }
    },
    created() {
      var date = new Date()
      this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.beginDate = ''
      this.endDate = ''
      this.request()
    },
    methods: {
      onInput1(){
        // console.log('1111')
        if (this.form1.price1 <=0) {
          this.$message.warning('产品价格必须大于零')
          // return
        }
      },
      onInput2(){
        // console.log('1111')
        if (this.form1.period1 <=0) {
          this.$message.warning('产品周期必须大于零')
          // return
        }
      },
      onInput3(){
        // console.log('1111')
        if (this.form1.profitRate1 <=0) {
          console.log(this.form1.profitRate1)
          this.$message.warning('回报率必须大于零')
          // return
        }
      },
      onInput4(){
        // console.log('1111')
        if (this.form1.num1 <=0) {
          console.log(this.form1.num1)
          this.$message.warning('设备数量必须大于零')
          // return
        }
      },
      onInput5(){
        // console.log('1111')
        if (this.form1.sort1 <=0) {
          this.$message.warning('次序必须大于零的自然数')
          // return
        }
      },
      // table样式
      handlemyclass: function(row, column, rowIndex, columnIndex) {
        return 'test'
      },
      colorblueclass: function(row, column, rowIndex, columnIndex) {
        if (columnIndex == 2) {
          return 'blue'
        }
      },
      setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },
      // 分页器
      handleSizeChange(val) {
        this.pageSize = val
        this.request()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.request()
      },
      timeChange() {
        if (this.value6 == undefined) {
          this.beginDate = ''
          this.endDate = ''
        } else {
          this.beginDate = moment(this.value6[0]).format('YYYY-MM-DD')
          this.endDate = moment(this.value6[1]).format('YYYY-MM-DD')
        }
      },
      request() {
        list(this.pageNo, this.pageSize, this.beginDate, this.endDate).then(res => {
            this.total = res.total
            this.list = eval(res.list)
            for (var i = 0; i < this.list.length; i++) {
              var percentage = parseFloat(this.list[i].profit_rate)
              var str = Number(percentage * 100)
              this.list[i].profit_rate = str
            }
          }
        )
      },
      // 查询
      queryData() {
        this.pageNo = 1
        this.request()
      },
      //删除
      handleDelete($index, row) {
        this.$confirm('此操作将永久删除该条模板, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          deleter(row.id).then(res => {
            this.request()
            this.$message({ type: 'success', message: '删除成功!' })
          })
        })
      },
      // 编辑
      handleEdit(index, row) {
        this.h1text = '编辑'
        this.popup = 1
        this.FC = true
        console.log(Number(this.list[index].profit_rate / 100))
        var profit_rate = Number(this.list[index].profit_rate / 100)
        this.form = this.list[index]
        this.form1.name1 = this.list[index].name
        this.form1.profitRate1 = profit_rate
        this.form1.price1 = this.list[index].price
        this.form1.period1 = this.list[index].period
        this.form1.num1 = this.list[index].num
        this.form1.sort1 = this.list[index].sort
        this.form1.profitDistribute1 = this.list[index].profit_distribute
        this.imageUrl = this.list[index].pic_url
        this.form1.picUrl1 = this.list[index].pic_url
        if (this.list[index].pic_url) {
          this.imageFile = true
        }
        // this.form = this.list[index]
        // this.form.profitRate = profit_rate
        // this.form.profitDistribute = this.list[index].profit_distribute
        // this.imageUrl = this.list[index].pic_url
        // this.form.picUrl = this.list[index].pic_url
        // if (this.list[index].pic_url) {
        //   this.imageFile = true
        // }
        this.resDate = JSON.parse(JSON.stringify(this.list))
      },
      appear() {
        this.popup = 2
        this.h1text = '新增'
        this.FC = true
        this.form.name = ''
        this.form.price = ''
        this.form.period = ''
        this.form.profitRate = ''
        this.form.exInfo = ''
        this.form.profitDistribute = ''
        this.form.num = ''
        this.form.sort = ''
        this.form.profit_rate = ''
        this.form.picUrl = ''
      },
      // 弹框展现与隐藏
      increase() {
        if (this.FC == false) {
          this.FC = true
        } else {
          this.FC = false
          this.imageUrl = ''
          this.imageUrlOk = false
          this.request()
        }
      },
      // 添加数据
      confirm() {
        // 判断浮层数据是否为空
        switch (this.popup) {
          case 1:
            if (this.form1.name1 == '') {
              this.$message.warning('请输入产品名称')
              return
            } else if (this.form1.price1 == '') {
              this.$message.warning('请输入产品价格')
              return
            } else if (this.form1.price1 <=0) {
              this.$message.warning('产品价格必须大于零')
              return
            } else if (this.form1.period1 == '') {
              this.$message.warning('请输入产品周期')
              return
            } else if (this.form1.period1 <=0) {
              this.$message.warning('产品周期必须大于零')
              return
            }else if (this.form1.profitRate1 == '') {
              this.$message.warning('请输入回报率')
              console.log(this.form1.profitRate1)
              return
            } else if (this.form1.profitRate1 <=0) {
              console.log(this.form1.profitRate1)
              this.$message.warning('回报率必须大于零')
              return
            }else if (this.form1.num1 == '') {
              this.$message.warning('请输入设备数量')
              return
            }else if (this.form1.num1 <=0) {
              console.log(this.form1.num1)
              this.$message.warning('设备数量必须大于零')
              return
            } else if (this.form1.profitDistribute1 == '') {
              this.$message.warning('请输入收益分配')
              return
            } else if (this.form1.sort1 == '') {
              this.$message.warning('请输入次序')
              return
            }else if (this.form1.sort1 <=0) {
              this.$message.warning('次序必须大于零的自然数')
              return
            }  else if (this.imageFile == false && this.imageUrlOk == false) {
              this.$message.warning('请上传图片')
              return
            } else {
              this.form={
                isDelete: 0,
                name: this.form1.name1,
                price: this.form1.price1,
                period: this.form1.period1,
                profitRate: this.form1.profitRate1,
                // enabled: "1",
                exInfo: this.form1.exInfo1,
                profit_distribute: this.form1.profitDistribute1,
                num: this.form1.num1,
                sort: this.form1.sort1,
                profit_rate: this.form1.profit_rate1,
                picUrl: this.imageUrl
              }
              console.log(this.form1.name1)
              console.log(this.form)
              update(this.form).then(res => {
                console.log(res)
                this.$message.warning(res)
                this.FC = false
              this.form1 = ''
              this.pageNo = 1
                  this.request()
              })

              setTimeout(function() {
                // location.reload()

              }, 300)
            }
            break
          case 2:
            if (this.form1.name1 == '') {
              this.$message.warning('请输入产品名称')
              return
            } else if (this.form1.price1 == '') {
              this.$message.warning('请输入产品价格')
              return
            } else if (this.form1.price1 <=0) {
              this.$message.warning('产品价格必须大于零')
              return
            }  else if (this.form1.period1 == '') {
              this.$message.warning('请输入产品周期')
              return
            } else if (this.form1.period1 <=0) {
              this.$message.warning('产品周期必须大于零')
              return
            }else if (this.form1.profitRate1 == '') {
              console.log(this.form1.profitRate1)
              this.$message.warning('请输入回报率')
              return
            }else if (this.form1.profitRate1 <=0) {
              console.log(this.form1.profitRate1)
              this.$message.warning('回报率必须大于零')
              return
            } else if (this.form1.num1 == '') {
              this.$message.warning('请输入设备数量')
              return
            } else if (this.form1.num1 <=0) {
              console.log(this.form1.num1)
              this.$message.warning('设备数量必须大于零')
              return
            }else if (this.form1.profitDistribute1 == '') {
              this.$message.warning('请输入收益分配')
              return
            } else if (this.form1.sort1 == '') {
              this.$message.warning('请输入次序')
              return
            }else if (this.form1.sort1 <=0) {
              this.$message.warning('次序必须大于零的自然数')
              return
            } else if (this.imageFile == false && this.imageUrlOk == false) {
              this.$message.warning('请上传图片')
              return
            } else {
              console.log(this.form)
              add(this.form1).then(res => {
                console.log(res)
                // (this.FC = false)
                this.FC = false
                this.form1 = ''
                this.pageNo = 1
                  this.request()
                // this.$message.error('添加产品失败')
                setTimeout(function() {
                  // location.reload()

                }, 300)
              })

            }
        }
        // debugger;
      },
      //上传照片
      handleAvatarSuccess(res, file) {
        console.log(res)

        this.imageUrl = URL.createObjectURL(file.raw)

        if (res.msg == '图片上传重复限制') {
          return this.$message.error(res.msg)
        } else if (res.msg == '图片上传成功!') {
          this.$message.success(res.msg)
          this.imageUrlOk = true
          // this.form.picUrl = res.url
          this.imageUrl = res.url
          console.log(res.url)
        } else {
          return this.$message.error('图片上传失败')
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      exportTable() {
        list(this.pageNo, this.maxPageSize, this.beginDate, this.endDate).then(res => {
          this.allList = eval(res.list)
          for (var i = 0; i < this.allList.length; i++) {
            var percentage = this.allList[i].profit_rate
            var str = Number(percentage * 100)
            this.allList[i].profit_rate = str
          }

          let data = JSON.parse(JSON.stringify(this.allList))
          data.forEach((v, i) => {
            data[i].is_delete = data[i].is_delete === 1 ? '未启用' : '已启用'
            data[i].create_time = moment(data[i].create_time).format('YYYY-MM-DD')
          })

          require.ensure([], () => {
            const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
            const tHeader = ['创建时间', '产品名称', '价格（$)', '周期（天）', '回报率(%)', '收益分配', '当前状态'] //将对应的属性名转换成中文
            const filterVal = ['create_time', 'name', 'price', 'period', 'profit_rate', 'profit_distribute', 'is_delete'] //table表格中对应的属性名
            data = this.formatJson(filterVal, data)
            export_json_to_excel(tHeader, data, '组合产品列表excel')
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .test {
    color: #fff !important;
    background: #4986ff !important;
    font-weight: 100;
    width: 100% !important;
  }

  .el-input__inner {
    height: 30px !important;
  }
  .el-tag{
    background-color: transparent;
    display: inline-block;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    // color: #1890ff;
    border-radius: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff !important;
    white-space: nowrap;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404-container {
    background: transparent;
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .nav {
    width: 100%;
    height: 70px;
    background: url('../../assets/images/bg_caozuo.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #fff;
    .el-range-editor--mini.el-input__inner{
      border: 2px solid rgba(47, 228, 255, 1) !important;
      background: rgba(24, 136, 203, 1) !important;
    }
  }

  .block {
    font-size: 13px;
    // margin-left: 30px;
  }

  .time {
      display: inline-block;
    width: 110px;
    height: 30px;
    // background: #4986ff;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    font-size: 14px;
    // padding: 8px 20px;
    color: rgba(43, 250, 255, 1);
    margin: 0 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

  .blue {
    color: #2cc23c !important;
  }
  #maskBox{
    height: 100%;
    .fuCeng {
      position: fixed;
      left: 188px;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(13, 29, 76, 0.8);

      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        width: 772px;
        height: 700px;
        // background: white;
        background: url('../../assets/images/bg_xzcp.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
        h4 {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          margin: 0;
          color: white;
          font-weight: 100;
          >div{
            >img{
              width: 42px;
              height: 11px;
              margin-left: 10px;
            }
          }
          >img {
            width: 80px;
            height: 30px;
          }
        }
        div {
          >p {
            font-size: 15px;
            // text-align: center;
            >span:nth-of-type(1) {
              margin-left: 50px;
            }

            .title {
              width: 100px;
              display: inline-block;
            }
          }
          .status {
            margin-top: 60px;
            display: flex;
            justify-content: center;

            .time {
              margin: 20px;

              // padding: 7px 20px;
              font-size: 12px;
              // border: 1px solid gainsboro;
              margin: 0 40px;
              display: inline-block;
              width: 120px;
              height: 40px;
              background: url('../../assets/images/bg_xuankuang.png') no-repeat;
              background-size: 100% 100%;
              text-align: center;
              line-height: 40px;
            }
          }
        }
      }
    }
  }
  .inputa {
    display: inline-block;
    width: 300px;
    margin-right: 10px;

    > input {
      width: 300px;
      height: 26px !important;
    }
  }

  .inputb {
    display: inline-block;
    width: 150px;
    margin-right: 10px;

    > input {
      width: 150px;
      height: 26px !important;
    }
  }

  .el-table::before {
    width: 0;
  }

  // 上传照片
  .avatar-uploader {
    display: inline-block;
    margin-left: 9px;
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
    font-size: 28px;
    color: rgba(43, 250, 255, 1);
    width: 160px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid rgba(47, 228, 255, 1);

    em {
      font-size: 16px;
    }
  }

  .avatar {
    width: 160px;
    height: 100px;
    display: block;
  }
  .s-btn{
    display: inline-block;
    width: 110px;
    height: 30px;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 30px;
    color: rgba(47, 228, 255, 1);
    cursor: pointer;
  }
</style>


<style>
  .el-input__inner{
    background: rgba(24, 136, 203, 0.3);
    border: 1px solid rgba(47, 228, 255, 1);
    border-radius: 0;
    color: #fff;
  }
.el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
 input{
    background: transparent;
    padding-left: 10px;
    color: #fff !important;
  }
  input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .el-table{
    background-color: transparent !important;
  }
  .el-table th, .el-table tr {
      background-color: rgba(24, 136, 203, 0.2);
      color: #fff !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-bottom: 1px solid transparent;
  }
  .el-table--enable-row-hover{
    background: rgba(24, 136, 203, 0.2) !important;
  }
  .el-table__body tr:hover>td{
    background-color: rgba(24, 136, 203, 0.4)!important;
  }

  .el-table__body tr.current-row>td{
    background-color: rgba(24, 136, 203, 0.4)!important;
  }
  .el-table, .el-table__expanded-cell:hover,.el-table th, .el-table tr:hover{
    background: rgba(24, 136, 203, 0.4) !important;
  }

  .el-pagination span:not([class*=suffix]), .el-pagination button{
    color: #fff;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination button:disabled,.el-pager li,.el-pagination .btn-prev, .el-pagination .btn-next,.el-pagination__editor.el-input .el-input__inner{
    background: transparent !important;
    color: #fff !important;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination__editor.el-input .el-input__inner{
    border-color: rgba(47, 228, 255, 0.2) !important;
  }
  .el-pager li.active{
    color: rgba(47, 228, 255, 1) !important;
  }
</style>
