<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <!-- 菜单的宽度根据折叠状态动态赋值 -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <el-menu
        default-active="1"
        background-color="#001e34"
        text-color="#fff"
        active-text-color="blue"
        unique-opened
        router
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/login">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 左侧菜单栏 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <i class="el-icon-s-fold" @click="collMenu">后台管理系统</i>
        <el-dropdown trigger="click">
          <!-- 这里要用一个盒子包裹在设置样式，直接操作el-dropdown会影响原有的功能 -->
          <div class="user-wrapper">
            <img :src="photo" alt class="home-logo" />
            <span class="user-info">
              您好 {{ userName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 头部 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {

  },
  props: {

  },
  data () {
    return {
      isCollapse: false // 控制菜单是否展开和折叠

    };
  },
  computed: {
    ...mapState(['userName', 'photo'])

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 点击折叠左侧菜单
    collMenu () {
      this.isCollapse = !this.isCollapse;
    },
    // 推出登录
    logout () {
      // 清除本地存储
      window.sessionStorage.clear();
      // 刷新页面清空vuex数据
      window.location.reload();
    }
  }
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-menu {
  //默认是有一个1像素边框，需要去掉
  border: none !important;
  height: 100%;
}
.home-logo {
  height: 30px;
  border-radius: 50%;
}
.user-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
