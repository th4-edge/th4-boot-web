namespace th4.admin.ui {
    interface Clazz {
        id: string;
        name: string;
        note: string;
        describe: string;
        idField: Field;
        treeField?: Field;
        nameFields: Field[];
        features: any[];
    }

}