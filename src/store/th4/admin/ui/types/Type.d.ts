namespace th4.admin.ui {
    interface Type {
        name: string;
        enumerated: boolean;
        array: boolean;
        map: boolean;
        number: boolean;
        collection: boolean;
        model: boolean;
        bool: boolean;
        file:boolean;
        features: any[];
    }
}