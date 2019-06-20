import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入index.css
import '@/styles/index.less'
Vue.config.productionTip = false
// 注册ElementUI
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
