<template>
  <div>
    <!-- 按钮，返回到上一个页面 -->
    <div style="background: #fff;padding: 10px;margin-bottom: 10px">
        <el-button style="text" @click="back" type="primary">返回</el-button>
    </div>
    <!-- 表单提交 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="产品名称" width="50">
        <el-input v-model="form.productName"></el-input>
      </el-form-item>
      <el-form-item label="目的城市" width="50">
        <el-input v-model="form.cityName"></el-input>
      </el-form-item>
      <el-form-item label="产品价格" width="50">
        <el-input v-model="form.productPrice"></el-input>
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input type="textarea" v-model="form.productDesc"></el-input>
      </el-form-item>
      <el-form-item label="产品状态">
        <el-select v-model="form.productStatus" placeholder="请选择活动区域">
          <el-option label="开启" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import qs from 'querystring'    //可以将json格式数据转化为字符串形式
export default {
  name: "Editor",
  methods: {
    back() {
      this.$router.go(-1); //返回上一级目录
    },
    onSubmit() {
    //   console.log('------');
    //数据交互，发送请求到后端
    request({
      url: '/product/saveOrUpdate',
      method: 'post',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"   //设置查询字符串的请求头
      },
      data: qs.stringify(this.form)
    }).then((result) => {
      this.$message({
        showClose: true,    //可以手动关闭
        message: result.message,
        type: 'success'
      });
      //跳转到产品首页
      this.back()
    })
    // .catch((err) => {
    // //   console.log(err);
    //   this.$message({
    //     showClose: true,
    //     message: err.message,
    //     type: 'error'
    //   });
    // });
    // console.log(this.form)
    }
  },
  //初始化钩子函数，页面加载时赋上表单数据
  created() {
    this.form = this.$route.query
  },
  data() {
      return {
          form: {}
      }
  }
};
</script>
<style scoped>
</style>