<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="min-width:850px;width:100%;font-size:14px;margin-left: 30px;">
        <span class="posteradd"  @click="added()">新增</span>
      </div>
    </div>
    <div  style="width:100%!important;margin-top:20px">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column
          type="selection"
          label="全选"
          align="center">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="id"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="公告标题"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          label="修改日期"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="last_modify_name"
          label="最后修改人"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="次序"
          width="120"
          align="center">
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <span class="s-btn" @click="edited(scope.$index,scope.row)">编辑</span>
            <span class="s-btn" @click="deled(scope.$index,scope.row);getType(1)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- 浮层 -->
    <!-- 浮层 -->
    <!-- <div v-if="FC" class="fuCeng">
      <div class="fuCeng-d">
        <h4>
          <div><span>编辑</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute()" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="ask-boxs haibao">
          <div class="chart-wrapper texter">
            <div class="titles">
              <span>公告标题：</span>
              <input type="text" v-model="title" placeholder="请输入标题" />
            </div>
            <div class="content">
              <div>
                <span style="">公告正文：</span>
              </div>

              <div>
                <textarea v-model="desc" placeholder="请输入正文"></textarea>
              </div>
            </div>
            <div class="paixu">
              <span>排序：</span>
              <input type="text" placeholder="排序、数字" />
            </div>
            <div class="bottom-btn">
              <span @click="submit">提交</span>
              <span @click="reset">重置</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div v-if="FC" class="fuCeng">
      <div class="fuCeng-d">
        <h4>
          <div><span>{{h1text}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="close()" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="ask-boxs haibao">
          <div class="chart-wrapper texter">
            <div class="titles">
              <span>公告标题：</span>
              <input type="text" v-model="form.title" placeholder="请输入标题" />
            </div>
            <div class="content">
              <div>
                <span style="">公告正文：</span>
              </div>

              <div>
                <textarea placeholder="请输入正文"  v-model="form.content"></textarea>
              </div>
            </div>
            <!-- <div class="paixu">
              <span>排序：</span>
              <input type="text" placeholder="排序、数字" />
            </div> -->
            <div class="bottom-btn">
              <span @click="voting">提交</span>
              <span @click="close">重置</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
    import {writerlist,writeradd,writerdel} from '@/api/marketing'
    import moment from 'moment'
    import request from '@/utils/request'
    import {formatDate} from '../../utils/date.js'

    export default {
        data() {
            return {
                form: { title: '', content: '', enabled: 1, remark: '' }, permissionIds: [],
                value6: '',
                input1: '',
                pageNo: 1,
                pageSize: 10,
                total: 1,
                currentPage4: 4,
                name:'',
                // withdrawlist: [],
                topuplist: [],
                withdrawAlllist: [],
                topupAlllist: [],
                title:'',
                desc:'',
                h1text:'',
                withdraw: true,
                topup: false,
                popup: '',
                pass: {
                    type: 1,
                    status: '',
                    id: '',
                    remark: ''
                },
                beginDatePlaceHolder: '',
                endDatePlaceHolder: '',
                beginDate: '',
                endDate: '',
                downloadLoading: false,
                maxPageSize: 2147483647,
                allList: [],
                clickQueryDate: false,
                selectTime: false,
                FC: false,
                aFC:false,
                rowId:'',//列表id
                rowDesc:'',//理由
                rowType:0,
                tableData: [],
                multipleSelection: []
              }
        },
        created() {
            var date = new Date()
            this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
            this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
            this.beginDate = ''
            this.endDate = ''
            this.button = '切换提现'
            this.request()
        },
        methods: {
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          },
          setClassName({row, rowIndex}) {
            let index = rowIndex + 1;
            if(index %2 == 0){
                return 'warning-row'
            }else{
              return 'success-row'
            }
          },
            // 切换状态

            contribute() {
                this.FC = false
                this.rowDesc=''
            },
            //确定
            // 弹框展现与隐藏
            close() {
              if (this.FC == false) {
                this.FC = true
              } else {
                this.FC = false
                this.imageUrl = ''
                this.imageUrlOk = false
                this.request()
              }
            },
            deled($index, row) {
              this.$confirm('此操作将永久删除该条模板, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                writerdel(row.id).then(res => {
                  this.request()
                  this.$message({ type: 'success', message: '删除成功!' })
                })
              })
            },
            // 新增
            added(){
              this.FC=true
              this.h1text='新增'
              this.popup=1
              this.form.title = ''
              this.form.content = ''
              // this.form.picUrl = ''
            },
            voting() {
                switch (this.popup) {
                  case 1:
                    if (this.form.title == '') {
                      this.$message.warning('请输入标题')
                      return
                    }else if (this.form.content=='') {
                      this.$message.warning('请输入内容')
                      return
                    }else{
                      console.log(this.form)
                      writeradd(this.form).then(res => {
                        console.log(res)
                        if(res.code==200){
                          this.$message.success(res.msg)
                        }else{
                          this.$message.warning(res.msg)
                        }
                        this.FC = false
                        this.pageNo = 1
                        this.request()
                      })
                    }
                  break
                  case 2:
                    if (this.form.title == '') {
                      this.$message.warning('请输入标题')
                      return
                    }else if (this.form.content=='') {
                      this.$message.warning('请输入内容')
                      return
                    }else{
                      console.log(this.form)
                      writeradd(this.form).then(res => {
                        console.log(res)
                        if(res.code==200){
                          this.$message.success(res.msg)
                        }else{
                          this.$message.warning(res.msg)
                        }
                        this.FC = false
                        this.pageNo = 1
                        this.request()
                      })
                    }
                }
            },
            // 检测用户是否有选中时间
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
              writerlist(this.pageNo, this.pageSize, this.name).then(res => {
                if(res.code==200){
                  res.data.list.forEach((v,i)=>{
                    res.data.list[i].modify_time = moment(res.data.list[i].modify_time).format("YYYY-MM-DD hh:mm:ss");
                  })
                  this.tableData = eval(res.data.list)
                  this.total = res.data.total
                }
              })

            },
            queryData() {
                this.pageNo = 1
                this.request()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
           edited($index, row) {
              this.h1text = '编辑'
              this.popup = 2
              this.FC = true
              console.log($index)
              console.log(row)
              console.log(this.tableData[$index])
              this.form = JSON.parse(JSON.stringify(this.tableData[$index]))
              console.log(this.form)
              this.form.title = this.form.title
              this.form.content= this.form.content
              // this.resDate = JSON.parse(JSON.stringify(this.data.list))
          },

            getType(e){
              // console.log(e)
              this.rowType=e
            },
            // table头部样式
            handlemyclass: function (row, column, rowIndex, columnIndex) {
                return 'test'
            },
            handleSizeChange(val) {
                console.log(val)
                this.pageSize = val
                this.request()
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.request()
            },
            handleClick(row) {
                this.$prompt('请说明理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[^\s]/,
                    inputErrorMessage: '请输入内容'
                })
                    .then(({value}) => {
                        this.pass.id = row.id
                        this.pass.status = 300
                        this.pass.remark = value
                        console.log(this.pass)
                        audit(this.pass).then(res => {
                            console.log(res)
                            // this.total = res.total;
                            // this.Withdrawlist = res.list;
                            this.request()
                        })

                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        })
                    })
            },
        }
    }
</script>

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
      border: 1px solid rgba(47, 228, 255, 1) !important;
      background: rgba(24, 136, 203, 1) !important;
    }
  }

  .block {
    font-size: 13px;
    // margin-left: 30px;
  }
  .posteradd{
    float: right;
    margin-right: 40px;
    display: inline-block;
    width:120px;
    height:40px;
    text-align: center;
    line-height: 40px;
    background:url(../../assets/images/bg_xuankuang.png) no-repeat;
    background-size: 100% 100%;
    box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }

  .test {
    color: #fff !important;
    // background: #4986ff !important;
    font-weight: 100;
    width: 100% !important;
  }

  .blue {
    color: #2cc23c !important;
  }
  .fuCeng  {
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
    > .fuCeng-d {
      width: 837px;
      height: 588px;
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
        margin: 0;
        // background: #4986ff;
        color: white;
        font-weight: 100;

        >div{
          margin-top: 10px;
          >img{
            width: 42px;
            height: 11px;

            margin-left: 10px;
          }
        }
        >img {
          width: 80px;
          height: 30px;
          cursor: pointer;
        }
      }

      .ask-boxs{
          width: 695px;
          height: 349px;
          padding: 20 0px;
          position: relative;
          box-sizing: border-box;
          >span{
            position: absolute;
            bottom: 115px;
            left: 100px;
            z-index: 10;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(254,254,254,1);

          }
      }
  }

}
.s-btn{
      display: inline-block;
      width: 100px;
      height: 30px;
      background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 30px;
      color: rgba(47, 228, 255, 1) !important;
      cursor: pointer;
  }
.bottom-btn{
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 40px;
  }
.bottom-btn span{
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

textarea::-webkit-input-placeholder{
    color: #fff;
}
.haibao .avatar-uploader .el-upload {
  width:509px;
  height: 201px;
  border: 1px solid rgba(47,228,255,1);
  // border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.haibao .avatar {
  width: 509px;
  height: 201px;
  display: block;
  border:none;
}
.titles,.content,.paixu{
  margin-top:30px;
  width:100%;
}
.titles ,.paixu{
  height:37px;
}
.content{
  height:227px;
}
.content>div:nth-of-type(1){
  float: left;
  height: 227px;
  display: inline-block;
  width: 79px;
  box-sizing: border-box;
}
.content>div:nth-of-type(2){
  height: 227px;
  display: inline-block;
  width: 509px;
  box-sizing: border-box;
  background:rgba(24,136,203,0.3);
  border:1px solid #2FE4FF;
  box-shadow:0px 0px 60px 0px rgba(0,128,202,0.4);
}
.content textarea{
  height: 227px;
  width:509px;
  display: inline-block;
  background: transparent;
  border: none;
  padding: 11px 20px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  resize: none;
  outline: none;
}
.titles>span:nth-of-type(1) ,.paixu>span:nth-of-type(1),.content span{
  width:75px;
  display: inline-block;
  line-height: 37px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.titles>input,.paixu>input{
  border: 1px solid rgba(47,228,255,1);
  box-sizing: border-box;
  width: 509px;
  height:37px;
}
</style>

<style>
.haibao .el-form-item__content{
  margin-top:10px;
}
.haibao .el-form-item__label{
  width: 80px !important;
  margin-left: 20px;
  text-align: left;
}
  .el-form-item__label{
    color: #fff !important;
  }

 .haibao input{

    background: rgba(24, 136, 203, 0.3) !important;
    color: #fff !important;
    padding-left: 20px;
    box-sizing: border-box;
  }
.el-range-input{
  border:0 none !important;
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
      font-weight: 400 !important;
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
</style>
