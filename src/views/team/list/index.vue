<template>
  <div class="app-container" style="padding:0;">
    <!--form 组件-->
    <eForm ref="form" :is-add="isAdd" :dicts="dicts"/>
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model="deptName" clearable placeholder="输入部门名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas"/>
        </div>
        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>
      </el-col>-->
      <!--用户数据-->
      <!-- 111{{valid}} -->
      <el-col style="padding-left:0;padding-right:0;">
        <!--工具栏-->
          <!-- 搜索 -->
        <div class="nav" style="margin-bottom:10px;">
          <div class="block" style="min-width:850px;font-size:14px;margin-left: 30px;">
              <span class="demonstration">自定义查询：</span>
              <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
              <span class="demonstration" style="margin-left:60px;">会员编号：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" v-model="userId" />
              <div style="height:15px"></div>

              <!-- <span class="demonstration" v-if="this.button == '切换提现'" style="margin-right:29px;">流水号：</span> -->
              <span class="demonstration" style="margin-right:14px;">会员名称：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" v-model="input1"/>
              <span class="demonstration" style="margin-left:60px;">联系方式：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" v-model="userPhone" />
              <div style="display:inline-block;margin-top:10px">
                <span class="time" style="margin-left:100px;" @click="searchData">查询</span>
                <span class="time" @click="download">导出</span>
              </div>
            </div>
        </div>
        <!--表格渲染-->
        <el-table  :data="userData" :row-class-name="setClassName" style="width: 100%;">
          <el-table-column :show-overflow-tooltip="true" prop="createTime" label="日期" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员编号" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="会员名称" align="center"/>
          <el-table-column prop="phone" label="联系方式" align="center"/>
          <el-table-column label="邮箱" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.email }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱"/> -->
          <!-- <el-table-column label="下线" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.offline_price==null?0:scope.row.offline_price }}/台</div>
            </template>
          </el-table-column> -->
          <el-table-column label="投资金额（$）" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column label="当前余额（$）" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.cash_amount }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div v-for="item in dicts" :key="item.id">
                <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column>-->
 <!-- v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT','USER_DELETE'])" -->
          <el-table-column label="操作" width="260" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                v-permission="['ADMIN','USER_ALL','USER_EDIT']"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              />
              <el-popover
                v-permission="['ADMIN','USER_ALL','USER_DELETE']"
                :ref="scope.row.id"
                placement="top"
                width="180"
              >
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button
                    :loading="delLoading"
                    type="primary"
                    size="mini"
                    @click="subDelete(scope.row.id)"
                  >确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
              </el-popover> -->
              <div class="check-detail" size="mini" @click="reveal(scope.$index, scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>

        <!--分页组件-->
        <el-pagination :total="total" :current-page="page + 1" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange"  @current-change="pageChange" />
        <!-- <el-pagination @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
        :current-page="page + 1"
        :page-sizes="[10,20, 30, 40]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination> -->
      </el-col>
    </el-row>
    <!-- 查看详情 -->
    <!-- <article class="shadow" v-if="FC">
      <div class="box">
        <h5>
          <span>{{nameing}}</span>
          <img @click="shadowing" src="../../../assets/logo/cuo.png" alt/>
        </h5>

        <article class="boxa">
          <p>
            <span>投资人编号：</span>
            <span>{{examine.merchantId}}</span>
          </p>
          <p>
            <span>投资人名称：</span>
            <span>{{examine.jobname}}</span>
          </p>
          <p>
            <span>联系方式：</span>
            <span>{{examine.phone}}</span>
          </p>
          <p>
            <span>账号：</span>
            <span>{{examine.username}}</span>
          </p>
          <p>
            <span>下线：</span>
            <span>{{examine.offlinePrice}}</span>
          </p>
          <p>
            <span>投资金额：</span>
            <span>{{examine.offlinePrice}}</span>
          </p>
          <p>
            <span>所剩余额：</span>
            <span>{{examine.merchantRate}}</span>
          </p>
          <div>
            <span>确定</span>
            <span @click="shadowing">取消</span>
          </div>
        </article>
      </div>
    </article> -->
     <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>查看详情</span><img src="../../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <el-table :data="userList" style="width: 100%!important" height="400"  :row-class-name="setClassName" :header-row-class-name="handlemyclass" :cell-style="finalCellStyle">
            <el-table-column prop="username" label="会员" align="center"></el-table-column>
            <el-table-column prop="id" label="会员编号" align="center"></el-table-column>
            <el-table-column prop="amount" label="投资金额（$）" align="center"></el-table-column>
            <el-table-column prop="num" label="团队人数（人）" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import initDict from '@/mixins/initDict'
  import { del } from '@/api/user'
  import { getDepts } from '@/api/dept'
  import { getAll } from '@/api/role'
  import { parseTime } from '@/utils/index'
  import eForm from './form'
  import moment from 'moment'
  import { formatDate } from '../../../utils/date.js'

  import { getUserList } from '@/api/data'
  import { persAll,detail } from "@/api/team";
  export default {
    components: { eForm },
    mixins: [initData, initDict],
    props: ['valtext'],
    data() {
      return {
        height: document.documentElement.clientHeight - 180 + 'px;',
        isAdd: false,
        delLoading: false,
        deptName: '',
        depts: [],
        deptId: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        downloadLoading: false,
        queryTypeOptions: [
          { key: 'username', display_name: '用户名' },
          { key: 'email', display_name: '邮箱' }
        ],
        enabledTypeOptions: [
          { key: 'true', display_name: '激活' },
          { key: 'false', display_name: '锁定' }
        ],
        examine: {
          merchantId: '',
          email: '',
          phone: '',
          username: '',
          length: '',
          offlinePrice: '',
          merchantRate: ''
        },
        nameing: '',
        FC: false,
        valid: '',
        beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
      value6: '',
      input1:'',
      pageNo: 1,
      pageSize: 10,
      id:'',
      name:'',
      name1:'',
      investorId:'',
      userData:[],
      total:0,
      userId:'',
      userPhone:'',
      userList:[]
      }
    },
    created() {
      var date = new Date()
      this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.beginDate = ''
      this.endDate = ''
      console.log(this.valtext)
      this.getDeptDatas()
      this.$nextTick(() => {
        this.init()
        // 加载数据字典
        this.getDict('user_status')
      })
      persAll().then(res => {
        console.log(res);
        // this.datas = res.content;
        this.investorId=res.content[0].merchantCode
        this.queryData(this.investorId)
      //   console.log('1111')
      // console.log('2222')
      });
      // this.investorId = this.valtext
      // console.log('1111')
      // console.log(this.investorId)
      // console.log('2222')
      // this.queryData()
    },
    mounted: function() {
      const that = this
      window.onresize = function temp() {
        that.height = document.documentElement.clientHeight - 180 + 'px;'
      }
    },
    watch: {
      valtext(newValue, oldValue) {
        this.investorId = newValue
        console.log(this.investorId)
        console.log('1111')
        console.log(newValue)
        this.queryData(newValue)
      console.log('2222')
        // this.beforeInit()
        // this.getDeptDatas()
      }
    },
    methods: {


      parseTime,
      checkPermission,
      beforeInit() {
        console.log(123123)
        var investorId = this.investorId

        console.log(investorId)

        this.url = 'api/users?deptId=' + investorId
        const sort = 'id,desc'
        const query = this.query
        const type = query.type
        const value = query.value
        const enabled = query.enabled
        this.params = {
          page: this.page,
          size: this.size,
          sort: sort,
          deptId: this.deptId
        }
        if (type && value) {
          this.params[type] = value
        }
        if (enabled !== '' && enabled !== null) {
          this.params['enabled'] = enabled
        }
        return true
      },
      reveal($index, row) {
        // this.FC=true
        console.log()
        detail(row.id).then(res=>{
          console.log(res.data)
          this.userList=res.data
        })
        // var i = $index
        // this.examine.merchantId = row.merchantId
        // this.examine.email = row.email
        // this.examine.phone = row.phone
        // this.examine.username = row.username
        // this.examine.offlinePrice = row.offlinePrice
        // this.examine.merchantRate = row.merchantRate
        // console.log(row)

        // console.log(this.examine.merchantId);

        this.FC = true
        this.nameing = '投资人详情'
        console.log('查看详情')
      },
      contribute() {
        this.FC = false
      },finalCellStyle: function({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 1) {
          return {
            color: '#64CB6D'
          }
        }
        if (columnIndex == 2) {
          return {
            color: '#FF7B61'
          }
        }
        if (columnIndex == 3) {
          return {
            color: '#FF7B61'
          }
        }
        if (columnIndex == 4) {
          return {
            color: '#FF7B61'
          }
        }
        if (columnIndex == 5) {
          return {
            color: '#FF7B61'
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
    queryData(id){
      // this.investorId
      getUserList(id, this.beginDate,this.endDate, this.id,this.name, this.name1,this.pageNo, this.pageSize).then(res=>{
        if(res.code==200){
          console.log(res)
          this.userData=res.data.list
          this.total=res.data.total
        }
      })
    },
    searchData(){
      this.id=this.userId
      this.name=this.input1
      this.name1=this.userPhone
      this.queryData(this.investorId)
    },
      // 关闭查看浮层
      shadowing() {
        this.FC = false
      },
      subDelete(id) {
        this.delLoading = true
        del(id)
          .then(res => {
            this.delLoading = false
            this.$refs[id].doClose()
            this.dleChangePage()
            this.init()
            this.$notify({
              title: '删除成功',
              type: 'success',
              duration: 2500
            })
          })
          .catch(err => {
            this.delLoading = false
            this.$refs[id].doClose()
            console.log(err.response.data.message)
          })
      },
      getDeptDatas() {
        const sort = 'id,desc'
        const params = { sort: sort }
        console.log(params)
        console.log(213)
        if (this.deptName) {
          params['name'] = this.deptName
        }
        getDepts(params).then(res => {
          console.log(122)
          console.log(res)
          this.depts = res.content
        })
      },
      handleNodeClick(data) {
        if (data.pid === 0) {
          this.deptId = null
        } else {
          this.deptId = data.id
        }
        this.init()
      },
      add() {
        this.isAdd = true
        console.log(this.$refs.form)
        this.$refs.form.getDepts()
        this.$refs.form.getRoles()
        this.$refs.form.getRoleLevel()
        this.$refs.form.dialog = true
      },
      // 导出
      download() {
        // this.queryData(this.investorId)
         getUserList(this.investorId, this.beginDate,this.endDate, this.id,this.name, this.name1,this.pageNo, this.pageSize).then(res=>{
           if(res.code==200){
            console.log(res)
            this.userData=res.data.list
            this.total=res.data.total
            // 转换时间戳
            res.list.forEach((v, i) => {

              res.list[i].create_time = moment(res.list[i].create_time).format("YYYY-MM-DD hh:mm:ss");

            });
            require.ensure([], () => {
              const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
              const tHeader = [
                "日期",
                "会员编号",
                "会员名称",
                "联系方式",
                "邮箱",
                "下线",
                "投资金额（$）",
                "当前余额（$）"
              ]; //将对应的属性名转换成中文
              // const tHeader = [];
              const filterVal = [
                "create_time",
                "id",
                "username",
                "phone",
                "email",
                "offline_price",
                "total_amount",
                "cash_amount"
              ]; //table表格中对应的属性名
              const list = res.list; //想要导出的数据
              console.log(res.list+"ad")
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, "网络excel");
            });
          }
      })
        // this.downloadLoading = true
        // import('@/utils/Export2Excel').then(excel => {

        //   const tHeader = ['ID', '用户名', '邮箱', '头像地址', '状态', '注册日期', '最后修改密码日期']
        //   const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']
        //   const data = this.formatJson(filterVal, this.data)
        //   excel.export_json_to_excel({
        //     header: tHeader,
        //     data,
        //     filename: 'table-list'
        //   })
        //   this.downloadLoading = false
        // })
      },

      // 数据转换
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'createTime' || j === 'lastPasswordResetTime') {
              return parseTime(v[j])
            } else if (j === 'enabled') {
              return parseTime(v[j]) ? '启用' : '禁用'
            } else {
              return v[j]
            }
          })
        )
      },
      // edit(data) {
      //   this.isAdd = false
      //   const _this = this.$refs.form
      //   console.log
      //   _this.getRoles()
      //   _this.getDepts()
      //   _this.getRoleLevel()
      //   _this.roleIds = []
      //   _this.form = {
      //     id: data.id,
      //     username: data.username,
      //     phone: data.phone,
      //     email: data.email,
      //     enabled: data.enabled.toString(),
      //     roles: [],
      //     dept: { id: data.dept.id },
      //     job: { id: data.job.id },
      //     authCode: data.authCode,
      //     merchantRate: data.merchantRate
      //   }
      //   data.roles.forEach(function(data, index) {
      //     _this.roleIds.push(data.id)
      //   })
      //   _this.deptId = data.dept.id
      //   _this.jobId = data.job.id
      //   _this.getJobs(_this.deptId)
      //   _this.dialog = true
      // },
      setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },
      handlemyclass: function(row, column, rowIndex, columnIndex) {
       return 'test'
    },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .boxx {
    width: 100%;
    height: 60px;
    background: #fff;
    padding: 15px;
    margin-bottom: 20px;
  }

  .shadow {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      width: 280px;
      height: 248px;
      background: white;
      font-size: 10px;

      h5 {
        width: 100%;
        height: 26px;
        background: #4986ff;
        color: #fff;
        padding: 0 15px;
        line-height: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        font-weight: 100;

        img {
          width: 10px;
          height: 10px;
        }
      }

      .boxa {
        p {
          padding: 0 20px;
          margin: 10px 0;
          display: flex;

          span {
            flex-grow: 1;
          }
        }

        div {
          display: flex;
          justify-content: center;

          span {
            padding: 5px 15px;
            background: #4986ff;
            color: #fff;
            margin: 20px 20px;
          }

          span:nth-of-type(2) {
            background: #ffffff;
            color: #c3c3c3;
            border: 1px solid #c3c3c3;
          }
        }
      }
    }
  }
  .check-detail{
    width: 110px;
    height: 30px;
    background: url('../../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
  .nav {
    width: 100%;
    // height: 120px;
    padding: 15px 0;
    box-sizing: border-box;
    background: url('../../../assets/images/bg_caozuo.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #fff;
    .el-range-editor--mini.el-input__inner{
      border: 1px solid rgba(47, 228, 255, 1) !important;
      background: rgba(24, 136, 203, 1) !important;
    }
  }
  .time {
    display: inline-block;
    width: 110px;
    height: 30px;
    // background: #4986ff;
    background: url('../../../assets/images/ic_home_Viewdetails.png') no-repeat !important;
    background-size: 100% 100%;
    font-size: 14px;
    // padding: 8px 20px;
    color: rgba(43, 250, 255, 1);
    margin: 0 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
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
      width: 70%;
      height: 506px;
      // background: white;
      background: url('../../../assets/images/bg_qb_ckmx.png') no-repeat;
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

      div {
        // margin-top: 10px;

        p {
          font-size: 15px;
          text-align: center;

          // span {
          //   margin: 20px;
          //   padding: 7px 20px;
          //   font-size: 12px;
          //   border: 1px solid gainsboro;
          //   margin: 0 40px;
          // }

          // span:nth-of-type(1) {
          //   background: #4986ff;
          //   color: white;
          // }

          // span:nth-of-type(2) {
          //   background: #fff;
          //   color: #c2c2c2;
          // }
        }

      }
    }
  }
</style>


<style>
input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .el-range-editor--mini.el-input__inner .el-range-input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .el-range-input::-webkit-input-placeholder{
    color: #fff !important;
  }
.el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
.has-gutter th{
  background-color: rgba(24, 136, 203, 0.2) !important;
}
</style>
