/***
 * This file is responsible for dynamically importing all the form-item components
 * and storing them in a dictionary.
 * This is done to avoid the need to manually import each form-item component in the
 * main.ts file.
 *  支持手工指定项目路径，自动导入所有info-item组件
 *
 *  /modelName/info-item/fieldNameInfoItem.vue
 */
import {defineAsyncComponent} from "vue";

const customizeInfoItemStore: any = {};
(() => {
    const files: any = import.meta.glob(
        "@/views/**/info-item/*InfoItem.vue"
    );
    for (const key in files) {
        const dir = key.split('/');
        try {
            customizeInfoItemStore[dir[dir.length - 3].concat(dir[dir.length - 1].replace('InfoItem.vue', '')).toLowerCase()] = defineAsyncComponent(files[key]);
        } catch (e) {
        }
    }
})()
export default customizeInfoItemStore;