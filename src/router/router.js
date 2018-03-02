//引入路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/admin.vue'
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsCategory from '../component/admin/goods/category/Category.vue'
import GoodsComment from '../component/admin/goods/comments/Comment.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'

Vue.use(VueRouter)

const goods=[
    {name: 'goodslist', path: 'goods/list', component: GoodsList},
    {name: 'goodscategory', path: 'goods/category', component: GoodsCategory},
    {name: 'goodscomment', path: 'goods/comment/:id', component: GoodsComment},
    {name: 'goodsdetail', path: 'goods/detail/:id', component: GoodsDetail}
]

export default new VueRouter({
    routes:[
        {name: 'login',path: '/login',component: Login},
        {name: 'admin',path: '/admin',component: Admin,children:[...goods]}
    ]
})
