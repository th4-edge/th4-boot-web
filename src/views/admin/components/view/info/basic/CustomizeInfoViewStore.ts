/***
 * This file is responsible for dynamically importing all the form-item components
 * and storing them in a dictionary.
 * This is done to avoid the need to manually import each form-item component in the
 * main.ts file.
 *  支持手工指定项目路径，自动导入所有form-item组件
 *
 *  /modelName/form-item/fieldNameFormItem.vue
 */
import {defineAsyncComponent} from "vue";

const customizeInfoViewStore: any = {};
(() => {
    const files: any = import.meta.glob(
        "@/views/**/info-view/*InfoView.vue"
    );
    for (const key in files) {
        const dir = key.split('/');
        try {
            customizeInfoViewStore[dir[dir.length - 3].toLowerCase()] = defineAsyncComponent(files[key]);
        } catch (e) {
        }
    }
})()
export default customizeInfoViewStore;