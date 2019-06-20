// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 用户登录
export const userLogin = data => {
  // 返回promise就不需要传入callback
  return axios({
    method: 'post',
    data: data,
    url: 'login'
  })
}
