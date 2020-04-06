<template>
  <div>
    <!-- 按钮 -->
    <div class="btns" style="padding:1em;margin-bottom:1em;background:#fff">
      <el-tooltip class="item" effect="dark" content="添加新用户" placement="bottom-start">
        <el-button type="primary" size="small" @click="toAdd">添加</el-button>
      </el-tooltip>
    </div>
    <!-- 用户详情 -->
    <div style="padding:1em;margin-bottom:1em;background:#fff">
      <!-- v-loading="loading" -->
      <el-table :data="users" size="small">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandler(scope.row.id)">移除</el-button>
            <el-button type="text" size="small" @click="toEdit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="toSetRole(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 用户模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <!-- {{form}} -->
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="saveUserHandler">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色模态框 -->
    <el-dialog title="设置角色" :visible.sync="role_visible">
      <el-form :model="user">
        <el-form-item label="用户名" label-width="80px">{{user.username}}</el-form-item>
        <el-form-item label="角色" label-width="80px">
          <el-select v-model="newRoles" multiple placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
          <!-- <el-cascader v-model="newRoles" :options="roles" :props="props" clearable></el-cascader> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="role_visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="setRolesHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from "querystring";
export default {
  name: "User",
  data() {
    return {
      users: [],
      title: "添加用户",
      visible: false,
      form: {},
      user: {},
      roles: [],
      role_visible: false,
      newRoles: [],
      props: { value: "id", label: "roleName", emitPath: false, multiple: true }
    };
  },
  created() {
    this.loadUsers();
    this.loadRoles();
  },
  methods: {
    //加载所有的用户
    loadUsers() {
      request({
        url: "/baseUser/findAll"
      }).then(res => {
        this.users = res.data;
        
      });
    },
    //加载所有的角色
    loadRoles() {
      request({
        url: "/baseRole/findAll"
      }).then(res => {
        this.roles = res.data;
      });
    },
    //跳转到添加用户界面
    toAdd() {
      (this.title = "添加用户"), (this.form = {}), (this.visible = true);
    },
    //添加用户，向后端发送请求
    saveUserHandler() {
      //数据交互，发送请求到后端
      request({
        url: "/baseUser/saveOrUpdate",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded" //设置查询字符串的请求头
        },
        data: qs.stringify(this.form)
      }).then(res => {
        //关闭模态框
        this.visible = false;
        this.$message({
          showClose: true, //可以手动关闭
          message: res.message,
          type: "success"
        });
        //重新加载用户
        this.loadUsers();
      });
    },
    //删除用户
    deleteHandler(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/baseUser/deleteById",
            params: {
              id: id
            }
          }).then(res => {
            //回调一下初始化钩子函数
            this.$message({
              showClose: true, //可以手动关闭
              message: res.message,
              type: "success"
            });
            //删除成功时，重载数据
            this.loadUsers();
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //用户编辑信息
    toEdit(row) {
      this.form = row;
      this.visible = true;
      this.title = "修改用户";
    },
    //去设置用户角色
    toSetRole(row) {
      this.user = row;
      this.role_visible = true;
    },
    //设置角色
    setRolesHandler() {
    //   console.log(this.newRoles);

      for (let i = 0; i < this.newRoles.length; i++) {
        // this.user.roles[i] = this.user.roles[i].id
        this.user.roles[i] = this.newRoles[i]
      }
      console.log(this.user.roles)
      request({
          url: "/baseUser/setRoles",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify({
            userId: this.user.id,
            roleIds: this.user.roles
          })
        }).then(response => {
          this.role_visible = false;
          this.$message({ message: response.message, type: "success" });
          this.loadUsers();
        });
    }
  }
};
</script>
<style scoped>
</style>>