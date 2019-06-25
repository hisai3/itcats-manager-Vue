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
              <el-tag
                closable
                type="success"
                @close="handleClose(props.row,first.id)"
                v-if="!first.children.length"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="info"
                    @close="handleClose(props.row,second.id)"
                    v-if="second.children.length"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="third in second.children"
                    :key="third.id"
                    closable
                    type="info"
                    @close="handleClose(props.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24" v-if="!props.row.children.length">暂无授权</el-col>
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
              @click="editRole(scope.row)"
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
import { delRightById } from '@/api/right.js'
export default {
  data () {
    return {
      rolesData: []
    }
  },
  methods: {
    editRole (row) {
      console.log(row)
    },
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
    },
    // 扩展区域的关闭标签
    handleClose (row, rightId) {
      console.log(row, rightId)
      // 发送请求删除对应的权限
      delRightById(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 提示用户删除成功
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            // 刷新当前标签
            row.children = res.data.data
            console.log('==========================')
            console.log(row.children)
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
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
el-tag {
  margin: 5px 5px 0 0;
}
</style>
