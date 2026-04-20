namespace th4.admin.system{
    interface Role{
        idKey:string;
        name:string;
        title:string;
        serial:boolean;
        home:string;
        watermark:string;
        component:string;
        menus:th4.admin.system.Menu[];
        routes:th4.admin.system.Route[];
    }
}