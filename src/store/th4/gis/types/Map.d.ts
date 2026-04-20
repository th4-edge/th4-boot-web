namespace th4.gis{
    interface Map{
        mapKey:string,
        name:string,
        title?:string,
        center:th4.geo.Coordinate;
        height:number;
        mode:th4.framework.Enumerated<string>;
        engine:th4.framework.Enumerated<string>;
        imageryProvider:th4.framework.Enumerated<string>;
        style:th4.framework.Enumerated<string>;
        zoom:Zoom;
        orientation:Orientation;
        component?:string;
        components?:string[];
        layout?:string;
    }
}