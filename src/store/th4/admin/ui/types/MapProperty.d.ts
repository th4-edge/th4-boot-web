namespace th4.admin.ui {
    interface MapProperty<Item> {
        key: {
            clazz: Clazz;
            type: Type;
            children?: Item[];
            scale?: number;
            unit?: string;
        }
        value: {
            clazz: Clazz;
            type: Type;
            children?: Item[];
            scale?: number;
            unit?: string;
        }
    }
}