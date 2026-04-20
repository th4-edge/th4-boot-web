import Config from './config';
import * as Cesium from 'cesium';
import {Cartesian2} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import {Orientation} from "@/store/th4/map/cesium/camera/Orientation.ts";
import {AbstractEventManager} from "@/store/th4/map/AbstractEventManager.ts";
import {MapEvent} from "@/store/th4/map/MapEvent.ts";
import {OverlayEvent} from "@/store/th4/map/OverlayEvent.ts";
import {AMapImageryProvider} from "@/store/th4/map/cesium/provider/AMapImageryProvider.ts";
import {BMapImageryProvider} from "@/store/th4/map/cesium/provider/BMapImageryProvider.ts";


const ImageryProvider: any = {
    AMap: AMapImageryProvider,
    BMap: BMapImageryProvider,
    Cesium: undefined,
}

/**
 * cesium 地图渲染实例
 * @author SoMit
 */
export class CesiumMap extends AbstractEventManager implements th4.map.Map {

    static {
        //window.CESIUM_BASE_URL = '/cesium/Build/CesiumUnminified/';
        Cesium.Ion.defaultAccessToken = Config.token;
    }
    /**
     * 地图渲染组件的容器
     */
    protected container: HTMLDivElement;

    /**
     * 地图渲染参数
     */
    protected option: th4.map.MapOption;
    /**
     * 地图渲染组件
     */
    protected viewer: Cesium.Viewer;
    /***
     * 地图渲染组件的覆盖物
     */
    protected overlays: th4.map.Overlay<any> [];

    /**
     * 鼠标上次悬浮的组件对象,
     * 通过设定上次鼠标悬浮的组件对象变换，实现鼠标移入、移出时间
     * @protected
     */
    protected lastMouseOverlay: th4.map.Overlay<any> | undefined;
    /**
     * 事件处理器
     * @protected
     */
    protected eventHandler: Cesium.ScreenSpaceEventHandler;

    /**
     * 弹窗
     * @protected
     */
    protected _infoWindow: th4.map.InfoWindow | undefined;

    /**
     * 创建地图示例
     * @param container 地图渲染组件的容器
     * @param data 地图对象
     * @param option 地图渲染配置
     */
    constructor(container: HTMLDivElement | string, data: th4.gis.Map, option?: th4.map.MapOption) {
        super();
        this.container = container instanceof HTMLDivElement ? container : document.getElementById(container as string) as HTMLDivElement;
        this.option = option || {};
        this.overlays = [];
        this._data = data;
        this.viewer = new Cesium.Viewer(this.container, {
            ...Config.mapOption, ...this.option, ...{
                sceneMode: data.mode.name == '3D' ? Cesium.SceneMode.SCENE3D : Cesium.SceneMode.SCENE2D,
                //baseLayerPicker: false,
                //geocoder: false,
                //imageryProvider: false, // 不使用默认的影像提供者
                //minimumZoomDistance: 100000

            }
        });
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
            75.0, // 东
            0.0, // 南
            140.0, // 西
            60.0 // 北
        );
        // 初始化底图
        if (this.data.imageryProvider) {
            if (ImageryProvider[this.data.imageryProvider.key]) {
                this._imageryProvider = new ImageryProvider[this.data.imageryProvider.key](this.viewer, this.data)
            }
        }

        //注册事件
        this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        // 隐藏版权信息
        // @ts-ignore
        this.viewer.cesiumWidget.creditContainer.style.display = "none";
        //this.viewer.imageryLayers.get(0).show = false;
        // this.viewer.scene.debugShowFramesPerSecond = true;
        // this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.viewer.scene.skyBox = new Cesium.SkyBox({
            sources: {
                positiveX: "/theme/map/sky/bg.png",
                negativeX: "/theme/map/sky/bg.png",
                positiveY: "/theme/map/sky/bg.png",
                negativeY: "/theme/map/sky/bg.png",
                positiveZ: "/theme/map/sky/bg.png",
                negativeZ: "/theme/map/sky/bg.png",
            },
            show: false,
        });
        // this.viewer.scene.skyAtmosphere=new Cesium.SkyAtmosphere({
        //     // 使用立方体贴图文件路径
        //     cubemap: new Cesium.SkyAtmosphere.fromImages([
        //         'path/to/your/right.jpg',
        //         'path/to/your/left.jpg',
        //         'path/to/your/top.jpg',
        //         'path/to/your/bottom.jpg',
        //         'path/to/your/back.jpg',
        //         'path/to/your/front.jpg'
        //     ])
        // })
        this.viewer.scene.screenSpaceCameraController.enableCollisionDetection = false
//      Cesium开启地形检测，防止entity随着场景转动产生漂移的情形
        //this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this._orientation = new Orientation(data.orientation.heading, data.orientation.pitch, data.orientation.roll, this.viewer.scene.camera);
        this.viewer.camera.flyTo({
            // duration: 10,
            destination: Cesium.Cartesian3.fromDegrees(data.center.longitude, data.center.latitude, data.height),
            orientation: {
                heading: Cesium.Math.toRadians(data.orientation.heading),
                pitch: Cesium.Math.toRadians(data.orientation.pitch),
                roll: Cesium.Math.toRadians(data.orientation.roll)
            }
        })


        this.init();
    }

    /**
     * 地图渲染配置
     */
    protected _data: th4.gis.Map;

    get data(): any {
        return this._data;
    }

    /**
     * 底图
     * @protected
     */
    protected _imageryProvider: th4.map.ImageryProvider | undefined;

    get imageryProvider(): th4.map.ImageryProvider | undefined {
        return this._imageryProvider;
    }

    /***
     * 地图渲染组件的相机方向
     */
    protected _orientation: th4.map.camera.Orientation;

    get orientation(): th4.map.camera.Orientation {
        return this._orientation;
    }

    get map(): any {
        return this.viewer;
    }

    /**
     * 销毁地图示例
     */
    destroy(): void {
        this.viewer.destroy();
    }

    getCenter(): { longitude: number; latitude: number } {
        const cartographic = Cesium.Cartographic.fromCartesian(this.viewer.camera.position);
        return {
            longitude: Cesium.Math.toDegrees(cartographic.longitude),
            latitude: Cesium.Math.toDegrees(cartographic.latitude)
        }
    }

    getHeight(): number {
        return Cesium.Cartographic.fromCartesian(this.viewer.camera.position).height
    }

    zoomIn(): void {
        if (this.viewer.scene.mode == Cesium.SceneMode.SCENE3D) {
            this.viewer.scene.camera.flyTo({
                destination: this._loadCameraPosition(),
                orientation: {
                    heading: this._orientation.heading,
                    pitch: this._orientation.pitch,
                    roll: this._orientation.roll,
                },
                duration: 0.5,
                convert: false,
            });
        } else {
            this.viewer.camera.zoomIn(this.viewer.scene.camera.positionCartographic.height * 0.5);
        }
    }

    zoomOut(): void {
        if (this.viewer.scene.mode == Cesium.SceneMode.SCENE3D) {
            this.viewer.scene.camera.flyTo({
                destination: this._loadCameraPosition(-1),
                orientation: {
                    heading: this._orientation.heading,
                    pitch: this._orientation.pitch,
                    roll: this._orientation.roll,
                },
                duration: 0.5,
                convert: false,
            });
        } else {
            this.viewer.camera.zoomOut(this.viewer.scene.camera.positionCartographic.height * 0.5);
        }
    }

    /**
     * 加载覆盖物
     * @param overlay 覆盖物
     */
    addOverlay(overlay: th4.map.Overlay<any>) {
        // 判断是否存在相同的覆盖物
        if (!this.overlays.some(item => item.id == overlay.id)) {
            overlay.component.forEach(item => {
                if (item instanceof Cesium.DataSourceCollection) {
                    for (let index = 0; index < item.length; index++) {
                        this.viewer.dataSources.add(item.get(index));
                    }
                } else if (item instanceof Cesium.Entity||item instanceof Cesium.EntityCollection) {
                    this.viewer.entities.add(item);
                    //this.viewer.scene.primitives.add(overlay.component)
                } else if (
                    item instanceof Cesium.Primitive ||
                    item instanceof Cesium.LabelCollection ||
                    item instanceof Cesium.BillboardCollection
                ) {
                    this.viewer.scene.primitives.add(item)

                } else {
                    this.viewer.entities.add(item)
                }
            })
            if (!overlay.getInfoWindow()) {
                this._infoWindow && overlay.setInfoWindow(this._infoWindow);
            }
            this.overlays.push(overlay);
            this._emit(MapEvent.AddOverlay,overlay)
        } else {
            console.warn(`覆盖物${overlay.id}已存在`)
        }
    }

    /**
     * 移除覆盖物
     * @param overlay 覆盖物
     */
    removeOverlay(overlay: th4.map.Overlay<any>) {
        const index = this.overlays.findIndex(item => item.id == overlay.id);
        if (index >= 0) {
            this.overlays.splice(index, 1);
            this._emit(MapEvent.RemoveOverlay,overlay)
        }
        overlay.destroy();
    }

    setInfoWindow(infoWindow: th4.map.InfoWindow) {
        this._infoWindow = infoWindow;
    }

    getInfoWindow(): th4.map.InfoWindow | undefined {
        return this._infoWindow;
    }

    /**
     * 地图初始化
     */
    protected init(): void {
        this.viewer.camera.changed.addEventListener(() => {
            const camera = {
                height: this.viewer.camera.positionCartographic.height,
                zoom: Math.round(-40467.74 + (40487.57 + 40467.74) / (1 + Math.pow(Math.ceil(this.viewer.camera.positionCartographic.height) / 91610.74, 0.00007096758)))
            }
            this._emit(MapEvent.Zoom, camera)
            this.update(camera);
        });
        // 点击事件
        this.eventHandler.setInputAction((movement: { position: Cartesian2 }) => {
            const pickedObject = this.viewer.scene.pick(movement.position);
            const cartesian = this.viewer.scene.camera.pickEllipsoid(movement.position, this.viewer.scene.globe.ellipsoid);
            const cartographic = cartesian ? Cesium.Cartographic.fromCartesian(cartesian) : undefined;
            const position = {
                position: movement.position,
                coordinate: {
                    longitude: cartographic ? Cesium.Math.toDegrees(cartographic.longitude) : undefined,
                    latitude: cartographic ? Cesium.Math.toDegrees(cartographic.latitude) : undefined
                }
            }
            if (Cesium.defined(pickedObject)) {
                this.overlays.forEach(overlay => {
                    if (pickedObject.id?.id == overlay.id||pickedObject.id == overlay.id) {
                        overlay._emit(OverlayEvent.Click, pickedObject, position);
                    }
                })
            } else {
                this._emit(MapEvent.Click, this, position);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.eventHandler.setInputAction((movement: { startPosition: Cartesian2, endPosition: Cartesian2 }) => {
            const pickedObject = this.viewer.scene.pick(movement.endPosition);
            if (pickedObject?.id) {
                this.overlays.forEach(overlay => {
                    if (pickedObject.id?.id == overlay.id||pickedObject.id == overlay.id) {
                        if (this.lastMouseOverlay?.id != overlay.id) {
                            if (this.lastMouseOverlay) {
                                this.lastMouseOverlay._emit(OverlayEvent.MOUSE_OUT, this.lastMouseOverlay)
                            }
                            this.lastMouseOverlay = overlay;
                            overlay._emit(OverlayEvent.MOUSE_ENTER, pickedObject);
                            this.viewer.scene.canvas.style.cursor = "pointer";
                        }
                    } else {
                        if (this.lastMouseOverlay) {
                            this.lastMouseOverlay._emit(OverlayEvent.MOUSE_OUT, this.lastMouseOverlay)
                            this.lastMouseOverlay = undefined;
                        }
                        this.viewer.scene.canvas.style.cursor = "default";
                    }
                })
            } else {
                this.viewer.scene.canvas.style.cursor = "default";
                if (this.lastMouseOverlay) {
                    this.lastMouseOverlay._emit(OverlayEvent.MOUSE_OUT, this.lastMouseOverlay)
                    this.lastMouseOverlay = undefined;
                }
                this._emit(MapEvent.MOUSE_MOVE, this);
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    /**
     * 更新地图覆盖物
     * @param camera 相机参数
     * @protected
     */
    protected update(camera: { height: number, zoom: number }): void {
        this.overlays.forEach(overlay => {
            overlay.update(camera);
        });
    }

    /***
     * 加载相机位置
     */
    protected _loadCameraPosition(scalar: number = 0.5) {
        const ray = new Cesium.Ray(this.viewer.scene.camera.positionWC, this.viewer.scene.camera.directionWC);
        const intersections = Cesium.IntersectionTests.rayEllipsoid(ray, Cesium.Ellipsoid.WGS84);
        // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
        // the focal point.
        const cartesian3Scratch = new Cesium.Cartesian3();
        const direction = Cesium.Cartesian3.subtract(
            intersections ? Cesium.Ray.getPoint(ray, intersections.start) : Cesium.IntersectionTests.grazingAltitudeLocation(ray, Cesium.Ellipsoid.WGS84),
            this.viewer.camera.position,
            cartesian3Scratch,
        );
        const movementVector = Cesium.Cartesian3.multiplyByScalar(
            direction,
            scalar,
            cartesian3Scratch,
        );
        return Cesium.Cartesian3.add(this.viewer.camera.position, movementVector, cartesian3Scratch);
    }
}