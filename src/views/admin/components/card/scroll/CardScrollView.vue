<template>
  <div class="card-scroll-view">
    <div class="card-scroll-view-pagination">
      <template v-if="slots['query']">
        <div class="query-bar-box">
          <div class="query-slot-box">
            <slot
              name="query"
              :queryable="queryable"
              :load-data="
                () => {
                  resetPage()
                  loadData()
                }
              "
            />
          </div>
          <div class="pagination-box">
            <template v-if="data.length > 0">
              共
              <span>{{ page.totalElements }}</span>
              条记录
            </template>
            <template v-else></template>
          </div>
        </div>
      </template>
      <template v-else>
        <template v-if="slots['pagination']">
          <slot name="pagination" />
        </template>
        <template v-else>
          <div class="pagination-box">
            <template v-if="data.length > 0">
              共
              <span>{{ data.length }}</span>
              条记录
            </template>
            <template v-else></template>
          </div>
        </template>
      </template>
    </div>
    <div
      class="card-scroll-view-content"
      :infinite-scroll-disabled="page.last"
      :infinite-scroll-distance="200"
      :infinite-scroll-immediate="true"
      v-infinite-scroll="scrollLoad"
    >
      <template v-if="data && data.length > 0">
        <template v-for="model in data">
          <template v-if="$slots && $slots['model-card']">
            <slot name="model-card" :model="model" />
          </template>
          <template v-else-if="$slots">
            <basic-model-card
              :model="model"
              :selected="
                selected &&
                modelClazz &&
                selected[modelClazz.idField.property] ===
                  model[modelClazz.idField.property]
              "
              :setting="setting"
              @selected="onSelected"
              @fireUpdate="fireUpdate"
              @fireDelete="fireDelete"
            >
              <template v-if="$slots['model-card-icon']" #card-icon="{ model }">
                <slot name="model-card-icon" :model="model" />
              </template>
            </basic-model-card>
          </template>
        </template>
        <div class="tips">
          <template v-if="page.last">我是有底线的</template>
          <template v-else>正在加载</template>
        </div>
      </template>
      <template v-else>
        <template v-if="$slots && $slots['empty']">
          <slot name="empty"></slot>
        </template>
        <template v-else>
          <el-empty  />
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, useSlots, watch } from 'vue'
import { modelPage } from '@/store/th4/framework/service/api/API.ts'
import BasicModelCard from '@/views/admin/components/card/scroll/BasicModelCard.vue'
import { uiModelViewLayout } from '@/store/th4/admin/ui/api/API.ts'

const props = defineProps<{
  selection?: boolean
  highlightCurrentRow?: boolean
  autoLoad?: boolean
  modelName: string
  queryable?: Record<string, any>
  sortable?: Record<string, any>
  keyword?: string
  ignoreTableField?: string
  ignoreTableColumn?: string[]
  uri?: string
  auth?: string
  setting?: {
    status?: string | Function
    icon?: string | Function
    name?: string | Function
    title?: string | Function
    dateTime?: string | Function
    desc?: string | Function
    tip?: string | Function
    tipColor?: string | Function
    tipContent?: string
    colors?: Record<string, string>
  }
}>()
//
const slots = useSlots()
const modelClazz = ref<th4.admin.ui.Clazz>()
//
const data = ref<any[]>([])
const selected = ref<any>()
const page = ref<th4.framework.Page<any>>({
  first: true,
  last: false,
  number: 1,
  size: 10,
  totalElements: 0,
  totalPages: 1,
  content: []
})
//分页
const pageable = ref<{ page: number; size: number }>({
  page: 1,
  size: 10
})
//
const queryable = ref<Record<string, string>>({})
//排序
const sortable = ref<Record<string, string>>({})

const emit = defineEmits<{
  selected: [any]
  fireUpdate: [any]
  fireDelete: [any, Function]
}>()

const fireUpdate = (row: any) => {
  emit('fireUpdate', row)
}
const fireDelete = (row: any) => {
  emit('fireDelete', row, () => {
    resetPage()
    loadData()
  })
}
const onSelected = (model: any) => {
  if (model) {
    selected.value = model
    emit('selected', selected.value)
  }
}
const loadData = () => {
  modelPage(
    props.modelName,
    {
      keyword: props.keyword?.trim(),
      ...pageable.value,
      ...sortable.value,
      ...queryable.value,
      ...props.queryable,
      ...props.sortable
    },
    props.uri,
    props.auth
  ).then((thePage: th4.framework.Page<any>) => {
    page.value = thePage
    data.value.push(...thePage.content)
  })
}
const resetPage = () => {
  pageable.value.page = 1
  data.value = []
  selected.value = undefined
  emit('selected', selected.value)
}
const scrollLoad = () => {
  if (!page.value.last) {
    pageable.value.page = pageable.value.page + 1
    loadData()
  }
}
const loadViewLayout = () => {
  uiModelViewLayout(props.modelName).then((clazz) => {
    modelClazz.value = clazz
  })
}
defineExpose({
  loadData: () => {
    resetPage()
    loadData()
  }
})
watch(
  () => props.keyword,
  () => {
    resetPage()
    loadData()
  }
)
watch(
  () => props.modelName,
  () => {
    loadViewLayout()
    if (props.autoLoad) {
      resetPage()
      loadData()
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.card-scroll-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .card-scroll-view-pagination {
    width: 100%;
    height: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
    box-sizing: border-box;
    .query-bar-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .query-slot-box {
        display: flex;
        font-size: 14px;
        font-weight: normal;
        line-height: 14px;
        letter-spacing: 0;
        /* 主要文字 1F2D3D */
        color: #1f2d3d;
      }
    }
    .pagination-box {
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      letter-spacing: 0;
      /* 主要文字 1F2D3D */
      color: #1f2d3d;
      span {
        font-weight: bold;
      }
    }
  }
  .card-scroll-view-content {
    overflow: auto;
    height: calc(100% - 24px - 24px - 24px - 24px - 10px);
    box-sizing: border-box;
    // padding-right: 20px;
    .tips {
      padding-top: 10px;
      height: 24px;
      box-sizing: border-box;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #86909c;
    }
  }
}
</style>
