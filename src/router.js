import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Welcome from '@/components/welcome'
import UserList from '@/users/users'
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
      component: Index,
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'userList',
          path: 'users',
          component: UserList
        }
      ]
    }
  ]
})
export default router
