<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
     <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
     </el-input>
     <el-button class="searBtn1" icon="el-icon-search"></el-button>
     <!-- 添加用户 -->
     <el-button @click="showAddDialog" type="primary" class="addBtn">添加用户</el-button>
     <!-- 表格 -->
      <el-table
    :data="userList"
    stripe
    style="width: 100%">
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <!-- 用作用域插槽可以获取到  row  colunm  $index  store   -->
        <template>
          <el-switch @change="changeState(obj.row.id,obj.row.mg_state)" v-model="obj.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="{row}">
          <!-- 编辑按钮 -->
          <el-button @click="showEditDialog(row)" type="primary" icon="el-icon-edit" plain size="small"></el-button>
          <!-- 删除按钮 -->
          <el-button @click="delUser(row.id)" type="danger" icon="el-icon-delete" plain size="small"></el-button>
           <el-button @click="showAssignDialog(row)" type="success" icon="el-icon-check" plain size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  // 先渲染页面
  creates () {
    this.getUserList()
  },
  data () {
    return {
      userList: [],
      query: '',
      pagenum: 1, // 当前页
      pagesize: 2, // 每页条数
      total: 0,
      dialogVisible: false
    }
  },
  /* 首先渲染出表格数据 */
  methods: {
    async getUserList () {
      const { data, meta } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.userList = data.users
        this.total = data.total
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 处理每页条数变化
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    // 处理当前页的变化
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()
    },
    async changeState (id, flag) {
      const { meta } = await this.$axios.put(`users/${id}/state/${flag}`)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    },
    showAddDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.users{
  .input-with-select{
    width: 300px;
    margin-bottom: 10px;
    border-radius: 0;
  }
  .searBtn1{
    border-left:0;
    border-radius: 0;
  }
  .addBtn{
    margin-left: 10px;
  }
}
</style>
