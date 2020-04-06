<template>
  <div>
    <!-- 按钮 -->
    <div style="background: #fff;padding: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="addProduct">新增产品</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="id" label="id" width="50" align="center"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="100" align="center"></el-table-column>
      <el-table-column prop="cityName" label="出发城市" width="80" align="center"></el-table-column>
      <el-table-column prop="departureTimeStr" label="出发时间" width="160" align="center"></el-table-column>
      <el-table-column prop="productPrice" label="产品价格" width="80" align="center"></el-table-column>
      <el-table-column prop="productDesc" label="产品描述" width="640" align="center"></el-table-column>
      <el-table-column prop="productStatusStr" label="状态" width="60" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small" @click="toEditorProduct(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  name: "Product",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.findAllProduct();
  },
  methods: {
    // handleClick(row) {
    //   console.log(row);
    // },
    //查询出所有产品
    findAllProduct() {
      request({
        url: "/product/findAll"
      }).then(res => {
        //console.log(res);
        this.tableData = res.data;
      });
    },
    //添加产品
    addProduct() {
      // console.log('--------')
      this.$router.push("/product/editor"); //路由跳转
    },
    //删除产品
    deleteProduct(row) {
      // console.log(row.id);
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          request({
            url: "/product/delete",
            params: {
              id: row.id
            }
          }).then(res => {
          //回调一下初始化钩子函数
            this.$message({
              showClose: true, //可以手动关闭
              message: res.message,
              type: "success"
            });
          //删除成功时，重载数据
          this.findAllProduct()
          })
      }).catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    //编辑产品
    toEditorProduct(row) {
      //console.log(row);
      this.$router.push({
        path: "/product/editor",
        query: row
      });
    },
  }
};
</script>

<style scoped>
</style>
