<template>
  <div
    class="basic-model-card"
    :class="{ selected: selected }"
    @click.stop="onSelected"
  >
    <div
      class="status-box"
      v-if="loadValue(setting.status)"
      :style="{
        backgroundColor: setting.colors[loadValue(setting.status)] || '#67C23A'
      }"
    ></div>
    <div
      class="icon-box"
      v-if="($slots && $slots['card-icon']) || loadValue(setting.icon)"
    >
      <template v-if="$slots && $slots['card-icon']">
        <slot :model="model" name="card-icon"></slot>
      </template>
      <template v-else>
        <template v-if="loadValue(setting.icon)">
          <x-icon :name="loadValue(setting.icon)" />
        </template>
        <template>
          <x-icon name="logo" />
        </template>
      </template>
    </div>
    <div class="content-box">
      <div class="content">
        <div
          v-if="loadValue(setting.tip)"
          class="tip"
          :style="{
            'background-color': setting.tipColor
              ? loadValue(setting.tipColor)
              : '#FFA300'
          }"
        >
          {{ setting.tipContent || loadValue(setting.tip) }}
        </div>
        <div class="title">{{ loadValue(setting.name) }}</div>
        <div class="line" v-if="loadValue(setting.title)"></div>
        <div class="desc">{{ loadValue(setting.title) }}</div>
      </div>
      <div class="bottom">
        {{ loadValue(setting.desc) }}
      </div>
    </div>
    <div class="tool-box">
      <div class="datetime">
        {{ loadValue(setting.dateTime) }}
      </div>
      <div class="tool-group">
        <div class="icon-wrapper" @click.stop="fireUpdate">
          <x-icon name="Edit"  style="cursor: pointer;"/>
        </div>
        <!--        <div class="icon-wrapper">-->
        <!--          <x-icon name="Copy"/>-->
        <!--        </div>-->
        <div class="icon-wrapper" @click.stop="fireDelete">
          <x-icon name="Delete" style="cursor: pointer;"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import XIcon from '@/views/admin/components/icon/XIcon.vue'
import { computed } from 'vue'
const props = defineProps<{
  model: any
  selected?: boolean
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
const setting: {
  status: string | Function
  icon: string | Function
  name: string | Function
  title: string | Function
  dateTime: string | Function
  desc: string | Function
  tip: string | Function
  tipColor?: string | Function
  tipContent?: string
  colors: Record<string, string>
} = {
  status: 'status',
  icon: 'icon',
  name: 'name',
  title: '',
  dateTime: 'dateTime.dateTime',
  desc: '',
  tip: '',
  colors: {},
  ...props.setting
}
const emit = defineEmits<{
  selected: [any]
  fireUpdate: [any]
  fireDelete: [any]
}>()

const fireUpdate = () => {
  emit('fireUpdate', props.model)
}
const fireDelete = () => {
  emit('fireDelete', props.model)
}
const onSelected = () => {
  if (!props.selected) {
    emit('selected', props.model)
  }
}
const loadValue = (fieldName: string | Function) => {
  if (typeof fieldName == 'function') {
    return fieldName(props.model)
  }

  if (fieldName.concat('.')) {
    let fieldValue = props.model
    const fieldNameMapping = fieldName.split('.')
    for (let index = 0; index < fieldNameMapping.length; index++) {
      if (fieldValue) {
        fieldValue = fieldValue[fieldNameMapping[index]]
      } else {
        break
      }
    }
    return fieldValue
  } else {
    return props.model[fieldName]
  }
}
const color = computed<string>(() => {
  return '#67C23A'
})
</script>
<style scoped lang="scss">
.basic-model-card {
  width: 100%;
  height: 88px;
  padding: 16px 12px;
  box-sizing: border-box;
  /* 边框色 */
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #e4e4e4;
  display: flex;
  .status-box {
    width: 5px;
    height: 100%;
    background: v-bind(color);
    margin-right: 12px;
  }
  .icon-box {
    margin-right: 12px;
    width: 56px;
    height: 100%;
    background-size: cover;
    font-size: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-box {
    flex: 1;
    height: 100%;
    font-size: 12px;
    .content {
      width: 100%;
      height: 28px;
      display: flex;
      align-items: center;
      .tip {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: #ffffff;
        /* 橙色 FFA300 */
        height: 28px;
        border-radius: 4px;
        margin-right: 6px;
      }

      .title {
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
        display: flex;
        align-items: center;
        letter-spacing: 0;
        /* 主要文字 1F2D3D */
        color: #1f2d3d;
      }

      .line {
        margin-left: 8px;
        margin-right: 8px;
        width: 1px;
        height: 12px;
        background: #e4e4e4;
      }

      .desc {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0;
        /* 提示文字 86909C */
        color: #86909c;
      }
    }

    .bottom {
      margin-top: 8px;
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      display: flex;
      align-items: center;
      /* 次要 4E5969 */
      color: #4e5969;
    }
  }
  .tool-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    .datetime {
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      display: flex;
      align-items: center;
      /* 次要 4E5969 */
      color: #4e5969;
    }
    .tool-group {
      margin-top: 4px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-wrapper {
        width: 28px;
        height: 28px;
        margin-left: 12px;
        display: none;
        font-size: 14px;
        text-align: center;
        vertical-align: center;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
      }
    }
  }
  &:hover {
    background: rgba(0, 137, 255, 0.08);
    .tool-box {
      .tool-group {
        .icon-wrapper {
          display: flex;
          background: #f5f7fa;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
.selected {
  background: rgba(0, 137, 255, 0.08);
  .tool-box {
    .tool-group {
      .icon-wrapper {
        background: #f5f7fa;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
