<template>
    <div class="detail">
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">购物商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px" class="detail_form">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>

            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span v-if="item.class_layer != 1">-|</span>
                        <span>{{item.title}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="是否发布">
                <el-switch active-text="是" v-model="form.status"></el-switch>
            </el-form-item>

            <el-form-item label="推荐类型">
                <el-switch active-text="轮播图" v-model="form.is_slide"></el-switch>
                <el-switch active-text="置顶" v-model="form.is_top"></el-switch>
                <el-switch active-text="推荐" v-model="form.is_hot"></el-switch>
            </el-form-item>
         
            <el-form-item label="上传封面">
                <el-upload
                    action="http://127.0.0.1:8899/admin/article/uploadimg"
                    :file-list="form.imgList"
                    :on-success="uploadImg"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="上传附件">
                <el-upload
                    class="upload-demo"
                    action="http://127.0.0.1:8899/admin/article/uploadfile"
                    :on-success="uploadFile"
                    :file-list="form.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            
            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>

            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>
            
            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>
            
            <!-- <el-form-item label="详细内容">
                <el-input type="textarea" v-html="form.content"></el-input>
            </el-form-item> -->

            <template>
                <el-form-item label="详细信息" prop="content">
                    <quill-editor v-model="form.content"></quill-editor>
                </el-form-item>
            </template>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'


    export default {
        data() {
            return {
                //表单数据
                form: {},
                id:this.$route.params.id,//获取地址栏上的id
                category:[]//分类列表数据
            }
        },
        //页面打开就执行，调用
        created () {
            this.goodsDetail();
            this.categoryList();
        },
        methods: {
            //保存按钮
            onSubmit() {
                this.$http.post(this.$api.gsEdit+this.id,this.form).then(res=>{
                    if(res.data.status == 0){
                        this.$alert("保存成功")
                    }
                })
            },
            //获取商品详细信息
            goodsDetail(){
                this.$http.get(this.$api.gsDetail+this.id).then(res=>{
                    if(res.data.status == 0){
                        this.form = res.data.message;

                        // 为了让分类列表默认正确显示, 把商品category_id的数据类型改为number
                        this.form.category_id = +this.form.category_id;
                    }
                })
            },
            //获取分类列表
            categoryList(){
                 this.$http.get(this.$api.ctList + 'goods').then(res=>{
                    if(res.data.status == 0){
                        this.category = res.data.message;
                    }
                })
            },
            uploadImg(data){
                //图片只能上传一张
                
                this.form.imgList = [data];//只能上传一张，把所有都覆盖
                
            },
            uploadFile(data){
                this.form.fileList.push(data);//保存返回的数据，已提供将来上传使用
            }
        },
        //注册子组件（富文本）
        components: {
            quillEditor
        }
    }
</script>

<style scoped lang="less">
    .detail{
        &_form{
            margin-top: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px 300px 10px 10px;
        }
    }
</style>