namespace th4.admin.system{
    interface Menu{
        menuId: number;
        name: string;
        path: string;
        icon: string;
        type: th4.framework.Enumerated<string>;
        parent:th4.admin.system.Menu;
        priority: number;
        children?: th4.admin.system.Menu[];
    }
}