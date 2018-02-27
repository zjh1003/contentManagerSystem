import Vue from 'vue'

import App from './component/App.vue'

import vueRouter from './router/router.js'

new Vue({
   el:'#app',
    router:vueRouter,
   render:createElement=> createElement(App)

})