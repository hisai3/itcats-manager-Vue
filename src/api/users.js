import axios from '@/utils/axios.js'
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
