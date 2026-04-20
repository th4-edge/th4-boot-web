namespace th4.admin.ui {
    interface QueryFormItem extends Field {

        children?: QueryFormItem[]
    }

    interface EditFormItem extends Field {
        rule?: Rule;
        lob: boolean;
        children?: EditFormItem[];
        clazz?: Clazz;
        parent?: EditFormItem;
        map?: MapProperty<EditFormItem>;
    }

    interface Rule {
        required?: boolean;
        min?: number;
        max?: number;
        unique?: boolean;
        regex?: string;
        type?: string;
        message?: string;
        validator?: Function;
        trigger?: string;
        validatorOptions?: any;
        transform?: Function;
        formatter?: Function;
        parse?: Function;
    }
}