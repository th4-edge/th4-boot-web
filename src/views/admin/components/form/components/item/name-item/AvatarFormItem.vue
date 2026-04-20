<template>
  <el-form-item ref="formItemContainer" :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <div class="avatar-upload-container">
      <!-- 头像预览区域 -->
      <div class="avatar-preview" :class="{ 'uploading': isUploading }">
        <template v-if="formModel&&formModel[buildProps(props.formItem)]">
          <el-image class="avatar-img"
                    :src="`/api/${modelName}/download/${formItem.property}?file=${formModel[buildProps(props.formItem)]}`"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[`/api/${modelName}/download/${formItem.property}?file=${formModel[buildProps(props.formItem)]}`]"
                    show-progress
                    :initial-index="0"
                    fit="cover" />
        <div class="avatar-actions" v-if="!isUploading">
          <button
              class="action-btn upload-btn"
              @click.stop=""
          >
            <el-icon><Download /></el-icon>
          </button>
          <button
              class="action-btn remove-btn"
              @click.stop=""
              :disabled="!formModel[buildProps(props.formItem)]"
          >
            <el-icon><Delete /></el-icon>
          </button>
        </div>
        </template>
        <div v-else class="avatar-placeholder" @click="()=>{fileInput&&fileInput.click()}">
          <i class="icon-upload" ></i>
          <span class="placeholder-text">
            <el-icon><Plus /></el-icon>
          </span>
        </div>
        <!-- 上传中动画 -->
        <div v-if="isUploading" class="uploading-mask">
          <div class="spinner"></div>
        </div>
        <!-- 操作按钮组 -->
      </div>

      <!-- 文件选择输入框 -->
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-input"
          @change="uploadAvatar"
      >

      <!-- 裁剪弹窗 -->
      <!-- 错误提示 -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, ref} from 'vue'

import {ElFormItem, ElMessage,} from 'element-plus'
import {API, TokenHeader} from "@th4/http.config.ts";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import http from "@th4/http.ts";

const formItemContainer = ref<any>()
const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true});
const isUploading=ref<boolean>(false);
const fileInput=ref<HTMLInputElement>();
const errorMessage = ref<string>();
const systemStore = useTh4AdminSystem();
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent && parent.property) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
const uploadAvatar = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  isUploading.value=true;
  const formData = new FormData();
  // 创建一个新的 File 对象，因为 Blob 没有 name 属性
  //const file = new File([blob], rawFile.value.name, { type: rawFile.value.type });
  formData.append(props.formItem.property, file);

  http.post(`${props.modelName}/upload/${props.formItem.property}`, formData,{
    // 可以根据需要添加 headers，如认证信息
    headers: {
      [TokenHeader]:systemStore.token
    }
  }).then(result => {
        formModel.value[buildProps(props.formItem)] = result;
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        isUploading.value = false;
        if(fileInput.value){
          fileInput.value.value = '';
        }
      });

}
// // 验证文件类型
// const validateFileType = (file: File): boolean => {
//   const acceptTypes = props.accept.split(',').map(type => type.trim());
//   return acceptTypes.some(type => {
//     if (type.startsWith('image/') && !type.includes('*')) {
//       return file.type === type;
//     }
//     if (type === 'image/*') {
//       return file.type.startsWith('image/');
//     }
//     if (type.startsWith('.')) {
//       return file.name.toLowerCase().endsWith(type.toLowerCase());
//     }
//     return false;
//   });
// };
// const validateFileSize = (file: File): boolean => {
//   const maxSizeBytes = props.sizeLimit * 1024 * 1024;
//   return file.size <= maxSizeBytes;
// };


</script>

<style lang="scss" scoped>
.avatar-upload-container {
  display: inline-block;
  position: relative;
  .avatar-preview {
    position: relative;
    width: 120px;
    height: 120px;
    cursor: pointer;
    border: 1px dashed var(--el-border-color);
    transition: all 0.3s ease;
    border-radius: 4px;
    overflow: hidden;
    font-size: 24px;
    &:hover {
      border: 1px dashed var(--el-color-primary);
      font-size: 32px;
      font-weight: 800;
    }
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999;
      background-color: #f5f5f5;
      .el-icon{
        transition: all 0.3s ease;
        font-size: inherit;
        font-weight: inherit;
      }
    }
  }
  /* 圆形头像样式 */
  :deep(.circle) .avatar-preview {
    border-radius: 50%;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }



  .placeholder-text {
    margin-top: 8px;
    font-size: 26px;

  }

  /* 操作按钮 */
  .avatar-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 4px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .avatar-preview:hover .avatar-actions {
    opacity: 1;
  }

  .action-btn {
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    color: #333;
    margin: 0 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 12px;
    font-weight: bold;
  }

  .action-btn:hover {
    background-color: #fff;
    transform: scale(1.1);
  }

  .upload-btn {
    color: #42b983;
  }

  .remove-btn {
    color: #f56c6c;
  }

  /* 上传中样式 */
  .uploading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* 文件输入框 */
  .file-input {
    display: none;
  }
}





/* 错误提示 */
.error-message {
  margin-top: 8px;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  padding-top: 4px;
}




.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #333;
  background-color: #f5f5f5;
}

.cropper-content {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.cropper {
  width: 100%;
  max-width: 400px;
  height: 300px;
}

.dialog-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.cancel-btn {
  border: 1px solid #ddd;
  background-color: #fff;
  color: #666;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

.confirm-btn {
  border: none;
  background-color: #42b983;
  color: #fff;
}

.confirm-btn:hover {
  background-color: #359e75;
}

/* 图标样式 */
:deep(.icon-upload),
:deep(.icon-remove),
:deep(.icon-close) {
  font-size: 18px;
}
</style>