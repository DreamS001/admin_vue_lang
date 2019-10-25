<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div style="color:#fff">
      <!-- <nx-svg-icon class-name='international-icon' icon-class="language" /> -->
      <!-- 切换中/英文 -->
      {{default_data}}
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
import {baseUrlLang} from '@/utils/envlang' //新增 2019.10.14
export default {
  name: 'nx-lang-select',
  data(){
    return {
      newLang:'en_US',
      default_data:'英文'
    }
  },
  components: { nxSvgIcon },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    console.log(this.$store.getters.language)
    if(this.$store.getters.language=='en'){
      this.default_data='英文'
    }else if(this.$store.getters.language=='zh'){
      this.default_data='中文'
    }else{
      this.default_data='英文'
    }
  },
  methods: {
    handleSetLanguage(lang) {
      console.log(lang)
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      if(lang=='zh'){
        this.newLang='zh_CN'
        this.default_data='中文'
      }else{
        this.newLang='en_US'
        this.default_data='英文'
      }
      this.axios.get(baseUrlLang+'/api/i18n?i18n_language='+this.newLang).then(res=>{
        if(res.data.code==200){
          this.$message({
            message: 'switch language success',
            type: 'success'
          })
          this.$router.go(0)
        }else{
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      })
      // switchLang(this.newLang).then(res=>{
      //   console.log(res)
      //   if(res.code==200){
      //     this.$message({
      //       message: 'switch language success',
      //       type: 'success'
      //     })
      //     this.$router.go(0);
      //   }else{
      //     this.$message({
      //       message: res.msg,
      //       type: 'success'
      //     })
      //   }
      // })
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


