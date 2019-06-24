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
        v-model="userKey"
        class="input-with-select"
        style="width: 300px;margin-right: 20px;"
        @keyup.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="addUserFormVisible = true">添加用户</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%;margin-top: 15px;">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateStatus(scope.row.id,$event)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-share" size="mini" @click="grant(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum-0"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize-0"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0"
    ></el-pagination>
    <!-- 添加用户 弹框 -->
    <el-dialog title="添加用户" :visible.sync="addUserFormVisible">
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="120px">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="120px">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserFormVisible">
      <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="editUserForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="120px">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="120px">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户 弹框 -->
    <el-dialog title="分配角色" :visible.sync="grantUserFormVisible">
      <el-form :model="grantUserForm" :rules="rules" ref="grantUserForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="grantUserForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <!-- 下拉列表 -->
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="grantUserForm.rid" placeholder="请选择" @change="changeOption">
          <el-option
            v-for="roles in options"
            :key="roles.id"
            :label="roles.roleName"
            :value="roles.id"
          >
            <span style="float: left">{{ roles.roleName }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ roles.value }}</span> -->
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入user.js
import {
  getAllUsersInfo,
  addNewUser,
  editNewUser,
  deleteUser,
  updateUserStatus,
  grantUserRole
} from '@/api/users.js'
// 引入roles.js
import {
  getAllUserRole
} from '@/api/roles.js'
export default {
  data () {
    return {
      // 分配弹框的显示隐藏
      grantUserFormVisible: false,
      // 分配数据
      grantUserForm: {
        id: '',
        rid: '',
        username: ''
      },
      options: [],
      grantValue: '',
      // 编辑弹框的显示隐藏
      editUserFormVisible: false,
      // 编辑弹框的数据
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 添加弹框的显示隐藏
      addUserFormVisible: false,
      // 添加弹框的数据
      addUserForm: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            message: '请输入合法的邮箱',
            pattern: /\w+[@]\w+[.]\w+/,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            message: '请输入正确的手机号',
            pattern: /^1\d{10}$/,
            trigger: 'blur'
          }
        ]
      },
      total: '',
      value2: true,
      userKey: '',
      pagenum: '1',
      pagesize: '2',
      input3: '',
      tableData: []
    }
  },
  methods: {
    // 分配用户
    grantRole () {
      // 先判断选项框不能为空
      if (!this.grantValue) {
        // 提示用户选择
        this.$message({
          type: 'error',
          message: '请选择角色'
        })
        // 阻止分配
        return
      }
      // 调用grantUserRole
      grantUserRole(this.grantUserForm.id, this.grantUserForm.rid)
        .then(res => {
          if (res.data.meta.status === 200) {
          // 分配成功提示 关掉弹框
            this.grantUserFormVisible = false
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
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
    // 加载分配用户的数据
    grant (obj) {
      this.grantUserFormVisible = true
      this.grantUserForm.username = obj.username
      this.grantUserForm.id = obj.id
      this.grantUserForm.rid = obj.rid
    },
    // 获取当前分配用户的选项
    changeOption (value) {
      this.grantUserForm.rid = value
      console.log(this.grantUserForm.rid)
    },
    // 更新用户状态
    updateStatus (id, type) {
      // 发送请求更新
      updateUserStatus(id, type)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'danger',
              message: res.data.meta.msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'danger',
            message: 'err'
          })
        })
    },
    // 添加新用户
    addUser () {
      // 验证是否通过
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          // 发送请求添加
          addNewUser(this.addUserForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                // 退出添加弹框
                this.addUserFormVisible = false
                // 提示添加成功
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                // 表单元素的数据重置
                this.$refs.addUserForm.resetFields()
                this.init()
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'err'
              })
            })
        } else {
          return false
        }
      })
    },
    // 单击编辑弹出对话框，加载默认数据
    handleEdit (obj) {
      // 显示弹框
      console.log(obj)
      this.editUserFormVisible = true
      // 获取队应的用户信息
      this.editUserForm.id = obj.id
      this.editUserForm.username = obj.username
      this.editUserForm.email = obj.email
      this.editUserForm.mobile = obj.mobile
    },
    // 编辑
    editUser () {
      // 验证是否通过
      this.$refs.editUserForm.validate(valid => {
        if (valid) {
          // 发送请求编辑
          editNewUser(this.editUserForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                // 退出编辑弹框
                this.editUserFormVisible = false
                // 提示编辑成功
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                // 表单元素的数据重置
                this.$refs.editUserForm.resetFields()
                this.init()
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'err'
              })
            })
        } else {
          return false
        }
      })
    },
    // 单击删除弹出对话框，加载默认数据
    // 显示删除弹窗
    delUser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确认发送请求删除数据
          deleteUser(id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                // 刷新
                this.init()
              } else {
                this.$message({
                  type: 'danger',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'danger',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.init()
    },
    init () {
      // 发送请求获取用户列表数据
      getAllUsersInfo({
        query: this.userKey,
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
    // 获取所有用户角色数据
    getAllUserRole()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.options = res.data.data
          console.log(res)
          console.log(this.options)
        } else {

        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less">
</style>
