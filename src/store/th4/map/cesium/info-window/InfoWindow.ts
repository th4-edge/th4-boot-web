import {AbstractEventManager} from "@/store/th4/map/AbstractEventManager.ts";
import {InfoWindowEvent} from "@/store/th4/map/InfoWindowEvent.ts";
import * as Cesium from "cesium";

export class InfoWindow extends AbstractEventManager implements th4.map.InfoWindow {

    protected _visible: boolean;

    protected _container: HTMLDivElement;

    protected _overlay: th4.map.Overlay<any> | undefined;

    protected _position: any;

    protected viewer: Cesium.Viewer;

    protected _map: th4.map.Map;

    constructor(container: HTMLDivElement, map: th4.map.Map) {
        super();
        this._container = container;
        this._visible = false;
        this._position = undefined;
        this._map = map
        this.viewer = map.map;
        map.setInfoWindow(this);
        this.viewer.scene.postRender.addEventListener(() => {
            this.updatePosition()
        });

    }

    protected _offset: { x: number, y: number } = {x: 0, y: 0}

    get offset(): { x: number, y: number } {
        return this._offset
    }

    set offset(offset: { x: number, y: number }) {
        this._offset = offset;
    }

    close() {
        this._visible = false;
        this._position = undefined;
        this._emit(InfoWindowEvent.Close, this._overlay)
    }

    isOpen(): boolean {
        return this._visible;
    }

    open(overlay: th4.map.Overlay<any>, position?: any) {
        this._overlay = overlay;
        this._visible = true;
        this._position = position;

        if (position) {
            //this.viewer.zoomTo(entity)
            this.viewer.flyTo(this._overlay.component[0],{
                offset:{
                    heading: Cesium.Math.toRadians(this._map.orientation.heading),
                    pitch: Cesium.Math.toRadians(this._map.orientation.pitch),
                    range:0
                }
            }).then(()=>{
                this._emit(InfoWindowEvent.Open, this._overlay, position)
                this.updatePosition();
            })
            // this.viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(position.coordinate.longitude, position.coordinate.latitude, this._map.getHeight()),
            //     orientation: {
            //         heading: Cesium.Math.toRadians(this._map.orientation.heading),
            //         pitch: Cesium.Math.toRadians(this._map.orientation.pitch),
            //         roll: Cesium.Math.toRadians(this._map.orientation.roll)
            //     }
            // })
            //this.viewer.scene.camera.position=Cesium.Cartesian3.fromDegrees(position.coordinate.longitude, position.coordinate.latitude, this._map.getHeight());
        }


    }

    protected updatePosition() {
        if (this._position) {
// 将笛卡尔坐标转换为屏幕坐标
            const canvasPosition = Cesium.SceneTransforms.worldToWindowCoordinates(this.viewer.scene,
                Cesium.Cartesian3.fromRadians(Cesium.Math.toRadians(this._position.coordinate.longitude),
                    Cesium.Math.toRadians(this._position.coordinate.latitude), 0)
            );
            if (canvasPosition) {
                this._container.style.top = (canvasPosition.y + this._offset.y - this._container.offsetHeight) + 'px'
                this._container.style.left = (canvasPosition.x + this._offset.x - this._container.offsetWidth / 2) + 'px'
            }

        }

    }
}