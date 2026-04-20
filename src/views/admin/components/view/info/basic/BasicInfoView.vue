<template>
  <div class="basic-info-view">
    <template v-if="modelName.toLowerCase() in CustomizeInfoViewStore">
      <component :is="CustomizeInfoViewStore[modelName.toLowerCase()]"
                 :auth="auth" :ignored-field-names="ignoredFieldNames" :model="model" :model-name="modelName"
                 :uri="uri">
        <template #action-bar>
          <slot name="action-bar"/>
        </template>
      </component>
    </template>
    <template v-else>
      <classic-title-view :title="title||(modelClazz?.note||'').concat('详情')">
        <template #action-bar>
          <slot name="action-bar"/>
        </template>
        <div class="basic-info-view-content">
          <el-scrollbar>
            <embed-info-view :auth="auth" :ignored-field-names="ignoredFieldNames" :model="model" :model-name="modelName"
                             :uri="uri" :label-width="labelWidth">
              <template #view>
                <slot name="view"></slot>
              </template>
            </embed-info-view>
            <div class="empty"></div>
          </el-scrollbar>
        </div>
      </classic-title-view>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref, watch} from "vue"
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import {ElScrollbar} from "element-plus";
import {uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";
import EmbedInfoView from "@/views/admin/components/view/info/embed/EmbedInfoView.vue";
import CustomizeInfoViewStore from "@/views/admin/components/view/info/basic/CustomizeInfoViewStore.ts";

const props = defineProps<{
  modelName: string,
  ignoredFieldNames?: string,
  model: any,
  uri?: string,
  auth?: string,
  labelWidth?: string,
  title?: string
}>();
const modelClazz = ref<th4.admin.ui.Clazz>()

watch(() => props.modelName, () => {
  uiModelViewLayout(props.modelName).then(clazz => {
    modelClazz.value = clazz;
  })
}, {immediate: true})
</script>
<style lang="scss" scoped>
.basic-info-view {
  width: 100%;
  height: 100%;

  .basic-info-view-content {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    margin-bottom: 40px;

    .empty {
      width: 100%;
      height: 100px;
    }
  }
}
</style>