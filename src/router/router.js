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

var router =  new VueRouter({
    routes:[
        {name: 'login',path: '/login',component: Login},
        {name: 'admin',path: '/admin',component: Admin,children:[...goods]}
    ]
})

router.beforeEach((to, from, next) => {
   
    //调用后台接口，判断是否登录
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
        
        var islogin = false;

        if(res.data.code == 'logined'){
            islogin = true;
        }

        //访问登录页面，判断是否登录
        //如果登录=>直接调转到后台首页
        if(to.name == 'login'){
            if(islogin){
                next({name:'admin'});
            }else{
                next();
            }
        }

        //访问后台页面
        //如果登录过，直接访问，
        //如果没有登录，调到登录页面
        if(to.name != 'login'){
            if(islogin){
                next();
            }else{

                // query用来设置url中的查询字符串, 我们这里把用户要访问的页面地址通过query记录下来
                //next下一步要访问的页面, to.fullPath:要访问的目标页面的全路径
                // 将来用户登陆成功后, 再自动跳回这个地址
                next({name:'login', query:{next:to.fullPath}});
            }
        }

    })
    
})

export default router;