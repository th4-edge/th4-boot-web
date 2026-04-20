namespace th4.map{

    /**
     * 底层事件管理器
     */
    interface EventManager{
        /**
         * 注册事件监听器
         * @param event 事件名称
         * @param callback 回调函数
         */
        on(event: string, callback: Function): void;

        /**
         * 注册一次性事件监听器
         * @param event 事件名称
         * @param callback 回调函数
         */
        once(event: string, callback: Function): void;

        /**
         * 注销事件监听器
         * @param event 事件名称
         * @param callback 回调函数
         */
        off(event: string, callback: Function): void;
        /**
         * 触发事件
         * @param event 事件名称
         * @param data 事件数据
         * @param args 其他参数
         */
        _emit(event: string, data: any,args?:any): void;
    }
}