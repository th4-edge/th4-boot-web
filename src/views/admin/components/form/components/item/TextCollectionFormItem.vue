<template>
  <el-form-item :label="formItem.label" :prop="props.formItem.property">
    <div class="input-group-container">
      <div v-for="index in formModel[props.formItem.property].length" v-if="formModel[props.formItem.property]"
           class="input-group-wrapper">
        <el-input v-model="formModel[props.formItem.property][index-1]" :class="{'m-t-5': index > 1}" class="input-item"
                  :placeholder="props.formItem.describe||'请输入'.concat(props.formItem.label)" type="text"
                  @blur="validItem(formModel[props.formItem.property][index-1],index)"></el-input>
        <div :class="{'m-t-5': index > 1}" class="icon-plus"
             @click.stop="formModel[props.formItem.property].splice(index-1, 1)">
          <el-icon>
            <Delete/>
          </el-icon>
        </div>
        <div v-if="!showPlus&&index==formModel[props.formItem.property].length" :class="{'m-t-5': index > 1}"
             class="icon-plus" @click.stop="showPlus = true">
          <el-icon>
            <Plus/>
          </el-icon>
        </div>
      </div>
      <div v-if="!formModel[props.formItem.property]||formModel[props.formItem.property].length==0||showPlus"
           :class="{'m-t-5': formModel[props.formItem.property]&&formModel[props.formItem.property].length>0}"
           class="input-group-wrapper">
        <el-input  v-model="itemValue" class="input-item" :placeholder="props.formItem.describe||'请输入'.concat(props.formItem.label)" :rows="formItem.lob?6:1" :type="formItem.lob?'textarea':'text'"
                  @blur="addItem"></el-input>
        <span class="example" v-if="props.formItem.example">{{props.formItem.example}}</span>
      </div>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {ElFormItem, ElIcon, ElInput} from "element-plus";
import {computed, defineModel, defineProps, ref} from "vue";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const itemValue = ref<string>('');
const showPlus = ref<boolean>(false)
const addItem = () => {
  if (itemValue.value && itemValue.value.trim() != '') {
    if (!formModel.value[props.formItem.property]) {
      formModel.value[props.formItem.property] = []
    }
    if (formModel.value[props.formItem.property].indexOf(itemValue.value) < 0) {
      formModel.value[props.formItem.property].push(itemValue.value)
    }

    itemValue.value = ''
    showPlus.value = false
  }
}
const validItem = (item: string, index: number) => {
  if (item.trim() == '') {
    formModel.value[props.formItem.property].splice(index - 1, 1)
  }
}
const width = computed(() => {
  let width = 300;
  if (props.formItem.lob) {
    width = 700;
  }
  if (props.formItem.rule?.max) {

    if (props.formItem.rule.max >= 128) {
      width = 480
    }
    if (props.formItem.rule.max >= 64) {
      width = 360
    }
  }
  //if(formItemContainer.value?.$el.offsetWidth>width){
  return width + 'px';
})
</script>
<style lang="scss" scoped>
.input-group-container {
  .input-group-wrapper {
    display: flex;

    .input-item {
      width: v-bind(width);
      --el-component-size: 36px;
      --el-border-radius-base: 8px;
      --el-input-focus-border-color: var(--el-color-primary);;
    }
    .example{
      margin-left: 10px;
      color: #AAAAAA;
      font-size: 12px;
    }
    .icon-plus {
      margin-left: 10px;
      width: 18px;
      height: 34px;
      align-items: center;
      background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
      background-image: none;
      border-radius: 8px;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      cursor: pointer;
      display: inline-flex;
      justify-content: start;
      padding: 1px 12px;
      transform: translateZ(0);
      transition: var(--el-transition-box-shadow);
      color: var(--el-text-color-regular);

      &:hover {
        color: var(--el-color-primary);
        box-shadow: 0 0 0 1px var(--el-color-primary) inset;
      }
    }


  }

  .m-t-5 {
    margin-top: 5px;
  }
}

</style>