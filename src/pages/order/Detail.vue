<template>
  <div>
    <!-- {{order}} -->
    <div style="background: #fff;padding: 10px;margin-bottom: 10px">
      <el-button style="text" @click="back" type="primary">返回</el-button>
    </div>
    <div>
      <h4>订单信息</h4>
      <el-table :data="order" stripe style="width: 100%">
        <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
        <el-table-column prop="orderTimeStr" label="下单时间" width="200" align="center"></el-table-column>
        <el-table-column prop="product.productName" label="产品名称" width="150" align="center"></el-table-column>
        <el-table-column prop="product.cityName" label="目的城市" width="300" align="center"></el-table-column>
        <el-table-column prop="product.departureTimeStr" label="出发时间" width="250" align="center"></el-table-column>
        <el-table-column prop="peopleCount" label="出游人数" width="200" align="center"></el-table-column>
      </el-table>
    </div>
    <div>
      <h4>游客信息</h4>
      <el-table :data="travellers" stripe style="width: 100%">
        <el-table-column prop="travellerTypeStr" label="人群" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="150" align="center"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码" width="300" align="center"></el-table-column>
        <el-table-column prop="credentialsTypeStr" label="证件类型" width="250" align="center"></el-table-column>
        <el-table-column prop="credentialsNum" label="证件号码" width="300" align="center"></el-table-column>
      </el-table>
    </div>
    <div>
      <h4>联系人信息</h4>
      <el-table :data="members" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column prop="nickName" label="别名" width="200" align="center"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码" width="350" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="350" align="center"></el-table-column>
      </el-table>
    </div>
    <div>
      <h4>费用信息</h4>
      <el-table :data="order" stripe style="width: 100%">
        <el-table-column prop="payTypeStr" label="支付方式" width="600" align="center"></el-table-column>
        <el-table-column prop="product.productPrice" label="金额" width="600" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  data() {
    return {
      travellers: [],
      members: [],
      order: []
    };
  },
  created() {
    this.travellers = this.$route.query.travellers,
    this.members.push(this.$route.query.member);
    this.order.push(this.$route.query)
    //this.travellers = this.$route.query.travellers
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
</style>