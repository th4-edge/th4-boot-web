/***
 * This file is responsible for dynamically importing all the form-item components
 * and storing them in a dictionary.
 * This is done to avoid the need to manually import each form-item component in the
 * main.ts file.
 *  支持手工指定项目路径，自动导入所有table-column组件
 *
 *  /modelName/table-column/fieldNameTableColumn.vue
 */
import {defineAsyncComponent} from "vue";

const customizeTableColumnStore: any = {};
(() => {
    const files: any = import.meta.glob(
        "@/views/**/table-column/*TableColumn.vue"
    );
    for (const key in files) {
        const dir = key.split('/');
        try {
            customizeTableColumnStore[dir[dir.length - 3].concat(dir[dir.length - 1].replace('TableColumn.vue', '')).toLowerCase()] = defineAsyncComponent(files[key]);
        } catch (e) {
        }
    }
})()
export default customizeTableColumnStore;