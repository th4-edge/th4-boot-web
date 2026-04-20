namespace th4.admin.ui {
    interface InfoItem extends Field {
        lob: boolean;
        children?: InfoItem[];
        clazz?: Clazz;
        parent?: InfoItem;
        map?: MapProperty<InfoItem>;
    }

}