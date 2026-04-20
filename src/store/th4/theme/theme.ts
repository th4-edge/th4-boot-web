import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * 主题模块
 * @author SoMit
 */
export const useThemeStore=defineStore('th4-theme',()=>{
    // 主题
    const theme = ref('classic') // 默认主题为 light

    return {
        theme
    }
})