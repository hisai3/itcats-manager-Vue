import axios from '@/utils/axios.js'
// 获取所有权限
export const getRightInfo = type => {
  return axios({
    url: `rights/${type}`
  })
}
// 删除角色指定权限
export const delRightById = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 分配角色指定权限
export const grantRightById = (roleid, rids) => {
  return axios({
    url: `roles/${roleid}/rights`,
    method: 'post',
    data: { rids }
  })
}

// 获取左侧菜单权限
export const getLeftMenu = () => {
  return axios({
    url: `menus`
  })
}
