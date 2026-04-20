namespace th4.map{
     interface Overlay<Data> extends EventManager{

          /**
           * 唯一标识
           */
          get id():any;

          /**
           * 类型
           */
          get type():string;

          /**
           * 应该使用注解的方式来实现图例
           * 图例
           */
          get legend():{name:string,icon:string}|undefined;

          /**
           * 组件
           */
          get component():any[];

          /**
           * 获取数据
           */
          get data():Data;

          /**
           *
           * @param data
           */
          set data(data:Data);

          /**
           * 销毁
           */
          destroy(): void;

          /**
           * 显示
           */
          show():void;

          /**
           * 隐藏
           */
          hide():void;

          /**
           * 是否可见
           */
          isVisible():boolean;

          /**
           * 相机更新时调用
           * @param camera
           */
          update(camera:{height:number,zoom:number}):void;

          /**
           * 设置弹窗
           * @param infoWindow
           */
          setInfoWindow(infoWindow:th4.map.InfoWindow);

          /**
           * 获取弹窗
           */
          getInfoWindow():th4.map.InfoWindow|undefined;

          /**
           * 设置弹窗组件
           * @param infoWindowComponent
           */
          setInfoWindowComponent(infoWindowComponent:any);

          /**
           * 获取弹窗组件
           */
          getInfoWindowComponent():any;

          /**
           * 触发弹窗
           */
          fireInfoWindow();

     }
}