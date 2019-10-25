import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from 'echarts';
import '@/styles/index.scss' // global css

import App from './App'
import router from './router/routers'
import permission from './components/permission'
import store from './store'
//

import axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from './i18n/langs';
import '@/icons' // icon
import './router/index' // permission control
import clipboard from 'clipboard'
// import getNowFormatDate from '@/utils/dateutils'
//注册到vue原型上
Vue.prototype.clipboard = clipboard
// Vue.prototype.getNowFormatDate = getNowFormatDate

Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

require('babel-polyfill')

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 将时间戳转日期格式的过滤器
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})









