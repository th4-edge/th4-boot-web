import {CesiumOverlay} from "@/store/th4/map/cesium/overlay/CesiumOverlay.ts";
import * as Cesium from 'cesium';

/**
 * 标记文本
 */
export class Label<Data extends th4.map.overlay.Data&{text:string}> extends CesiumOverlay<Data>{

    protected _labelCollection:Cesium.LabelCollection;

    constructor(_data:Data,_option?:any){
        super(_data,_option)
        this._labelCollection=new Cesium.LabelCollection();
        this._init();
    }

    protected _init() {
        this._labelCollection.add({
            text: this._data.text,
            position: Cesium.Cartesian3.fromDegrees(this._data.coordinate.longitude,this._data.coordinate.latitude),
            font: '18px Arial',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            ...this._option
        });
        this._component.push(this._labelCollection);
    }

    protected _update() {
        this._labelCollection.get(0).position=Cesium.Cartesian3.fromDegrees(this._data.coordinate.longitude,this._data.coordinate.latitude)
    }

}