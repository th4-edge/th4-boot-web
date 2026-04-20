namespace th4.map{
    interface InfoWindow extends EventManager{

        /**
         * 是否打开
         */
        isOpen():boolean;

        /**
         *
         * @param overlay
         * @param position
         */
        open(overlay:th4.map.Overlay<any>,position?:any);

        /**
         *
         */
        close();
    }
}