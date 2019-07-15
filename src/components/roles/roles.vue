<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain @click="addFormVisible=true">添加角色</el-button>
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
                v-if="first.children.length"
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
          <el-row>
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
            <el-button size="mini" type="info" icon="el-icon-edit" @click="editRole(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="授权" placement="top">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-share"
              @click="showGrant(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权弹框 -->
    <el-dialog title="角色授权" :visible.sync="grantFormVisible">
      <!-- 树状 -->
      <el-tree
        class="tree"
        ref="tree"
        :data="rightData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedArr"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmGrant()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色弹框 -->
    <el-dialog title="添加角色" :visible.sync="addFormVisible">
  <el-form :model="addForm" label-width="120px" ref="addForm">
    <el-form-item label="角色名称" >
      <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAddRole">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
// 引入roles.js
import { getAllUserRole, addRole, delRole } from '@/api/roles.js'
import { delRightById, getRightInfo, grantRightById } from '@/api/right.js'
export default {
  data () {
    return {
      // 显示隐藏添加角色弹框
      addFormVisible: false,
      // 添加角色数据
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      // 授权弹框显示隐藏
      grantFormVisible: false,
      // 授权弹框的默认数据
      rightData: [],
      // 默认选中
      checkedArr: [],
      // 默认展开项
      expandedArr: [],
      // 选项内容和下级选项
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色id
      roleId: '',
      rolesData: []
    }
  },
  methods: {
    // 显示隐藏删除弹框
     del(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // 发送请求删除
          delRole(row.id)
          .then(res => {
            if(res.data.meta.status===200){
              this.$message({
                type:'success',
                message:res.data.meta.msg
              })
              this.init()
            }else{
                this.$message({
                type:'error',
                message:res.data.meta.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    // 添加角色
    confirmAddRole () {
      // 发送请求添加角色
      addRole(this.addForm)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            // 弹框消失
            this.addFormVisible = false
            // 清空输入框
            this.$refs.addForm.resetFields()
            // 刷新
            this.init()
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
    },
    editRole (row) {
      console.log(row)
    },
    // 初始化页面
    init () {
      // 发送请求 获取所有的roles信息
      getAllUserRole()
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rolesData = res.data.data
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
    },
    // 扩展区域的关闭标签
    handleClose (row, rightId) {
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
    },
    // 加载授权信息
    showGrant (row) {
      // 显示授权弹框
      this.grantFormVisible = true
      this.roleId = row.id
      // 清空上次的默认项
      this.checkedArr.length = 0
      this.expandedArr.length = 0
      // 展开 并选中当前角色所有的权限选项
      row.children.forEach(first => {
        if (first.children.length > 0) {
          // 遍历二级权限
          this.expandedArr.push(first.id)
          first.children.forEach(second => {
            if (second.children.length > 0) {
              // 遍历三级权限
              this.expandedArr.push(second.id)
              second.children.forEach(third => {
                this.checkedArr.push(third.id)
                this.expandedArr.push(third.id)
              })
            }
          })
        }
      })
      getRightInfo('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rightData = res.data.data
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '服务器异常，请重试'
          })
        })
    },
    // 确认提交授权
    confirmGrant () {
      // 获取当前权限选项的id
      var rights = this.$refs.tree.getCheckedNodes()

      var rightsId = rights.map(item => {
        return item.id + ',' + item.pid
      })
      console.log(rightsId)
      console.log(rightsId.join(',').split(','))
      var ids = [...new Set(rightsId.join(',').split(','))]
      console.log(ids)
      // 发送请求确认更改
      grantRightById(this.roleId, ids.join(','))
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            // 弹框隐藏
            this.grantFormVisible = false
            // 刷新数据 小标签
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
.tree {
  height: 300px;
  overflow: scroll;
}
</style>
