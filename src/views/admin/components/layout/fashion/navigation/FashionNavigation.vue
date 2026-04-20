<template>
  <div class="fashion-navigation">
    <div class="navigation-content">
      <slot name="menu" :menus="menus" :role="role" :menuClick="handleMenuClick">
        <div class="menu-list">
          <div 
            v-for="item in menus" 
            :key="item.id"
            class="menu-item"
            :class="{ 'active': menu?.id === item.id }"
            @click="handleMenuClick(item)"
          >
            <div class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="menu-text">{{ item.name }}</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const props=defineProps<{
  user?: th4.admin.system.User;
  menu?: th4.admin.system.Menu;
  menus?: th4.admin.system.Menu[];
  role?: th4.admin.system.Role;
}>();

const emit=defineEmits<{
  (e: 'menu-click', menu: th4.admin.system.Menu): void;
}>();

const handleMenuClick = (menu: th4.admin.system.Menu) => {
  emit('menu-click', menu);
};
</script>
<style lang="scss" scoped>
.fashion-navigation {
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  box-sizing: border-box;
  
  .navigation-content {
    padding: 16px;
    
    .menu-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #f3f4f6;
          transform: translateX(4px);
        }
        
        &.active {
          background: linear-gradient(135deg, #3b82f6 0%, #16a34a 100%);
          color: white;
          
          .menu-icon svg {
            color: white;
          }
        }
        
        .menu-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          svg {
            color: #6b7280;
            transition: color 0.3s ease;
          }
        }
        
        .menu-text {
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
        }
      }
    }
  }
}
</style>