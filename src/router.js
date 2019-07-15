import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Welcome from '@/components/welcome'
import UserList from '@/users/users'
import Right from '@/components/roles/right'
import Roles from '@/components/roles/roles'
import CateInfon from '@/components/goods/cateInfo'
import GoodCate from '@/components/goods/goodCate'
import GoodsList from '@/components/goods/goodsList'
import AddGoods from '@/components/goods/addgoods'
import Goods from '@/components/goods/goods'
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
          path: 'rights',
          component: Right
        },
        {
          name: 'rolesList',
          path: 'roles',
          component: Roles
        },
        {
          name: 'cateInfon',
          path: 'params',
          component: CateInfon
        },
        {
          name: 'goodCate',
          path: 'categories',
          component: GoodCate
        },
        {
          name: 'goods',
          path: 'goods',
          component: Goods,
          redirect: 'goods/goodslist',
          children: [
            {
              name: 'goodsList',
              path: 'goodslist',
              component: GoodsList
            },
            {
              name: 'addgoods',
              path: 'addgoods',
              component: AddGoods
            }
          ]
        }
      ]
    }
  ]
})
export default router
