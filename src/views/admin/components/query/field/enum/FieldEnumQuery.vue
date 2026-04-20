
<template>
  <div class="field-enum-query">
    <el-radio-group v-model="queryable[props.propertyName.concat('Eq')]" @change="change">
      <el-radio-button label="全部" value=""/>
      <template v-for="item in enums">
        <el-radio-button :value="item.key">{{item.name}}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts">
import {ref, defineProps, defineModel, onMounted, nextTick} from 'vue';
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";

const enums=ref<th4.framework.Enumerated<any>[]>();
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData:Function
}>()
const emit=defineEmits<{'selected':[item:th4.framework.Enumerated<any>|undefined]}>()
const change=(value:string)=>{
  emit('selected',enums.value?.filter(item=>item.key==value)[0]);
  nextTick(()=>{
    props.loadData()
  })

}
onMounted(()=>{
  queryable.value[props.propertyName.concat('Eq')]=""
  modelEnums(props.modelName,props.propertyName).then(data=>{
    enums.value=data;
  })
})
</script>


<style scoped lang="scss">
.field-enum-query {
  display: flex;
  align-items: center;
}
</style>