<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div style="color:#fff">
      <!-- <nx-svg-icon class-name='international-icon' icon-class="language" /> -->
      切换中/英文
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import nxSvgIcon from '@/components/nx-svg-icon/index'

import {switchLang} from '@/api/login'
export default {
  name: 'nx-lang-select',
  data(){
    return {
      newLang:'en_US'
    }
  },
  components: { nxSvgIcon },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      console.log(lang)
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      if(lang=='zh'){
        this.newLang='zh_CN'
      }else{
        this.newLang='en_US'
      }
      switchLang(this.newLang).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: 'switch language success',
            type: 'success'
          })
        }else{
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 22px;
  cursor: pointer;
  vertical-align: -5px!important;
}
.el-dropdown{
  color:#5a5e66;
}
</style>


