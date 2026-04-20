

<template>
  <div class="field-date-radio-query">
    <el-radio-group v-model="queryable[props.propertyName.concat('.dateDD')]" @change="loadData">
      <template v-for="item in data">
        <el-radio-button :value="item.value">{{item.text}}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts">
import {ElRadioButton, ElRadioGroup} from "element-plus";
import {defineModel, defineProps,ref} from "vue";
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData:Function
}>()
const data=ref<{text:string,value?:number}[]>([
  {
    text:'全部',value:undefined,
  },{
  text:'近3月',value:-90,
},{
  text:'近1月',value:-30,
},{
  text:'近7天',value:-7,
},{
  text:'近3天',value:-3,
},{
  text:'昨天',value:-1,
},{
  text:'今天',value:0,
},{
  text:'明天',value:1,
}])
// onMounted(()=>{
//   data.value.forEach(item=>{
//     modelCount(props.modelName,{[props.propertyName.concat('.dateDD')]:item.value}).then(count=>{
//       item.text=item.text.concat('(').concat(count+'').concat(')')
//     })
//   })
// })

</script>
<style scoped lang="scss">
.field-date-radio-query{
  display: flex;
  align-items: center;
}
</style>