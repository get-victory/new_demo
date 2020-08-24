import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import Roles from '../components/rights/Roles.vue'
import Rights from '../components/rights/Rights.vue'
import Users from '../components/users/Users.vue'
import Goods from '../components/goods/Goods.vue'
import Categories from '../components/categories/Categories.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/users', component: Users },
      { path: '/goods', component: Goods },
      { path: '/categories', component: Categories }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})
/* 所有路由在被访问时，都会先经过全局前置守卫，只有当守卫放行了，才会显示匹配的路由 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
