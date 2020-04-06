<template>
  <div>
    <!-- 按钮 -->
    <div class="btns" style="padding:1em;margin-bottom:1em;background:#fff">
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <!-- 角色详情 -->
    <div style="padding:1em;margin-bottom:1em;background:#fff">
      <!-- v-loading="loading" -->
      <el-table :data="roles" size="small">
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandler(scope.row.id)">移除</el-button>
            <el-button type="text" size="small" @click="toEdit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="toSetPermission(scope.row)">授权</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 角色模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <!-- {{form}} -->
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="saveRoleHandler">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 授权模态框 -->
    <el-dialog title="授权" :visible.sync="authorization_visible">
      <!-- {{role}} -->
      <el-form :model="role" ref="role" label-width="80px">
        <el-form-item label="角色名称" label-width="80px">
          {{role.roleName}}
        </el-form-item>
        <el-form-item label="权限" label-width="80px">
          <el-cascader-panel v-model="role.permissions" :options="options" :props="props" clearable></el-cascader-panel>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorization_visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="authorizationHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from "querystring";
export default {
  name: "Role",
  data() {
    return {
      roles: [],
      title: "添加角色",
      visible: false,
      form: {},
      role: {},  //当前的角色
      // props: { multiple: true},
      options: [],
      authorization_visible: false,
      props: { multiple: true, label: 'name', emitPath:false, value:'id'}
    };
  },
  created() {
    this.loadRoles();
    this.loadPermissions();
  },
  methods: {
    //加载所有角色
    loadRoles() {
      request({
        url: "/baseRole/findAll"
      }).then(res => {
        res.data.forEach(item => {
          item.permissions = item.permissions.map(p => p.id)
        });
        this.roles = res.data;
      });
    },
    //加载权限树
    loadPermissions() {
      request({
        url: '/basePermission/findPermissionTree'
      }).then(res => {
        this.options = res.data
        //console.log(this.options);
      })
    },
    //打开添加角色模态框
    toAdd() {
      this.visible = true;
      this.title = "添加角色";
      this.form = {};
    },
    //添加角色，向后端发送请求
    saveRoleHandler() {
      //数据交互，发送请求到后端
      request({
        url: "/baseRole/saveOrUpdate",
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
        //重新加载角色
        this.loadRoles();
      });
    },
    deleteHandler(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          request({
            url: "/baseRole/deleteById",
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
            this.loadRoles();
          });
        }).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toEdit(row) {
      this.form = row;
      this.visible = true;
      this.title = "修改角色";
    },
    //打开授权页面
    toSetPermission(row) {
      this.role = row;
      this.authorization_visible = true;
    },
    //角色授权
    authorizationHandler() {
       //数据交互，发送请求到后端
      request({
        url: "/baseRole/authorization",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded" //设置查询字符串的请求头
        },
        data: qs.stringify(this.role)
      }).then(res => {
        //关闭模态框
        this.authorization_visible = false;
        this.$message({
          showClose: true, //可以手动关闭
          message: res.message,
          type: "success"
        });
        //重新加载角色
        this.loadRoles();
      });
    }
  }
};
</script>
