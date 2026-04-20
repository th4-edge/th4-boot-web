namespace th4.admin.module {
    // 模型字段
    interface ModuleField {
        // 分组
        group: string;
        // 名称
        name: string;
        // 标签
        label: string;
        // 字段类型
        type: {name:string, value:any, key:string };
        // 必填
        required: boolean;
        // 唯一
        unique: boolean;
        // 可编辑
        editable: boolean;
        // 正则
        regex: string;
        // 提示
        tip: string;
   }
}
