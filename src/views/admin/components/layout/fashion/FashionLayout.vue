<template>
  <div class="fashion-layout">
    <el-watermark v-if="adminSystemStore.role" :content="adminSystemStore.role.watermark||'th4 Admin'"
                  :font="{color: 'rgba(167, 149, 149, 0.15)'}" class="watermark">
      <div class="fashion-layout-container">
        <fashion-header ref="layoutHeader" :menu="navMenu" :menus="adminSystemStore.menus" :role="adminSystemStore.role"
                        :user="adminSystemStore.user" v-bind="$attrs" @menu-click="navMenuClick">
          <template v-if="slots['title']" #title>
            <slot name="title"></slot>
          </template>
          <template v-if="slots['logo']" #logo>
            <slot name="logo"></slot>
          </template>
          <template v-if="slots['user-info']" #user-info>
            <slot name="user-info"></slot>
          </template>
          <template v-if="slots['header-actions']" #header-actions>
            <slot name="header-actions"></slot>
          </template>
          <template v-if="$slots['user-avatar']" #user-avatar>
            <slot name="user-avatar"></slot>
          </template>
        </fashion-header>
        <div ref="layoutContent" class="fashion-content" @mousemove="splitMove" @mouseup="splitUp">

          <classic-navigation ref="layoutNavigation" :class="{'fashion-navigation-hidden':!menus||!menus.length}"
                              :menu="pathMenu" :menus="menus"
                              :role="adminSystemStore.role" :user="adminSystemStore.user" class="fashion-navigation"
                              @menu-click="pathMenuClick"/>
          <fashion-split ref="layoutSplit" @mousedown="splitDown"/>
          <fashion-container ref="layoutContainer" :layout-config="layoutConfig" :menu="pathMenu"
                             :menus="adminSystemStore.menus" :role="adminSystemStore.role"
                             :root-menu="rootMenu"
                             :user="adminSystemStore.user">
            <template v-if="$slots['component']" #component>
              <slot name="component"></slot>
            </template>
          </fashion-container>
        </div>
      </div>
    </el-watermark>
  </div>
</template>
<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref, useSlots, watch} from "vue";
import {useRouter} from "vue-router";
import {ElWatermark} from "element-plus";
import FashionHeader from "./header/FashionHeader.vue";
import FashionContainer from "./container/FashionContainer.vue";
import FashionSplit from "./split/FashionSplit.vue";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {pxToRem} from "@th4/pxToRem.ts";
import ClassicNavigation from "@/views/admin/components/layout/classic/navigation/ClassicNavigation.vue";

const props = defineProps<{
  layoutConfig?: {
    header?: { height: number },
    navigation?: { width: number, minWidth: number, maxWidth: number },
    split?: { width: number },
    container?: { showIndicator: boolean }
  }
}>()
// refs
const layoutHeader = ref();
const layoutContent = ref();
const layoutNavigation = ref();
const layoutSplit = ref();
const layoutContainer = ref();
const router = useRouter();
const navMenu = ref<th4.admin.system.Menu>();
const pathMenu = ref<th4.admin.system.Menu>();
const rootMenu = ref<th4.admin.system.Menu>();
const menus = ref<th4.admin.system.Menu[]>([]);
const adminSystemStore = useTh4AdminSystem();
const slots = useSlots();
//
const split = ref(false);
// config
const layoutConfig = reactive<{
  header: { height: number },
  navigation: { width: number, minWidth: number, maxWidth: number },
  split: { width: number },
  container: { showIndicator: boolean }
}>({
  header: {
    height: 64
  },
  navigation: {
    width: 200,
    maxWidth: 300,
    minWidth: 200
  },
  split: {
    width: 2
  },
  container: {
    showIndicator: true
  }
  , ...props.layoutConfig
})
const splitMove = (e: MouseEvent) => {
  if (split.value) {
    if (e.clientX <= layoutConfig.navigation.maxWidth && e.clientX >= layoutConfig.navigation.minWidth) {
      layoutConfig.navigation.width = e.clientX;
    }
  }
}
const splitDown = () => {
  split.value = true;
}
const splitUp = () => {
  split.value = false;
}
const pathMenuClick = (_menu: th4.admin.system.Menu) => {
  pathMenu.value = _menu;
  nextTick(() => {
    if (pathMenu.value?.path) {
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
  })
}
const navMenuClick = (_menu: th4.admin.system.Menu) => {
  navMenu.value = _menu;
  nextTick(() => {
    if (navMenu.value?.path) {
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
    menus.value = navMenu.value?.children || [];
    if (navMenu.value?.children && navMenu.value?.children.length > 0) {
      pathMenuClick(navMenu.value.children[0])
    }
  })
}
const initLayout = () => {
  layoutContent.value.style.height = 'calc(100% - '
      + pxToRem(layoutConfig.header.height) + 'rem)';
  layoutHeader.value.$el.style.height = pxToRem(layoutConfig.header.height) + 'rem';
  layoutNavigation.value.$el.style.width = pxToRem(layoutConfig.navigation.width) + 'rem';
  layoutSplit.value.$el.style.width = pxToRem(layoutConfig.split.width) + 'rem';
  layoutContainer.value.$el.style.width = 'calc(100% - '
      + pxToRem(layoutConfig.navigation.width) + 'rem - '
      + pxToRem(layoutConfig.split.width) + 'rem)';
}
onMounted(() => {
  initLayout();
})

watch(() => adminSystemStore.menus, () => {
  navMenuClick(adminSystemStore.menus['Nav'][0])
}, {immediate: true});
watch(() => layoutConfig, () => {
  initLayout();
}, {deep: true});

</script>
<style lang="scss" scoped>

.fashion-layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(to right bottom, oklch(0.546 0.245 262.881) 0%, oklch(0.488 0.243 264.376) 50%, oklch(0.627 0.194 149.214) 100%);


  .watermark {
    width: 100%;
    height: 100%;

    .fashion-layout-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      .fashion-header {
        height: 64px;
      }

      .fashion-content {
        width: 100%;
        height: calc(100% - 64px);
        display: flex;
        flex-direction: row;

        .fashion-navigation-hidden {
          width: 0 !important;
          padding: 0 !important;
        }

        .fashion-navigation {
          width: 260px;
          background-color: #FFFFFF;
          transition: all .8s linear;

          :deep(.el-menu-item.is-active ) {
            background-color: var(--el-color-primary);
            color: #FFFFFF;
            //border-radius: var(--el-border-radius-base);
          }
        }

        .fashion-split {
          width: 2px;
        }

        .fashion-container {
          flex: 1;
          height: 100%;
          overflow: hidden;
        }
      }

    }
  }
}
</style>