<template>
  <div class="wscn-http404-container">
    <div class="nav-a">
      <div class="block" style="width:100%!important;white-space: nowrap;margin-left:30px; ">
        <span class="demonstration">自定义查询：</span>
        <!-- <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="time"
          :end-placeholder="time"
        ></el-date-picker> -->
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
        <div style="height:25px;"></div>
        <span class="demonstration">投资人名称：</span>
        <input style="width:200px" type="text" v-model="merchant" />
        <span class="time" style="margin-left:2%;color:rgba(43, 250, 255, 1);" @click="inquire">查询</span>
        <span class="time" style="color:rgba(43, 250, 255, 1);" @click="exportTable">导出</span>
        <span
          class="time span-style"
          style="width: 90px;
          float: right;

    margin-right: 50px"
          @click="newdata"
        >新建留言</span>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
         :row-class-name="setClassName"
        :header-row-class-name="handlemyclass"
      >
        <el-table-column :cell-class-name="colorblueclass"  label="留言时间" align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
            <!-- {{scope.row.create_time|formatDate}} -->
          </template>
        </el-table-column>
        <el-table-column prop="investor_name" label="投资人名称" width="150" align="center"></el-table-column>
        <el-table-column prop="content" label="留言内容" align="center"></el-table-column>
        <el-table-column prop="reply" label="回复内容" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div class="hf-btn" @click="handleEdit(scope.$index, scope.row)">回复</div>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px" >
      <el-pagination
        @size-change="handlePageChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <!-- <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>留言</span>
          <img @click="increase" src="../../assets/logo/cuo.png" alt />
        </h4>
        <textarea
          v-if="popup==2"
          name
          id
          cols="30"
          rows="10"
          placeholder="请输入留言"
          v-model="date.content"
        ></textarea>
        <textarea
          v-if="popup==1"
          name
          id
          cols="30"
          rows="10"
          placeholder="请回复留言"
          v-model="form.reply"
        ></textarea>
        <p class="button">
          <span @click="confirms">确定</span>
          <span @click="increase">取消</span>
        </p>
      </div>
    </div> -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>新增留言</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="increase" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="ask-box">
          <textarea v-if="popup==2" v-model="date.content" placeholder="请输入留言"></textarea>
          <textarea v-if="popup==1" v-model="form.reply" placeholder="请输入回复文字"></textarea>
        </div>
        <div class="bottom-btn">
          <span @click="confirms">确定</span>
          <span @click="increase">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { messageAll, deleter, add, update } from "@/api/message";
import { constants } from "crypto";
  import moment from 'moment'
  import { formatDate } from '../../utils/date.js'
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      popup: "",
      merchant: "",
      value6: "",
      currentPage4: 1,
      device: "",
      list: [],
      time: "",
      times: "",
      FC: false,
      form: {
        reply: ""
      },
      date: {
        content: ""
      },
      id: "",
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate:'',
      endDate:'',
      maxPageSize: 2147483647
    };
  },
  methods: {
    setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
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
    // 查询
    inquire() {
      // console.log(this.merchant);
      // var that = this;
      // for (let i = 0; i < this.list.length; i++) {
      //   if (that.list[i].investor_name == that.merchant) {
      //     console.log(that.merchant);
      //   }
      // }
      this.pageNo = 1
      this.refresh();
    },
    // 请求数据
    refresh() {
      console.log(1111);
      // messageAll(this.pageNo, this.pageSize).then(res => {
      //   console.log(res);
      //   this.list = eval(res.list);
      //   this.total = res.total;
      // });
      messageAll(this.pageNo, this.pageSize, this.beginDate, this.endDate,this.merchant).then(
          res => {
            if(res.code==200){
              this.list = eval(res.data.list)
              this.total = res.data.total
            }
          }
        )
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      console.log(columnIndex);
      if (columnIndex == 2) {
        return "blue";
      }
    },
    handlePageChange(val) {
      this.pageSize = val;
      // alert(this.pageSize)
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      // alert(this.pageNo)
      this.refresh();
    },

    increase() {
      this.FC = false;
    },
    // 回复留言

    handleEdit($index, row) {
      console.log(row.id);
      this.form.reply = "";
      this.id = row.id;
      this.FC = true;
      this.popup = 1;
    },
    // 添加留言
    newdata() {
      this.popup = 2;
      this.FC = true;
      this.date.content = "";
    },
    // 确定
    confirms() {
      // console.log(this.popup);
      if (this.popup == 2) {
        if (this.date.content == "") {
          alert("内容不能为空");
        } else {
          console.log(this.date.content);
          add(this.date);
          this.$message({
            message: "恭喜你！添加成功",
            type: "success"
          });
          this.FC = false;
           setTimeout(function() {
            location.reload();
          }, 300);
        }
      }

      if (this.popup == 1) {
        if (this.form.reply == "") {
          alert("内容不能为空");
        } else {
          console.log(this.form.reply);
          update(this.id, this.form);
          this.FC = false;
          // this.form.reply = "";
          setTimeout(function() {
            location.reload();
          }, 300);
        }
      }
    },
    //删除

    handleDelete($index, row) {
      this.$confirm("此操作将永久删除该条模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleter(row.id);
        // this.list.splice($index, 1);
        // localStorage.setItem('tempList', JSON.stringify(this.tempList))
        this.$message({
          type: "success",
          message: "删除成功!"
        });
          setTimeout(function() {
            location.reload();
          }, 300)
        //   .catch(err => {
        //   this.$message({
        //     type: "error",
        //     message: err
        //   });
        // });
      });
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    exportTable() {
      messageAll(this.pageNo, this.maxPageSize, this.beginDate, this.endDate,this.merchant).then(res => {
          this.list = eval(res.list)
            this.total = res.total
          const date = JSON.parse(JSON.stringify(this.list))
          // 转换时间戳
          date.forEach((v, i) => {

            date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD hh:mm:ss");
          });
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
            const tHeader = ['留言时间', '投资人名称', '留言内容', '回复内容'] //将对应的属性名转换成中文
            // const tHeader = [];
            const filterVal = ['create_time', 'investor_name', 'content', 'reply'] //table表格中对应的属性名
            const list = date //想要导出的数据
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '留言excel')
          })
        }
      )
    }
  },

  created() {
    var date = new Date()
    this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.beginDate = ''
    this.endDate = ''
    this.refresh();
    var date = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(123123);

      return currentdate;
    };
    var dates = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(123123);

      return currentdate;
    };
    this.time = date();
    this.times = dates();
  },
  // 时间过滤器
   filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
};
</script>

<style  rel="stylesheet/scss" lang="scss" >
.test {
  color: #fff !important;
  // background: #4986ff !important;
  font-weight: 100;
  width: 100% !important;
  font-family: MicrosoftYaHei;
  font-weight: 400;


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

  .nav-a {
    width: 100%;
    height: 120px;
    background: url('../../assets/images/bg_caozuo.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #fff;
    input {
      width: 350px;
      height: 28px;
      border: 1px solid rgba(47, 228, 255, 1);
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
    font-size: 12px;
    // padding: 8px 20px;
    line-height: 30px;
    text-align: center;
    color: #f0f2f5;
    margin: 0 20px;
    cursor: pointer;
  }

.blue {
  color: #2cc23c !important;
}
.fuCeng {
    position: fixed;
    z-index: 1002;
    left: 188px;
    right: 0;
    bottom: 0;
    top: 0;
    // width: 100%;
    // height: 100vh;
    background: rgba(13, 29, 76, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 835px;
      height: 400px;
      // background: white;
      background: url('../../assets/images/bg_qianbao.png') no-repeat;
      background-size:100% 100%;
      // overflow-x: hidden;
      // overflow-y: scroll;
      padding: 22px;
      box-sizing: border-box;
      h4 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 0;
        // background: #4986ff;
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
      .bottom-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-top: 40px;
        >span{
            display: block;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: url('../../assets/images/ic_qb_cz.png') no-repeat;
            background-size: 100% 100%;
            margin: 0 92px;
            cursor: pointer;
        }
        }
      .ask-box{
          width: 695px;
          height: 200px;
          margin: 0 70px;
          border: 1px solid rgba(0, 190, 255, 1);
          padding: 20px;
          box-sizing: border-box;
          >textarea{
              width: 100%;
              height: 100%;
              background: transparent;
              border: none;
              padding: 20px;
              box-sizing: border-box;
              color: #fff;
              font-size: 14px;
              resize: none;
              outline: none;

          }
          >textarea::-webkit-input-placeholder{
              color: #fff;
          }
      }
      div {
        // margin-top: 10px;

        p {
          font-size: 15px;
          text-align: center;

          span {
            margin: 20px;
            padding: 7px 20px;
            font-size: 12px;
            border: 1px solid gainsboro;
            margin: 0 40px;
          }

          // span:nth-of-type(1) {
          //   background: #4986ff;
          //   color: white;
          // }

          // span:nth-of-type(2) {
          //   background: #fff;
          //   color: #c2c2c2;
          // }
        }

        // p:nth-of-type(3) {
        //   margin-top: 60px;
        // }
      }
    }
  }
// .fuCeng {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.3);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   > div {
//     width: 600px;
//     height: 310px;
//     background: white;
//     h4 {
//       display: flex;
//       justify-content: space-between;
//       padding: 20px;
//       margin: 0;
//       background: #4986ff;
//       color: white;
//       font-weight: 100;
//       img {
//         width: 15px;
//         height: 15px;
//       }
//     }
//     textarea {
//       width: 94%;
//       height: 150px;
//       margin: 3%;
//     }
//   }
// }

.button {
  display: flex;
  justify-content: center;
  margin: 0;
  span {
    margin: 20px;
    padding: 7px 20px;
    font-size: 12px;
    border: 1px solid gainsboro;
    margin: 0 40px;
  }
  span:nth-of-type(1) {
    // background: #4986ff;
    color: white;
  }
  span:nth-of-type(2) {
    // background: #fff;
    color: #c2c2c2;
  }
}
.el-table::before {
  width: 0;
}
.hf-btn{
  width: 110px;
  height: 30px;
  background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>


<style>
.el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
  input{
    background: transparent;
    border: 1px solid rgba(47, 228, 255, 1);
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
    background: rgba(24, 136, 203, 0.5) !important;
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
  .el-range-editor--mini.el-input__inner{
    background-color: rgba(24, 136, 203, 0.2);
    border: 1px solid rgba(47, 228, 255, 1) !important;
  }
</style>
