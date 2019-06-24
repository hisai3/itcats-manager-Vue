<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain>添加角色</el-button>
    <!-- 角色列表信息 -->
    <el-table :data="rolesData" style="width: 100%">
      <el-table-column type="expand">
        <!-- 拓展区域。。。 -->
        <template slot-scope="props">
          <el-row v-for="first in props.row.children" :key="first.id" style="margin-top:15px">
            <el-col :span="6">
              <el-tag :key="first.authName" closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="6">
                  <el-tag :key="second.authName" closable type="info">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag v-for="third in second.children" :key="third.authName" closable type="info" style="margin:5px 5px 0 0">{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              size="mini"
              type="info"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="授权" placement="top">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-share"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delRole(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入roles.js
import { getAllUserRole } from '@/api/roles.js'
export default {
  data () {
    return {
      rolesData: []
    }
  },
  methods: {
    // 初始化页面
    init () {
      // 发送请求 获取所有的roles信息
      getAllUserRole()
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.rolesData = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
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
<style lang="less" scoped>
</style>
