<template>
  <div>
    <!--导航栏  -->
    <div style="background: #fff;padding: 10px;margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/main'}">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="id" label="订单编号" width="80" align="center"></el-table-column>
      <el-table-column prop="product.productName" label="产品名称" width="150" align="center"></el-table-column>
      <el-table-column prop="product.productPrice" label="金额" width="120" align="center"></el-table-column>
      <el-table-column prop="orderTimeStr" label="下单时间" width="280" align="center"></el-table-column>
      <el-table-column prop="product.departureTimeStr" label="出发时间" width="280" align="center"></el-table-column>
      <el-table-column prop="orderStatusStr" label="订单状态" width="150" align="center"></el-table-column>
      <el-table-column prop="payTypeStr" label="支付方式" width="150" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="60" align="center">
        <template slot-scope="scope">
          <el-button @click="detailClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "Order",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.findAllOrder();
  },
  methods: {
    findAllOrder() {
      request({
        url: "/order/findAll"
      })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    detailClick(row) {
        // console.log(row);
        this.$router.push({
            path: '/order/detail',
            query: row
        })
    }
  }
};
</script>
<style scoped>
</style>