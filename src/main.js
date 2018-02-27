import Vue from 'vue'

import App from './component/App.vue'

import vueRouter from './router/router.js'

//引入element-ui和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用element-ui
Vue.use(ElementUI)

new Vue({
   el:'#app',
    router:vueRouter,
   render:createElement=> createElement(App)

})