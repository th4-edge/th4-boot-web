namespace th4.admin.module {
    // 模型
    // 本质上是对同类配置实例进行标准格式的定义。在IT环境中，不同类型的配置项有着各异的属性和特征。主机和机房来说，主机需要记录固资编号、IP 地址、操作系统等信息，机房则需要包含运营商信息、机房位置、电力容量等内容。通过定义主机、机房这两个不同的模型，能够确保相关配置录入CMDB时，必填信息完整无缺，从而保障数据的规范性和完整性
    interface ModuleClass {
        // 模型索引
        clzId: number;
        // 类型
        type: th4.admin.module.ModuleType;
        // 标识
        code: string;
        // 名称
        name: string;
        // 图标
        icon: string;
        // 分组
        groups: string[];
        // 字段
        fields: th4.admin.module.ModuleField[];
        // 状态
        status: {name:string, value:any, key:string };
        // 描述
        note: string;
   }
}
