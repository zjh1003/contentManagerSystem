<template>
    <div>
        <el-menu
            
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span>{{item.title}}</span>
            </template>
            
            <el-menu-item index="1-1" v-for="subItem in item.children" :key="subItem.title"  >
                <router-link :to="subItem.path">
                    <i class="el-icon-document"></i>
                    {{subItem.title}}
                </router-link>
            </el-menu-item>
        </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //左侧导航数据
                menu: [
                    { title: '购物商城',
                    children:[
                        { title: '内容管理', path: '/admin/goods/list' },
                        { title: '类别管理', path: '/admin/goods/category' },
                        { title: '评论管理', path: '/admin/goods/comment/:id' }
                    ]},
                    { title: '订单管理',
                    children:[
                        { title: '订单列表', path: '/admin/orderList' }
                    ]}
                ]
            }
        },
    }
</script>

<style scoped>

</style>