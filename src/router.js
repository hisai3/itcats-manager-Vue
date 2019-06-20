import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    }
  ]
})
export default router
