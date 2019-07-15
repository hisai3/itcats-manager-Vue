import axios from '@/utils/axios.js'

// 获取商品列表数据
export const getGoodsList = obj => {
  return axios({
    url: 'goods',
    params: obj
  })
}
