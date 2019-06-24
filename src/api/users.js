// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取可能有的token数据，进行请求头的设置，格式Authorization:token
  var token = localStorage.getItem('itcast_pro_token')
  // console.log(config)
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 用户登录
export const userLogin = data => {
  // 返回promise就不需要传入callback
  return axios({
    method: 'post',
    data: data,
    url: 'login'
  })
}
// 获取用户列表数据
export const getAllUsersInfo = params => {
  // 返回promise就不需要传入callback
  return axios({
    params: params,
    url: 'users'
  })
}
// 添加新用户
export const addNewUser = data => {
  // 返回promise就不需要传入callback
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}
// 跟距id获取用户信息
export const editNewUser = data => {
  // 返回promise就不需要传入callback
  return axios({
    method: 'put',
    url: `users/${data.id}`,
    data
  })
}
// 删除用户
export const deleteUser = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}
// 修改用户状态
export const updateUserStatus = (id, type) => {
  return axios({
    method: 'put',
    url: `users/${id}/state/${type}`
  })
}
// 分配角色
export const grantUserRole = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid: rid }
  })
}
