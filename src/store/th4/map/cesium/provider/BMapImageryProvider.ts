import * as Cesium from 'cesium';

export class BMapImageryProvider implements th4.map.ImageryProvider{
    /**
     * 地图渲染组件
     */
    protected viewer: Cesium.Viewer;

    protected _style:any;

    constructor(viewer: Cesium.Viewer,data:th4.gis.Map) {
        this.viewer=viewer;
        this.style=data.style;
    }

    get style(): any {
        return this._style
    }

    set style(style: any) {
        this._style=style;
        this.viewer.imageryLayers.removeAll();
        // 百度地图瓦片服务地址模板
        const baiduUrlTemplate = 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1';

        // 创建百度地图影像提供者
        const baiduImageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: baiduUrlTemplate,
            subdomains: ['0', '1', '2', '3'],
            minimumLevel: 3,
            maximumLevel: 18
        });

        // 将百度地图影像图层添加到 Cesium Viewer 中
        this.viewer.imageryLayers.addImageryProvider(baiduImageryProvider);
    }
}