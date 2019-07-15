import axios from '@/utils/axios.js'

// 获取所有用户角色
export const getAllUserRole = () => {
  return axios({
    url: 'roles'
  })
}
// 添加用户角色
export const addRole = obj => {
  return axios({
    url: 'roles',
    method: 'post',
    data: obj
  })
}

// 删除用户角色
export const delRole = id => {
  return axios({
    url: `roles/${id}`,
    method: 'delete',
  })
}
