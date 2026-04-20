<template>
  <div class="retro-layout">
    <el-watermark
      v-if="adminSystemStore.role"
      :content="adminSystemStore.role.watermark || 'th4 Admin'"
      :font="{ color: 'rgba(167, 149, 149, 0.15)' }"
      class="watermark"
    >
      <div class="retro-layout-container">
        <retro-header
          ref="retroHeader"
          :user="adminSystemStore.user"
          :menu="navMenu"
          :menus="adminSystemStore.menus"
          :role="adminSystemStore.role"
          @menu-click="navMenuClick"
        />
        <retro-container
          ref="retroContainer"
          :user="adminSystemStore.user"
          :menu="pathMenu"
          :menus="menus"
          :role="adminSystemStore.role"
          @menu-click="pathMenuClick"/>
        />
      </div>
    </el-watermark>
  </div>
</template>
<script setup lang="ts">
import RetroHeader from '@/views/admin/components/layout/retro/header/RetroHeader.vue'
import RetroContainer from '@/views/admin/components/layout/retro/container/RetroContainer.vue'
import { useRouter } from 'vue-router'
import { useTh4AdminSystem } from '@/store/th4/admin/system/system.ts'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElWatermark } from 'element-plus'
import { pxToRem } from '@th4/pxToRem.ts'

const props = defineProps<{ layoutConfig?: { header?: { height: number } } }>()
const layoutConfig = reactive<{ header: { height: number } }>({
  header: { height: 80, ...props.layoutConfig?.header }
})
const retroHeader = ref()
const retroContainer = ref()
const router = useRouter()
const navMenu = ref<th4.admin.system.Menu>()
const pathMenu = ref<th4.admin.system.Menu>();
const menus = ref<th4.admin.system.Menu[]>([]);
const adminSystemStore = useTh4AdminSystem();
const initLayout = () => {
  retroHeader.value.$el.style.height =
    pxToRem(layoutConfig.header.height) + 'rem'
  retroContainer.value.$el.style.height =
    'calc(100% - ' + pxToRem(layoutConfig.header.height) + 'px)'
}
const pathMenuClick=(_menu:th4.admin.system.Menu)=>{
  pathMenu.value=_menu;
  nextTick(()=>{
    if(pathMenu.value?.path){
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
  })
}
const navMenuClick=(_menu:th4.admin.system.Menu)=>{
  navMenu.value=_menu;
  nextTick(()=>{
    if(navMenu.value?.path){
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
    menus.value=navMenu.value?.children||[];
    if(navMenu.value?.children&&navMenu.value?.children.length>0){
      pathMenuClick(navMenu.value.children[0])
    }

  })
}
onMounted(() => {
  initLayout()
})

watch(
  () => layoutConfig,
  () => {
    initLayout()
  },
  { deep: true }
)
</script>
<style scoped lang="scss">
.retro-layout {
  --retro-layout-backgroud-color: #f4f4f5;
  --retro-layout-header-backgroud: var(--el-color-primary);
  --retro-layout-nav-background: #ffffff;
  --retro-layout-header-title-color: #ffffff;
  --retro-layout-primary-color: var(--el-color-primary);
  :deep(.el-button) {
    --el-border-radius-base: 4px;
  }
  :deep(.input-item) {
    --el-border-radius-base: 4px !important;
    --el-component-size: 40px !important;
    min-height: 40px;
    height: auto;
    width: 100%;
    .el-input {
      width: 260px;
      --el-component-size: 40px !important;
      --el-border-radius-base: 4px !important;
      --el-input-focus-border-color: var(--el-color-primary);
    }
  }

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--retro-layout-backgroud-color);
  .watermark {
    width: 100%;
    height: 100%;
    .retro-layout-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .retro-header {
        width: 100%;
        height: 80px;
      }
      .retro-container {
        width: 100%;
        height: calc(100% - 80px);
      }
    }
  }
}
</style>
