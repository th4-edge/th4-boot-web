namespace th4.admin.module {
    // 关联类型
    interface RelationType {
        // 索引
        idKey: string;
        // 名称
        name: string;
        // 描述
        note: string;
        // 源->目标关系
        fromShip: string;
        // 目标->源关系
        toShip: string;
        // 方向
        direction: {name:string, value:any, key:string };
   }
}
