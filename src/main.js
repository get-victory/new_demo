import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* 将axios挂载到vue原型上 */
Vue.prototype.$axios = axios
/* 配置基准地址 */
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
/* 添加请求拦截器 */
axios.interceptors.request.use(function (config) {
  /* 发送请求前统一加token */
  config.headers.Authorization = localStorage.getItem('token')
  return config
  /* 对请求错误做处理 */
}, function (error) {
  return Promise.reject(error)
})
/* 添加响应拦截器 */
axios.interceptors.response.use(function (response) {
  /* 对响应数据做处理 */
  response = response.data
  if (response.meta.status === 401) {
    response.meta.msg = '尊敬的用户，你的登录状态已过期，请重新登录'
    /* 清除无效的token */
    localStorage.removeItem('token')
    /* 拦截到登录 */
    router.push('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
