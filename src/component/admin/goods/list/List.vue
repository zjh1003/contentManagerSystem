<template>
    <div class="list">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物商场</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <hr>

        <!-- 按钮组和搜索框 -->
        <div class="list_btns">
            <el-button icon="el-icon-circle-plus-outline" size="mini" plain>新增</el-button>
            <el-button icon="el-icon-circle-check-outline" @click="selectAll" size="mini" plain>全选</el-button>
            <el-button icon="el-icon-delete" size="mini" @click="del" plain>删除</el-button>
            <div class="list_btns_search">
                <el-input size="mini" v-model="query.searchvalue" @blur="search" placeholder="请输入搜索内容">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>

        <!-- 大表格 -->
         <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">

            <el-table-column
                type="selection"
                width="55">
            </el-table-column>

            <el-table-column label="标题" show-overflow-tooltip>
                <template slot-scope="scope">
                     <el-tooltip class="item" effect="dark"  placement="left">
                         <div slot="content">
                             <img style="width:200px" :src="scope.row.imgurl" alt="图片预览">
                         </div>
                          <router-link style="color:#2a72c5" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">{{ scope.row.title }}</router-link>  
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>

            <el-table-column prop="stock_quantity" label="库存" width="120"></el-table-column>

            <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>

            <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>

            <el-table-column show-overflow-tooltip width="120" label="属性">
                 <template slot-scope="scope">
                     <!-- 轮播图: is_slide -->
                     <span :class="['el-icon-picture', scope.row.is_slide==1?'active':'']"></span>
                     <!-- 置顶: is_top -->
                     <span :class="['el-icon-upload', scope.row.is_top==1?'active':'']"></span>
                     <!-- 热点: is_hot -->
                     <span :class="['el-icon-star-off', scope.row.is_hot==1?'active':'']"></span>
                 </template>
            </el-table-column>

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                     <router-link style="color:#666" :to="{ name:'goodsdetail' }">修改</router-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- total用来设定数据总数, current-page用来设定当前页, page-size用来设定当前每页数量  -->
        <el-pagination
            @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="query.pageIndex"
            :page-sizes="[2,3,4,5,6,7,8]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {

      return {

          //搜索
          query:{
              pageIndex:1,
              pageSize:2,
              searchvalue:'',
              total:''
          },
        //被选择项，
        selectedList:[],

        //表格数据
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    //页面打开自动调用
    created () {
        this.getGoodsData()
    },

    methods: {
        //监听当前页的改变
        handleCurrentChange(page){
            this.query.pageIndex = page;//当前页重新赋值

            this.getGoodsData();//表格重新渲染
        },

        //监听每页的条数的变化
        handleSizeChange(size){
            this.query.pageSize = size;
            this.getGoodsData();
        },

        //全选
        selectAll(){
            document.querySelector('.el-checkbox__original').click();
        },

        //选择项
        handleSelectionChange(selection){
            // console.log(selection);
            this.selectedList = selection;
        },
        
        //删除功能
        del(){

            this.$confirm('您确定要删除选中的数据吗','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                var ids = this.selectedList.map(v=>v.id);
                this.$http.get(this.$api.gsDel+ids).then((res)=>{
                    if(res.data.status == 0){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        });
                        this.getGoodsData();
                    }
                })
            }).catch(()=>{
                      this.$message({
                      type: 'info',
                      message: '已取消删除'
          }); 
                })
        },

       //搜索
       search(){
           this.getGoodsData();
       },

       //获取商品数据
      getGoodsData(){
          var searchdata = `?pageIndex=${this.query.pageIndex}&pageSize=${this.query.pageSize}&searchvalue=${this.query.searchvalue}`
         // console.log(searchdata);
          this.$http.get(this.$api.gsList + searchdata).then((res)=>{
            //   console.log(res.data.message);
            if(res.data.status == 0){
                this.tableData3 = res.data.message;//表格的数据会自动覆盖
                //获取总条数,给分页组件
                this.query.total = res.data.totalcount;
            }
          })
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    }
    }
</script>

<style scoped lang="less">
    .list{
        &_btns{
            margin-top: 10px;
            border:1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            &_search{
                width: 200px;
                float: right;
            }
        }
    }
</style>