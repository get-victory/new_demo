<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        欢迎光临~~<a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu

        default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
          <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
            <!-- 标题 -->
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <!-- 展开的内容 -->
            <el-menu-item :index="item.path" v-for="item in menu.children" :key="item.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.slice(1).split('-')[0]
    }
  },
  methods: {
    logout () {
      // 推出前先学问下
      this.$confirm('亲，确定要退出吗？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        // 确定退出，销毁本地token
        localStorage.removeItem('token')
        // 跳转到登录页
        this.$router.push('/login')
      }).catch(e => {
        console.log(e)
      })
    }
  },
  async created () {
    const { data, meta } = await this.$axios.get('menus')
    if (meta.status === 200) {
      this.menuList = data
    } else {
      this.$message.error(meta.msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
  .el-header{
    background-color: #d8d8d8;
    display: flex;
    .logo{
      width: 180px;
      img{
        height: 40px;
        margin: 10px;
      }
    }
    .title{
      flex: 1;
      text-align: center;
     h1{
        height: 60px;
      line-height: 60px;
      color:#545c64 ;
     }
    }
    .logout{
      width: 180px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      font-weight: 700;
      a{
        color:orange;
      }
    }
  }
}
.el-aside{
  background-color: #545c64;
  .el-menu{
    border: none;
  }
}
</style>>
