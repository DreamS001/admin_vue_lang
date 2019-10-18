<template>
  <div class="wscn-http404-container">
    <div class="nav poster-nav">
      <div class="block" style="min-width:850px;width:100%;font-size:14px;margin-left: 30px;">
        <span class="posteradd"  @click="added">新增</span>
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
          prop="id"
          label="id"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片名称"
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
          align="center">
        </el-table-column>
        <el-table-column label="图片" min-width="120" max-height='50' show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div>
              <img width="100" height="80" :src="scope.row.url" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="次序"
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
    <div  class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>


    <div v-if="FC" class="fuCeng">
      <div class="fuCeng-d">
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>{{h1text}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="close" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="ask-boxs haibao">
           <el-form ref="form" :model="form"  label-width="100px">
            <el-form-item label="轮播海报:" prop="">
              <el-upload class="avatar-uploader" :action="imagesUploadApiNew" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else  class="el-icon-plus avatar-uploader-icon" style="font-size:30px;color:#2BFAFF ;top:-15px"> </i>
              <!-- <span>点击上传图片</span> -->
            </el-upload>
            </el-form-item>
            <el-form-item label="图片名称:" prop="" >
              <el-input v-model="form.name" placeholder="请输入图片名称且不能重复" style="width:509px;height:37px;"/>
            </el-form-item>
            <el-form-item label="排序:" prop="methodName">
              <el-input @input="onInput2" oninput="value=value.replace(/[^\d]/g,'')" v-model="form.sort" placeholder="排序、数字" style="width:509px;height:37px;" />
            </el-form-item>
          </el-form>
          <span>轮播图设计比例3:2</span>
        </div>
        <div class="bottom-btn">
          <span @click="voting">确定</span>
          <span @click="close">取消</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
    import {bannerlist,banneradd,bannerdel} from '@/api/marketing'
    import moment from 'moment'
    import request from '@/utils/request'
    import {formatDate} from '../../utils/date.js'
    import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth.js'

    export default {
        data() {
            return {
                form: { name: '', sort: '',type: 1, enabled:1,url:''}, permissionIds: [],
                value6: '',
                input1: '',
                pageNo: 1,
                pageSize: 10,
                total: 1,
                currentPage4: 4,
                // withdrawlist: [],
                topuplist: [],
                withdrawAlllist: [],
                topupAlllist: [],
                imageUrl:'',
                h1text: '',
                popup: '',
                // picUrl:'',
                topup: false,
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
                name:'',
                tableData: [],
                multipleSelection: [],
                headers: {
                  Authorization: 'Bearer ' + getToken()
                },
                imageUrlOk: false,
                imageFile: false
              }
        },
        computed: {
          ...mapGetters([
            'imagesUploadApiNew'
          ])
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
          onInput2(){
            // console.log('1111')
            if (this.form.sort <=0) {
              this.$message.warning('次序必须大于零的自然数')
              // return
            }
          },
          handleAvatarSuccess(res, file) {
            console.log(res)

            this.imageUrl = URL.createObjectURL(file.raw)

            if (res.msg == '图片上传重复限制') {
              return this.$message.error(res.data.msg)
            } else if (res.msg == '上传成功') {
              this.$message.success(res.data.msg)
              this.imageUrlOk = true
              this.form.url = res.data.url
              console.log(res.data.url)
            } else {
              return this.$message.error('图片上传失败')
            }
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
          },

          // toggleSelection(rows) {
          //   if (rows) {
          //     rows.forEach(row => {
          //       this.$refs.multipleTable.toggleRowSelection(row);
          //     });
          //   } else {
          //     this.$refs.multipleTable.clearSelection();
          //   }
          // },
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
          //删除
          deled($index, row) {
            this.$confirm('此操作将永久删除该条模板, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
              bannerdel(row.id).then(res => {
                this.request()
                this.$message({ type: 'success', message: '删除成功!' })
              })
            })
          },
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
          // 新增
          added(){
            this.FC=true
            this.h1text='新增'
            this.popup=1
            this.form.name = ''
            this.form.sort = ''
            this.form.url = ''
          },
          edited($index, row) {
            this.h1text = '编辑'
            this.popup = 2
            this.FC = true
            // console.log($index)
            console.log(row)
            console.log(this.tableData[$index])
            this.form = JSON.parse(JSON.stringify(this.tableData[$index]))
            console.log(this.form)
            this.form.name = this.form.name
            this.form.type= this.form.type
            this.form.sort= this.form.sort
            this.imageUrl = this.form.url
            this.form.url = this.tableData[$index].url
            if (this.tableData[$index].url) {
              this.imageFile = true
            }
            // this.resDate = JSON.parse(JSON.stringify(this.data.list))
          },
          //确定
          voting() {
            switch (this.popup) {
              case 1:
                if (this.imageFile == false && this.imageUrlOk == false) {
                  this.$message.warning('请上传图片')
                  return
                }else if (this.form.name == '') {
                  this.$message.warning('请输入产品名称')
                  return
                }else if (this.form.sort <=0) {
                  this.$message.warning('次序必须大于零的自然数')
                  return
                }else{
                  console.log(this.form)
                  banneradd(this.form).then(res => {
                    console.log(res)
                    if(res.msg=='添加/更新Banner成功'){
                      this.$message.success('添加海报信息成功')
                    }else{
                      this.$message.warning(res.data.msg)
                    }
                    this.FC = false
                    this.pageNo = 1
                    this.imageUrl=''
                    this.request()
                  })
                }
              break
              case 2:
                if (this.imageFile == false && this.imageUrlOk == false) {
                  this.$message.warning('请上传图片')
                  return
                }else if (this.form.name == '') {
                  this.$message.warning('请输入产品名称')
                  return
                }else if (this.form.sort <=0) {
                  this.$message.warning('次序必须大于零的自然数')
                  return
                }else{
                  console.log(this.form)
                  banneradd(this.form).then(res => {
                    console.log(res)
                    if(res.msg=='添加/更新Banner成功'){
                      this.$message.success('更新海报信息成功')
                    }else{
                      this.$message.warning(res.data.msg)
                    }
                    this.FC = false
                    this.pageNo = 1
                    this.imageUrl=''
                    this.request()
                  })
                }
            }
          },
          request() {
            bannerlist(this.pageNo, this.pageSize, this.name).then(res => {
              console.log(res)
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

          // reveal($index, row) {
          //     this.FC = true
          //     this.rowId=row.id
          // },
          refuse($index, row) {
            // this.FC = true
            // console.log(row)
              // this.FC = true
              this.rowId=row.id
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
          // handleClick(row) {
          //     this.$prompt('请说明理由', '提示', {
          //         confirmButtonText: '确定',
          //         cancelButtonText: '取消',
          //         inputPattern: /[^\s]/,
          //         inputErrorMessage: '请输入内容'
          //     })
          //         .then(({value}) => {
          //             this.pass.id = row.id
          //             this.pass.status = 300
          //             this.pass.remark = value
          //             console.log(this.pass)
          //             // audit(this.pass).then(res => {
          //             //     console.log(res)
          //             //     // this.total = res.total;
          //             //     // this.Withdrawlist = res.list;
          //             //     this.request()
          //             // })

          //             this.$message({
          //                 type: 'success',
          //                 message: '操作成功'
          //             })
          //         })
          //         .catch(() => {
          //             this.$message({
          //                 type: 'info',
          //                 message: '取消输入'
          //             })
          //         })
          //   },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .wscn-http404-container {
    background: transparent;
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .poster-nav {
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
        padding: 20px 20px 10px;
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
          cursor: pointer;
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


.haibao .avatar-uploader .el-upload {
  width:509px;
  height: 201px;
  border: 1px solid rgba(47,228,255,1);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
.haibao  .el-upload span{
  position: absolute;
  top:130px;
  left:calc(409px/2);
  display: block;
  width:100px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);


}
.haibao .avatar-uploader-icon {
  position: absolute;
  box-sizing: border-box;
  top:0;
  left: 0;
  font-size: 14px;
  color: #fff;
  width: 509px;
  height: 201px;
  line-height: 210px;
  text-align: center;
  border:none;
  // border: 1px solid rgba(47,228,255,1);
  em {
    font-size: 14px;
  }
}
.haibao .avatar {
  width: 509px;
  height: 201px;
  display: block;
  border:none;
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
