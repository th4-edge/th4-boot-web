namespace th4.admin.system{
    interface Route {
        routeId: number;
        name: string;
        path: string;
        component: string;
        redirect?: string;
        props?: boolean;
        meta?: any;
        container?: boolean;
    }
}