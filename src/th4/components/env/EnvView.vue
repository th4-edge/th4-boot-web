<template>
  <div class="env-view">
    <div class="env-title-box">
      <div class="env-title">环境</div>
      <div class="tool-box">
        <x-icon name="Plus" @click="drawerVisible=true"/>
        <x-icon name="layout-classic" @click="drawerVisible=true"/>
      </div>
    </div>
    <keyword-query v-model:keyword="keyword" model-name="env" />
    <no-env-card
        :states="states"
        :active-env="activeEnv"
        :active-state="activeState"
        @envStateClick="fireEnvStateClick"
    />
    <div class="env-group">
      <template v-if="envs" v-for="(items, correlate) in envs">
        <template v-if="items && items.length > 0">
          <env-group
              :correlate="correlate"
              :items="items"
              :states="states"
              state-property="state"
              :active-state="activeState"
              @envStateClick="fireEnvStateClick"
          />
        </template>
      </template>
    </div>
  </div>
  <create-env v-model:drawer-visible="drawerVisible" @form-submit="loadEnvs"/>
</template>
<script setup lang="ts">
import KeywordQuery from '@/views/admin/components/query/keyword/KeywordQuery.vue'
import { onMounted, ref, watch } from 'vue'
import {modelEnums, modelList} from "@/store/th4/framework/service/api/API.ts";
import NoEnvCard from "@/views/crm/consultant/customer/console/env/card/NoEnvCard.vue";
import EnvGroup from "@/views/crm/consultant/customer/console/env/card/EnvGroup.vue";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import CreateEnv from "@/views/crm/consultant/customer/console/env/create/CreateEnv.vue";
const props = defineProps<{
  theme?: 'dark' | 'light',
  envName: string,
  activeEnv?: crm.customer.env.Env
  activeState?: th4.framework.Enumerated<string>
}>()
const emits = defineEmits<{
  envStateClick: [th4.framework.Enumerated<string>, crm.customer.env.Env?]
}>()
const states = ref<th4.framework.Enumerated<string>[]>([])
const envs = ref<Record<string, crm.customer.env.Env[]>>({})
const keyword = ref<string>('')
const drawerVisible = ref<boolean>(false);
const fireEnvStateClick = (
    state: th4.framework.Enumerated<string>,
    env?: crm.customer.env.Env
) => {
  emits('envStateClick', state, env)
}

const loadEnvs = () => {
  envs.value = {}
  modelList(props.envName, { keyword: keyword.value },undefined,'auditor').then((data) => {
    data.forEach((env) => {
      if (!(env.correlate in envs.value)) {
        envs.value[env.correlate] = []
      }
      envs.value[env.correlate].push(env)
    })
  })
}
onMounted(() => {
  modelEnums('customer', 'state').then((data) => {
    states.value = data
    if (!props.activeState) {
      emits('envStateClick', data[0])
    }
  })
  loadEnvs()
})
watch(
    () => keyword.value,
    () => {
      loadEnvs()
    }
)

</script>
<style scoped lang="scss">
.env-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 20px;
  /* 纯白 */
  background: #ffffff;
  box-sizing: border-box;
  /* 边框色 */
  border-width: 0 1px 0 0;
  border-style: solid;
  border-color: #e4e4e4;
  .env-title-box {
    width: 100%;
    height: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #1f2d3d;
    box-sizing: border-box;
    .env-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
    }
    .tool-box{
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;
      .x-icon {
        font-size: 12px;
      }
      &:hover{
        color: var(--el-color-primary)
      }
    }


  }
  .keyword-query {
    margin: 20px 20px 20px 0;
    background: #f5f7fa;
  }
  .no-env-card{
    padding-right: 20px;
    box-sizing: border-box;
  }
  .env-group {
    flex: 1;
    padding-right: 10px;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
