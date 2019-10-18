<template>
	<div class="app-container">
		<div class="head-container">
			<!-- 搜索 -->
			<el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
			<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
			<!-- 新增 -->
			<div v-permission="['ADMIN','MENU_ALL','MENU_CREATE']" style="display: inline-block;margin: 0px 2px;">
			  <el-button
			    class="filter-item"
			    size="mini"
			    type="primary"
			    icon="el-icon-plus"
			    @click="add">新增</el-button>
			</div>
			<!-- 导出 -->
			<div style="display: inline-block;">
			  <el-button
			    v-permission="['ADMIN']"
			    :loading="downloadLoading"
			    size="mini"
			    class="filter-item"
			    type="warning"
			    icon="el-icon-download"
			    @click="download">导出</el-button>
			</div>
		</div>
	<el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="create_time" label="添加日期" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="apdid_token" label="设备指纹" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="app_name" label="应用名称" align="center" header-align="center">
      </el-table-column>
			<el-table-column prop="app_version" label="应用版本" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="bio_metainfo" label="生物信息" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="os_version" label="系统版本" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="machine_info" label="设备硬件相关信息" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="merchant_info" label="商户相关信息" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="enabled" label="状态">
				<template slot-scope="scope">
				<el-tag type="success" v-if="scope.row.enabled==1">激活</el-tag>
				<el-tag type="danger" v-else-if="scope.row.enabled==0">停用</el-tag>
				</template>
			</el-table-column>
    </el-table>
	
	<!-- 新增窗口 -->
	<el-dialog title="新增设备" :visible.sync="dialogFormVisible" append-to-body>
  <el-form :model="form" size="small">
    <el-form-item label="设备指纹" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="应用名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
		<el-form-item label="应用版本" :label-width="formLabelWidth">
		  <el-input v-model="form.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="生物信息" :label-width="formLabelWidth">
		  <el-input v-model="form.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="系统版本" :label-width="formLabelWidth">
		  <el-input v-model="form.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="设备硬件相关信息" :label-width="formLabelWidth">
		  <el-input v-model="form.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="商户相关信息" :label-width="formLabelWidth">
		  <el-input v-model="form.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="设备状态" :label-width="formLabelWidth">
    <el-radio-group v-model="form.resource">
      <el-radio label="激活"></el-radio>
      <el-radio label="停用"></el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
	</div>
	
</template>

<script>
	import checkPermission from '@/utils/permission' // 权限判断函数
	export default {
      data() {
        return {
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
            apdid_token: '2s1d4w6a1d3s4ds2',
            app_name: '当面付',
						app_version:'1.0.0',
						bio_metainfo:'fpb5.0.6',
						os_version:'1.0.0',
						machine_info:'支付码，刷脸一体机',
						merchant_info:'商户信息',
						enabled:1
          },{
            create_time: '2016-05-02',
            apdid_token: '2s1d4w6a1d3s4ds2',
            app_name: '当面付',
						app_version:'1.0.0',
						bio_metainfo:'fpb5.0.6',
						os_version:'1.0.0',
						machine_info:'支付码，刷脸一体机',
						merchant_info:'商户信息',
						enabled:0
          },{
            create_time: '2016-05-02',
            apdid_token: '2s1d4w6a1d3s4ds2',
            app_name: '当面付',
						app_version:'1.0.0',
						bio_metainfo:'fpb5.0.6',
						os_version:'1.0.0',
						machine_info:'支付码，刷脸一体机',
						merchant_info:'商户信息',
						enabled:1
          }]
        }
      },
	  methods:{
		checkPermission,
		add() {
			this.dialogFormVisible = true
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

<style>
</style>
