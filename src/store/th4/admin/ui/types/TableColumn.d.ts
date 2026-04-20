namespace th4.admin.ui {
    interface TableColumn {
        label: string;
        describe: string;
        example: string;
        property: string;
        unit: string;
        type: Type;
        width: number;
        lob: boolean;
        sortable: boolean;
        visible: boolean;
        id: boolean;
        fixed: boolean;
        children?: TableColumn[];
        genericTypes?: Type[];
    }

}