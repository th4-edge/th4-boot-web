

<template>
  <div class="field-date-select-query">
    <el-select v-model="queryable[props.propertyName.concat('.dateDD')]">
      <template v-for="item in data">
        <el-option :value="item.value">{{item.text}}</el-option>
      </template>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import {ElSelect,ElOption} from "element-plus";
import {defineModel, defineProps,ref} from "vue";
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string
}>()
const data=ref<{text:string,value?:number}[]>([
  {
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
.field-date-select-query{
  display: flex;
  align-items: center;
  .el-select{
    width: 240px;
  }
}
</style>