<template>
    <div key="dashboard" class="module-class-dashboard-view">
      <div class="module-class-dashboard-header">
        <div class="query-box">
          <field-enum-radio-query :load-data="loadData" :queryable="queryable" model-name="module-class" property-name="status"
                                  size="large"/>
          <keyword-query v-model:keyword="keyword" model-name="module-class"/>
        </div>
        <div class="tool-box">
          <el-button icon="plus" type="primary" @click="fireSave('module-class')">新建模型</el-button>
          <el-button icon="plus" type="primary" @click="fireSave('module-type')">新建类型</el-button>
        </div>
      </div>
      <div class="module-class-dashboard-content">
        <template v-if="moduleTypes&&moduleTypes.length">
          <draggable :list="moduleTypes" handle=".icon-box" item-key="typeId" @end="handleDragEnd">
            <template #item="{element}">
              <module-class-group-view :key="element.typeId"
                                       :module-classes="moduleClasses.filter(moduleClass=>element.typeId==moduleClass.type.typeId)"
                                       :module-type="element"
                                       @delete="fireDelete"
                                       @itemClick="fireItemClick"
                                       @save="fireSave"
                                       @update="fireUpdate"
              />
            </template>
          </draggable>
        </template>
        <template v-else>
          <el-empty description="暂无数据"></el-empty>
        </template>
      </div>

      <el-drawer v-model="drawerSaveVisible" size="640">
        <embed-save-view v-if="drawerSaveModelName" :data="drawerSaveData" :model-name="drawerSaveModelName" style="width: 100%;" @formSubmit="()=>{drawerSaveVisible=false;loadData();}"/>
      </el-drawer>
      <el-drawer v-model="drawerUpdateVisible" size="640">
        <embed-update-view v-if="drawerUpdateModelName"  v-model:form-model="drawerUpdateModel"  :model-name="drawerUpdateModelName" @formSubmit="()=>{drawerUpdateVisible=false;loadData();}"/>
      </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import {onActivated, onMounted, ref, watch} from "vue";
import {ElDrawer, ElMessage, ElMessageBox} from "element-plus";
import FieldEnumRadioQuery from "@/views/admin/components/query/field/enum/FieldEnumRadioQuery.vue";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
import {modelDelete, modelList, modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import ModuleClassGroupView
  from "@/views/admin/module/module-class/dashboard/type-group/ModuleClassGroupView.vue";
import draggable from 'vuedraggable';
import EmbedSaveView from "@/views/admin/components/view/save/embed/EmbedSaveView.vue";
import EmbedUpdateView from "@/views/admin/components/view/update/embed/EmbedUpdateView.vue";

const emit=defineEmits<{'itemClick':[any]}>();

const queryable = ref<Record<string, any>>({})
const keyword = ref<string>('');
const moduleTypes = ref<th4.admin.module.ModuleType[]>([]);
const moduleClasses = ref<th4.admin.module.ModuleClass[]>([]);



const drawerSaveVisible = ref<boolean>(false);
const drawerSaveModelName = ref<string>();
const drawerSaveData = ref<Record<string, any>>({});
//
const drawerUpdateVisible = ref<boolean>(false);
const drawerUpdateModelName = ref<string>();
const drawerUpdateModel=ref<any>();
const loadData = () => {
  modelList('module-type', {priorityAsc: ''}).then(data => {
    moduleTypes.value = data;
  })
  modelList('module-class', {...queryable.value, keyword: keyword.value}).then(data => {
    moduleClasses.value = data;
  })
}
const fireItemClick = (moduleClass: { name: string, type: { typeId: number } }) => {
  emit('itemClick',moduleClass)
}
const fireSave = (modelName: string, data?: any) => {
  drawerSaveModelName.value = modelName;
  if (data) {
    drawerSaveData.value = data;
  }
  drawerSaveVisible.value = true;
}
const fireUpdate = (modelName: string, data: any) => {
  drawerUpdateModelName.value = modelName;
  drawerUpdateModel.value=data;
  drawerUpdateVisible.value = true;
}
const fireDelete = (modelName: string, data: any) => {
  ElMessageBox.confirm('确定要删除类型【'+data.name+'】吗？', '警告', { type: 'warning'}).then(() => {
    modelDelete(modelName, data).then(() => {
      ElMessage.info('删除成功')
      loadData();
    })
  })
}
const handleDragEnd = () => {
  moduleTypes.value.forEach((moduleTypeItem, index) => {
    modelUpdate('module-type', {typeId: moduleTypeItem.typeId, priority: index}).then(() => {
      moduleTypeItem.priority = index
    })
  })
}
onActivated(() => {
  loadData();
})
onMounted(() => {
  loadData();
})
watch(() => drawerSaveVisible.value, () => {
  if (!drawerSaveVisible.value) {
    drawerSaveData.value = {}
    drawerSaveModelName.value = ''
  }
})
watch(() => drawerUpdateVisible.value, () => {
  if (!drawerUpdateVisible.value) {
    drawerUpdateModel.value = undefined;
    drawerUpdateModelName.value = ''
  }
})
watch(()=>keyword.value,()=>{
  loadData();
})
</script>
<style lang="scss" scoped>
.module-class-dashboard-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #FFFFFF;
  padding: 10px;

  .module-class-dashboard-header {
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .query-box {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tool-box {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .module-class-dashboard-content {
    width: 100%;
    height: calc(100% - 56px);
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
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