import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login/index.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: () =>
        import(/* webpackChunkName: "home" */ './views/Home'),
      children: [{
        path: '',
        name: 'Welecome',
        component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome')
      }]
    },
    {
      path: '*',
      name: 'nopage',
      component: () => import(/* webpackChunkName: "welcome" */ './views/NoPage.vue')
    }
  ]
});

// 加入路由导航守卫控制权限
router.beforeEach((to, form, next) => {
  if (to.path !== '/login') {
    // 取出token确认是否登录
    const token = window.sessionStorage.getItem('token');
    if (!token) { return next('/login'); }
    next();
  }
  next();
});

// 将路由导出
export default router;
