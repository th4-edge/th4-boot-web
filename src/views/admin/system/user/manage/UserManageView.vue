<template>
  <basic-manage-view model-name="user">
    <template #table-actions="{row}">
      <el-tooltip  content="重置密码">
        <el-button icon="unlock" link @click="fireResetPassword(row)"></el-button>
      </el-tooltip>
    </template>
    <template #query="{loadData,queryable}">
      <field-enum-radio-query model-name="user" property-name="status" :load-data="loadData" :queryable="queryable"/>
    </template>
    <template #tree="{loadData,queryable}">
      <model-tree-query model-name="user" property-name="role" :load-data="loadData" :queryable="queryable"/>
    </template>
  </basic-manage-view>
</template>
<script setup lang="ts">
import BasicManageView from "@/views/admin/components/view/manage/basic/BasicManageView.vue";
import {ElButton, ElMessage, ElMessageBox, ElTooltip} from "element-plus";
import http from "@th4/http.ts";
import FieldEnumRadioQuery from "@/views/admin/components/query/field/enum/FieldEnumRadioQuery.vue";
import ModelTreeQuery from "@/views/admin/components/query/tree/model/ModelTreeQuery.vue";

const fireResetPassword=(row:th4.admin.system.User)=>{
  ElMessageBox.confirm('确定要重置密码吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    http.post('admin/reset-password',{userId:row.userId}).then(() => {
      ElMessage({
        type: 'success',
        message: '重置密码成功'
      })
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消'
    });
  });
}
</script>
<style scoped lang="scss">

</style>