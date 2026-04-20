/// <reference types="vite/client" />
declare module 'vue3-print-nb' {
    const install: (app: App) => void
    const print: (options?: PrintOptions) => void
    export default {install, print}
}