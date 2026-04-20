namespace th4.admin.module {
    // 模型类型
    interface ModuleType {
        // 模型类型编号
        typeId: number;
        // 名称
        name: string;
        // 图标
        icon: string;
        // 描述
        note: string;
        // 优先级
        priority: number;
   }
}
