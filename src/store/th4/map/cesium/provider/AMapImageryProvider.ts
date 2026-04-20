import * as Cesium from 'cesium';
import {CoordinateTransformer} from "@/store/th4/map/CoordinateTransformer.ts";

class AMapMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {


    constructor() {
        super();

        let projection = new Cesium.WebMercatorProjection();

        this.projection.project =  (cartographic:  Cesium.Cartographic)=> {
            let gcj02:any = CoordinateTransformer.WGS84ToGCJ02(
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude)
            );
            return projection.project(new Cesium.Cartographic(Cesium.Math.toRadians(gcj02[0]), Cesium.Math.toRadians(gcj02[1])));
            //return new Cesium.Cartesian2(result.x, result.y);
        };

        this.projection.unproject = function (cartesian: any, result: any) {
            let cartographic = projection.unproject(cartesian);
            result = CoordinateTransformer.GCJ02ToWGS84(
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude)
            );
            return new Cesium.Cartographic(Cesium.Math.toRadians(result[0]), Cesium.Math.toRadians(result[1]));
        };
    }
}


// const MapStyle:any={
//     Image:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
//     Vec:'https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&ltype=3&x={x}&y={y}&z={z}',
//     Road:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&ltype=11&x={x}&y={y}&z={z}',
//     VecLabel:'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
//     RoadLabel:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
// }
const MapStyle:any={
    Image:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
    Vec:'https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&ltype=3&x={x}&y={y}&z={z}',
    Road:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&ltype=11&x={x}&y={y}&z={z}',
    VecLabel:'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    RoadLabel:'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
}



export class AMapImageryProvider implements th4.map.ImageryProvider{
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
        // 高德地图在线切片服务器地址模板

// 创建高德地图影像提供者
        let imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: MapStyle[style.key]||MapStyle.Image,
            credit: '高德地图',
            // 其他配置参数，如最小、最大缩放级别等
            minimumLevel: 1,
            maximumLevel: 18,
            tilingScheme:new AMapMercatorTilingScheme()
        });

        this.viewer.scene.globe.baseColor = new Cesium.Color(0.0, 0.0, 0.0, 0)

// 将高德地图影像层添加到Cesium Viewer中
        this.viewer.imageryLayers.addImageryProvider(imageryProvider);
        // this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        //     url: MapStyle.Road,
        //     credit: '高德地图',
        //     // 其他配置参数，如最小、最大缩放级别等
        //     minimumLevel: 1,
        //     maximumLevel: 18,
        //     tilingScheme:new AMapMercatorTilingScheme()
        // }));
    }
}