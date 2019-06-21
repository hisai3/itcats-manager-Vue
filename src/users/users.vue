<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        style="width: 300px;margin-right: 20px;"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>成功按钮</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%;margin-top: 15px;">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="状态"  width="120">
        <template slot-scope="scope">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleEdit(scope.row)"></el-button>
          <el-button
          type="success"
          icon="el-icon-share"
          size="mini"
          @click="handleEdit(scope.row)"></el-button>
          <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
         @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum-0"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize-0"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0">
    </el-pagination>
  </div>
</template>
<script>
// 引入user.js
import { getAllUsersInfo } from '@/api/users.js'
export default {
  data () {
    return {
      total: '',
      value2: true,
      query: '',
      pagenum: '1',
      pagesize: '2',
      input3: '',
      tableData: []
    }
  },
  methods: {
    handleEdit (row) {
      console.log(row)
    },
    handleDelete (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(val)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.pagenum = val
      this.init()
    },
    init () {
      // 发送请求获取用户列表数据
      getAllUsersInfo({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          this.tableData = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less">
</style>
