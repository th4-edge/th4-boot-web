namespace th4.admin.module {
    // 关联关系
    interface RelationShip {
        // 关系索引
        shipKey: string;
        // 名称
        name: string;
        // 必须
        required: boolean;
        // 类型
        type: th4.admin.module.RelationType;
        // 源
        source: th4.admin.module.ModuleClass;
        // 目标
        target: th4.admin.module.ModuleClass;
        // 关系模式
        mode: {name:string, value:any, key:string };
   }
}
