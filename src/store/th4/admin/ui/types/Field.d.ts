namespace th4.admin.ui {
    interface Field {
        label: string;
        describe: string;
        example: string;
        property: string;
        unit?: string;
        type: Type;
        genericTypes?: Type[];
        clazz?: Clazz;
        scale?: number;
        file:{limit?:number,accept:string,maxSize:number}

    }
}