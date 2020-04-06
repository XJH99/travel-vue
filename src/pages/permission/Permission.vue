<template>
  <div>
    <!-- 按钮 -->
    <div class="btns" style="padding:1em;margin-bottom:1em;background:#fff">
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table 
		  :data="privileges" 
		  size="small" 
		  :lazy="true"
		  row-key="id"
		  :load="lazyLoadPrivilege"
		  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="name" label="名称" width="120"></el-table-column>
        <el-table-column prop="route" label="路径"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="操作" align="center" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandler(scope.row.id)">移除</el-button>
            <el-button type="text" size="small" @click="toEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from "querystring";
export default {
  name: "Permission",
  data() {
    return {
      privileges: []
    };
  },
  created() {
    this.loadprivileges();
  },
  methods: {
    loadprivileges() {
      const url = "/basePermission/findPermissionTree";
      request.get(url).then(response => {
        this.foo(response.data);
        this.privileges = response.data;
      });
    },
    foo(privileges) {
      for (const p of privileges) {
        if (p.children && p.children.length === 0) {
          delete p.children;
        } else {
          this.foo(p.children);
        }
      }
    },

    toAdd() {},
    deleteHandler() {},
    toEdit() {}
  }
};
</script>
<style scoped>
</style>