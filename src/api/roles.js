import axios from '@/utils/axios.js'

// 获取所有用户角色
export const getAllUserRole = () => {
  return axios({
    url: 'roles'
  })
}
