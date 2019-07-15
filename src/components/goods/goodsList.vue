<template>
  <div class="goodsList">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索 -->
      <div style="margin-top: 15px;">
        <el-input
          placeholder="请输入内容"
          v-model="userKey"
          class="input-with-select"
          style="width: 300px;margin-right: 20px;"
          @keyup.enter.native="init"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push({name:'addgoods'})">添加商品</el-button>
      </div>
      <!-- 列表 -->
      <el-table
      :data="goodList"
      style="width: 100%">
      <el-table-column
       type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="价格"
        width="80">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="重量">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="添加日期">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>
<script>
import { getGoodsList } from '@/api/goods'
export default {
  data () {
    return {
      goodList: [],
      userKey: '',
      pagenum: '1',
      pagesize: '10'
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 初始化页面
    init () {
      // 请求商品列表数据
      getGoodsList({
        query: this.userKey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          if (res.data.meta.status === 200) {
            this.goodList = res.data.data.goods
          } else {
            this.$message({
              type: 'error',
              message: '服务器异常，请重试'
            })
          }
        })
        .catch(() => {
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
