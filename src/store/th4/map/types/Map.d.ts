namespace th4.map{
    interface Map extends EventManager{

        /**
         * 获取当前地图视角方向
         */
        get orientation():th4.map.camera.Orientation;

        /**
         * 获取地图原型实例，如百度地图BMapGL.Map、高德地图AMap.Map、cesium地图Cesium.Viewer等
         */
        get map(): any;

        /**
         * 获取地图底图
         */
        get imageryProvider():ImageryProvider|undefined;

        /**
         * 获取数据
         */
        get data():any;

        /***
         * 放大地图
         */
        zoomIn(): void;

        /**
         * 缩小地图
         */
        zoomOut(): void;

        /**
         * 添加覆盖物
         * @param overlay 覆盖物实例
         */
        addOverlay(overlay: Overlay)

        /**
         * 移除覆盖物
         * @param overlay 覆盖物实例
         */
        removeOverlay(overlay: Overlay);

        /**
         * 获取地图中心坐标
         */
        getCenter():{longitude:number,latitude:number};

        /**
         * 获取高度
         */
        getHeight():number;

        /**
         * 设置弹窗
         * @param infoWindow
         */
        setInfoWindow(infoWindow:th4.map.InfoWindow);

        /**
         * 获取弹窗
         */
        getInfoWindow():th4.map.InfoWindow|undefined;

    }
}