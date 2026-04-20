namespace th4.gis{
    interface Label extends th4.map.overlay.Data{
        labelId:number;
        name:string;
        icon:string;
        map:th4.gis.Map;
        type:{name:string,icon:string}
    }
}