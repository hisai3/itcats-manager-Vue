<template>
  <el-table :data="rightData" border style="width: 100%">
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="authName" label="权限" width="180"></el-table-column>
    <el-table-column prop="path" label="路径" width="180"></el-table-column>
    <el-table-column label="层级">
        <template slot-scope="scope">
            <span>{{scope.row.level | tranLevel}}</span>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 引入right.js
import { getRightInfo } from '@/api/right.js'
export default {
  // 过滤层级
  filters: {
    tranLevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      rightData: []
    }
  },
  methods: {
    // 初始页面数据
    init () {
    // 发送请求获取right数据
      getRightInfo('list')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rightData = res.data.data
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '服务器异常，请重试'
          })
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
