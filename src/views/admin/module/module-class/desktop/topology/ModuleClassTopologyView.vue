<template>
  <div class="module-class-topology-view">
    <div ref="graphContainer" class="graph-container"></div>
    <div class="graph-mask"></div>
    <el-drawer v-model="saveDrawerVisible">
      <embed-save-view model-name="relation-ship" :data="{source:moduleClass}" @form-submit="formSubmit"/>
    </el-drawer>
    <el-drawer v-model="updateDrawerVisible">
      <embed-update-view model-name="relation-ship" v-model:formModel="formModel"  @form-submit="formSubmit"/>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref, shallowRef, watch} from "vue";
import {ElMessageBox} from "element-plus";
import {Topology} from "@/views/admin/module/module-class/desktop/topology/Topology.ts";
import {modelDelete, modelList} from "@/store/th4/framework/service/api/API.ts";
import EmbedSaveView from "@/views/admin/components/view/save/embed/EmbedSaveView.vue";
import EmbedUpdateView from "@/views/admin/components/view/update/embed/EmbedUpdateView.vue";


const moduleClass=defineModel<th4.admin.module.ModuleClass>('moduleClass',{required:true});
const relationShips=ref<th4.admin.module.RelationShip[]>([])
const topology=shallowRef<Topology<any, any>>();
const graphContainer=ref();
const saveDrawerVisible=ref(false);
const updateDrawerVisible=ref(false);
const formModel=ref<th4.admin.module.RelationShip>();
const loadRelationShip=()=>{
  modelList('relation-ship',{'source.clzIdEq':moduleClass.value.clzId}).then(data=>{
    relationShips.value=data;
  })
}
const formSubmit=()=>{
  loadRelationShip();
  saveDrawerVisible.value=false;
  updateDrawerVisible.value=false;
}
onMounted(()=>{
  nextTick(()=>{
    if(graphContainer.value){
      topology.value=new Topology(graphContainer.value,moduleClass.value);
      topology.value.onNodeEvent('click',(_moduleClass:cmdb.module.ModuleClass,_relationShip?:cmdb.module.RelationShip)=>{
        if(_moduleClass.clzId==moduleClass.value.clzId){
          saveDrawerVisible.value=true
        }else if (_relationShip){
          updateDrawerVisible.value=true;
          // @ts-ignore
         delete _relationShip.target['ship']
          formModel.value=_relationShip;
        }

      })
      topology.value.onLinkEvent('click',(_relationShip:cmdb.module.RelationShip)=>{
        ElMessageBox.confirm('确定要删除模型关联【'+_relationShip.name+'】？', '警告', {type:'warning'}).then(()=>{
          modelDelete('relation-ship',{shipKey:_relationShip.shipKey}).then(()=>{
            loadRelationShip();
          })
        })
      })
      loadRelationShip();
      window.addEventListener('resize', topology.value.resize);
    }
  })
})
watch(()=>relationShips.value,()=>{
  if(relationShips.value&&topology.value){
    if(relationShips.value.length==0){
      topology.value?.setTopology([moduleClass.value],[])
    }else{
      const source=relationShips.value[0].source;
      relationShips.value.forEach(item=>{
        item.source=source;
      })

      topology.value.setTopology(relationShips.value.map(item=>{
        // @ts-ignore
        item.target.ship=item;
        return item.target
      }).concat([source]),relationShips.value)
    }
  }
},{immediate:true})
</script>
<style scoped lang="scss">
.module-class-topology-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .graph-container{
    width: 100%;
    height: 100%;
    :deep(.root){
      fill:  var(--el-color-primary);
      &:hover{
        fill: var(--el-color-primary-light-1);
      }
    }
    :deep(.node){
      fill: #FFA300;
      &:hover{
        fill: #FFC300;
      }
    }
    :deep(.line){
      &:hover{
        stroke: red;
      }
    }
    :deep(.line-text){
      &:hover{
        fill: red;
      }
    }
  }
  .graph-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
:deep(.basic-form-item){
  width: 80%;
}
:deep(.el-form-item__label){
  width: 80px !important;
}
:deep(.input-item){
  width: 360px !important;
}
</style>
<style lang="scss">
</style>