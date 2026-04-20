<template>
  <div class="user-message">
    <el-badge>
      <div class="message">
        <el-icon>
          <BellFilled/>
        </el-icon>
      </div>
    </el-badge>
  </div>
</template>
<script lang="ts" setup>
import {ElBadge, ElIcon} from "element-plus"

</script>
<style lang="scss" scoped>
.user-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80px;
  color: #fff;
  cursor: pointer;

  :deep(.el-badge) {
    --el-badge-bg-color: var(--el-color-danger);
    --el-badge-radius: 10px;
    --el-badge-font-size: 10px;
    --el-badge-padding: 6px;
    --el-badge-size: 12px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: fit-content;
  }

  .message {
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 20px;
  }

  .item {
    margin-top: 10px;
    margin-right: 30px;
  }
}
</style>