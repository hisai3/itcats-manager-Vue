import axios from '@/utils/axios.js'

// 获取所有分类
export const getCategoriesList = () => {
  return axios({
    url: 'categories'
  })
}
