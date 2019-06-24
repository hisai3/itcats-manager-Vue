import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Welcome from '@/components/welcome'
import UserList from '@/users/users'
import Right from '@/components/roles/right'
import Roles from '@/components/roles/roles'
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
        },
        {
          name: 'rightList',
          path: 'right',
          component: Right
        },
        {
          name: 'rolesList',
          path: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
export default router
