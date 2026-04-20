
import Overlay = th4.map.Overlay;
import {AbstractEventManager} from "@/store/th4/map/AbstractEventManager.ts";
import {OverlayEvent} from "@/store/th4/map/OverlayEvent.ts";


export abstract class CesiumOverlay<Data extends th4.map.overlay.Data> extends AbstractEventManager implements Overlay<Data>{

    protected static idIndex:number=0;

    protected _id: any;

    protected _component: any[];

    protected _visible: boolean;

    protected _data:Data;

    protected _option:any;

    protected _infoWindow:th4.map.InfoWindow|undefined;

    protected _infoWindowComponent:any;
    protected constructor(_data:Data,_option?:any) {
        super();
        CesiumOverlay.idIndex=CesiumOverlay.idIndex+1
        this._id = this.constructor.name+CesiumOverlay.idIndex;
        this._component = [];
        this._visible = true;
        this._data=_data;
        this._option=_option;
    }

    protected _init(){
        this.on(OverlayEvent.Click,(_map:th4.map.Map)=>{
            this.fireInfoWindow();
        })
    }
    protected _update(){

    }
    get type(): string {
        return this.constructor.name;
    }

    get id(): any {
        return this._id;
    }
     get component(): any[]{
        return this._component;
     }

    destroy(): void{
        if(this._component){
            this._component.forEach(component=>{
                if(component.destroy) {
                    component.destroy()
                }
            });
        }
    }

    hide(): void{
        if(this._component){
            this._component.forEach(component=>{
                if('show' in component){
                    component.show = false;
                }else if(component.length&&component.get){
                    for(let i=0;i<component.length;i++){
                        if('show' in component.get(i)){
                            component.get(i).show = false;
                        }
                    }
                }
            });
            this._visible = false;
        }
        this._emit('hide',this)
    }

     isVisible(): boolean{
         return this._visible;
     }

     show(): void{
         if(this._component){
             this._component.forEach(component=>{
                 if('show' in component){
                     component.show = true;
                 }else if(component.length&&component.get){
                     for(let i=0;i<component.length;i++){
                         if('show' in component.get(i)){
                             component.get(i).show = true;
                         }
                     }
                 }
             });
             this._visible = true;
         }
         this._emit('show',this)
     }

     get data():Data{
        return this._data;
     }

     set data(data:Data){
        this._data=data;
        this._update();
     }
    update(_camera: { height: number; zoom: number }): void {
    }
    setInfoWindow(infoWindow: th4.map.InfoWindow) {
        this._infoWindow=infoWindow;
    }
    getInfoWindow(): th4.map.InfoWindow | undefined{
        return this._infoWindow;
    }
    fireInfoWindow() {
        this._infoWindow&&this._infoWindow.open(this,{coordinate:this._data.coordinate})
    }
    getInfoWindowComponent(): any {
        return this._infoWindowComponent;
    }

    setInfoWindowComponent(infoWindowComponent: any) {
        this._infoWindowComponent=infoWindowComponent;
    }

    get legend(): { name: string; icon: string } | undefined {
        return undefined;
    }

}