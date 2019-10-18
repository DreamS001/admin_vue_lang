<template>
	<div class="app-container">
		<div class="head-container">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="收款账号">
			  	<el-input v-model="formInline.user" placeholder="收款账号" style="width: 18.75rem;"></el-input>
			  </el-form-item>
				<el-form-item label="交易时间">
					<el-date-picker
					 size="small"
					  v-model="value2"
					  type="daterange"
					  align="right"
					  unlink-panels
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
					  :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
			  <el-form-item label="审核状态">
				<el-select v-model="formInline.region" placeholder="审核状态" style="width: 7.5rem">
				  <el-option label="审核通过" value="shanghai"></el-option>
				  <el-option label="审核中" value="beijing"></el-option>
				  <el-option label="审核失败" value="shanghai"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
			  <el-button
			    v-permission="['ADMIN']"
			    :loading="downloadLoading"
			    size="mini"
			    type="warning"
			    icon="el-icon-download"
			    @click="download">导出</el-button>
			  </el-form-item>
				</el-form>
		</div>
	<el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="create_time" label="交易时间" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="trande_no" label="交易流水号" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="app_name" label="提现账户" align="center" header-align="center">
      </el-table-column>
			<el-table-column prop="wd_bank" label="收款账户" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="bank_name" label="收款银行" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="merchant_info" label="提现金额(元)" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="os_version" label="交易状态" align="center" header-align="center">
				<template slot-scope="scope">
				<el-tag type="success" v-if="scope.row.status==1">审核通过</el-tag>
				<el-tag type="danger" v-else-if="scope.row.status==2">审核中</el-tag>
				<el-tag type="info" v-else-if="scope.row.status==3">审核失败</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="create_time" label="被拒原因" align="center" header-align="center">
			</el-table-column>
    </el-table>
	</div>
	
</template>

<script>
	import checkPermission from '@/utils/permission' // 权限判断函数
	export default {
      data() {
        return {
			formInline: {
          user: '',
          region: ''
        },
			pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
		  form:{},
		  query:{
			  name:'apdid_token',
			  value:''
		  },
		  downloadLoading:false,
		  dialogFormVisible: false,
		  formLabelWidth: '120px',
          tableData: [{
            create_time: '2016-05-02',
            apdid_token: '2s1d4w6a1d3s4782',
			trande_no:'FPB100579844678845',
			bank_name:'中国银行',
			wd_bank:'16798465798456465',
            app_name: '百事可乐',
			app_version:'0.38',
			bio_metainfo:'0.38',
			os_version:'百事可乐总代理',
			machine_info:'1548.52',
			merchant_info:'63',
			status:1
          },{
            create_time: '2016-05-02',
            apdid_token: '2s1d4w635d3s4ds2',
			trande_no:'FPB100579844693248',
			bank_name:'中国银行',
			wd_bank:'16798465798456465',
            app_name: '可口可乐',
			app_version:'0.38',
			bio_metainfo:'0.38',
			os_version:'可口可乐总代理',
			machine_info:'2652.34',
			merchant_info:'86',
			status:2
          },{
            create_time: '2016-05-02',
            apdid_token: '2s1d4w78663s4ds8',
			trande_no:'FPB100579844658735',
			bank_name:'中国银行',
			wd_bank:'16798465798456465',
            app_name: '美汁源',
			app_version:'0.30',
			bio_metainfo:'0.38',
			os_version:'美汁源总代理',
			machine_info:'987.45',
			merchant_info:'55',
			status:3
          },{
            create_time: '2016-05-02',
            apdid_token: '2s1d143a1d3s4ds4',
			trande_no:'FPB100579844123987',
			bank_name:'中国银行',
			wd_bank:'16798465798456465',
            app_name: '哇哈哈',
			app_version:'0.30',
			bio_metainfo:'0.38',
			os_version:'美汁源总代理',
			machine_info:'987.45',
			merchant_info:'55',
			status:1
          }]
        }
      },
	  methods:{
		checkPermission,
		add() {
			this.dialogFormVisible = true
		},
		onSubmit() {
        console.log('submit!');
      },
		// 导出
		download() {
		  this.downloadLoading = true
		  import('@/utils/Export2Excel').then(excel => {
		    const tHeader = ['ID', '设备指纹', '应用名称', '应用版本', '生物信息', '系统版本', '设备硬件相关信息','商户相关信息','刷脸调用的事务ID','添加时间','修改时间']
		    const filterVal = ['id', 'apdid_token', 'app_name', 'app_version', 'bio_metainfo', 'os_version', 'machine_info','merchant_info','remote_logo_id','create_time','modify_time']
		    const data = this.formatJson(filterVal, this.tableData)
		    excel.export_json_to_excel({
		      header: tHeader,
		      data,
		      filename: 'table-list'
		    })
		    this.downloadLoading = false
		  })
		},
		// 数据转换
		formatJson(filterVal, jsonData) {
		  return jsonData.map(v => filterVal.map(j => {
		    if (j === 'createTime' || j === 'lastPasswordResetTime') {
		      return parseTime(v[j])
		    } else if (j === 'enabled') {
		      return parseTime(v[j]) ? '启用' : '禁用'
		    } else {
		      return v[j]
		    }
		  }))
		},
	  }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
	.queryLabel{
		text-align: center;
		font-size: 1rem;
	}
</style>
