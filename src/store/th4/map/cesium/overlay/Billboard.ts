import {CesiumOverlay} from "@/store/th4/map/cesium/overlay/CesiumOverlay.ts";
import * as Cesium from 'cesium';

export class Billboard<Data extends th4.map.overlay.Data> extends CesiumOverlay<Data>{

    protected _billboardEntity:Cesium.Entity;

    constructor(_data:Data,option?:any) {
        super(_data,option);
        this._billboardEntity=new Cesium.Entity({
            id:this._id,
            position:Cesium.Cartesian3.fromDegrees(this._data.coordinate.longitude, this._data.coordinate.latitude),
            billboard:{
                image: '/theme/map/billboard/Police.png',
                width:46,
                height:46,
                ...this._option
            }
        })
        this._init();
    }

    protected _init() {
        super._init();
        this.component.push(this._billboardEntity)
    }

    protected _update() {
        if(this._billboardEntity.position){
            //this._billboardEntity.billboard

            // @ts-ignore
            this._billboardEntity.position= Cesium.Cartesian3.fromDegrees(this._data.coordinate.longitude, this._data.coordinate.latitude)
        }
    }
}