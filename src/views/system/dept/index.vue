<template>
  <div class="app-container" style="padding:10px;">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable :placeholder="$t('systemes.proxy_code_search')"  style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-select v-model="query.enabled" clearable :placeholder="$t('systemes.status')" class="filter-item" style="width: 90px" @change="toQuery">
        <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">
        <!-- 搜索 -->
        {{$t('systemes.search')}}
      </el-button>
      <!-- 新增 -->
      <!-- <div v-permission="['ADMIN','DEPT_ALL','DEPT_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
      </div> -->
      <div style="display: inline-block;">
        <el-button
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-more"
          @click="changeExpand">{{ expand ? fold : expands }}</el-button>
        <eForm ref="form" :is-add="true" :dicts="dicts"/>
      </div>
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd" :dicts="dicts"/>
    <!--表格渲染-->
    <tree-table :expand-all="expand" :data="data" :columns="columns" size="medium" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
      <el-table-column :label="$t('systemes.proxy_code')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.merchantCode }}</span>
        </template>
      </el-table-column>
			<el-table-column :label="$t('systemes.sponsored_links')" align="center">
			  <template slot-scope="scope">
			    <el-button size="mini" type="infor" class="copy" data-clipboard-action="copy" :data-clipboard-text="'https://wap.fptvip.com/register/?key='+scope.row.registerUrl" @click="copyUrl">
          <!-- 点击复制 -->
          {{$t('systemes.click_to_copy')}}
          </el-button>
			  </template>
			</el-table-column>
			<el-table-column :label="$t('systemes.status')" align="center">
        <template slot-scope="scope">
          <!-- <div v-for="item in dicts" :key="item.id">
            <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
          </div> -->
          <el-tag v-if="scope.row.enabled.toString() === 'true'">{{$t('systemes.activation')}}</el-tag>
          <el-tag v-else>{{$t('systemes.lock')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('systemes.creationdate')">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="checkPermission(['ADMIN','DEPT_ALL','DEPT_EDIT','DEPT_DELETE'])" label="操作" width="130px" align="center">
        <template slot-scope="scope">
          <el-button v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['ADMIN','DEPT_ALL','DEPT_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column> -->
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eForm from './form'

import  Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';

export default {
  components: { eForm, treeTable },
  mixins: [initData, initDict],
  data() {
    return {
      messages:'',
      messagee:'',
      fold:'fold',
      expands:'expand',
      columns: [
        {
          text: '名称',
          value: 'name'
        }
      ],
      enabledTypeOptions: [
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ],
      delLoading: false, expand: true
    }
  },
  created() {
    if(lang=='en'){
      this.columns=[{text:'name', value:'name'}]
      this.enabledTypeOptions=[
        { key: 'true', display_name: 'normal' },
        { key: 'false', display_name: 'forbidden' }
      ]
      this.fold='fold'
      this.expands='expand'

    }else{
      this.columns=[{text:'名称',value:'name'}]
      this.enabledTypeOptions=[
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ]
      this.fold='折叠'
      this.expands='展开'
    }
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      // this.getDict('dept_status')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/dept'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const value = query.value
      const enabled = query.enabled
      if (value) { this.params['name'] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()

        this.$notify({

          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    add() {
      this.isAdd = true
      const _this = this.$refs.form
      _this.getDepts()
      _this.dialog = true
    },
    changeExpand() {
      this.expand = !this.expand
      this.init()
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.getDepts()
      _this.form = {
        id: data.id,
        name: data.name,
        pid: data.pid,
        createTime: data.createTime,
        enabled: data.enabled.toString()
      }
      _this.dialog = true
    },
		copyUrl(){
      let _this = this;
      if(lang=='en'){
          _this.messages='successfully copy'
          _this.messagee='Copy the failure'

        }else{
          _this.messages='复制成功!'
          _this.messagee='复制失败!'
        }
     let clipboard = new this.clipboard(".copy");
     clipboard.on('success', function () {
       console.log(_this)

       _this.$message({

				 message:_this.messages,
				//  message:'复制成功!',
				 type:'success'
			 })
     });
     clipboard.on('error', function () {
				_this.$message.error(_this.messagee)
     });
    },
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

<style scoped>

</style>
