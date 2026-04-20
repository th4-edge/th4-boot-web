import * as Cesium from "cesium";


export class Orientation implements th4.map.camera.Orientation {

    private _heading: number;
    private _pitch: number;
    private _roll: number;
    protected _camera: Cesium.Camera|undefined;
    constructor(heading: number,  pitch: number,
                 roll: number,camera?: Cesium.Camera) {
        this._heading = heading;
        this._pitch = pitch;
        this._roll = roll;
        this._camera = camera;
    }
    /***
     * 修改镜头方向
     *
     */
    update(position?:Cesium.Cartesian3): void {
        this._camera?.flyTo({
            destination:position|| this._camera?.position,
            orientation: {
                heading: Cesium.Math.toRadians(this._heading),
                pitch: Cesium.Math.toRadians(this._pitch),
                roll: Cesium.Math.toRadians(this._roll)
            }
        })

    }

    get heading(): number {
        return this._heading;
    }
    set heading(value: number) {
        this._heading = value;
        this.update();
    }
    get pitch(): number {
        return this._pitch;
    }
    set pitch(value: number) {
        this._pitch = value;
        this.update();
    }
    get roll(): number {
        return this._roll;
    }
    set roll(value: number) {
        this._roll = value;
        this.update();
    }

}