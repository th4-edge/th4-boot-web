import http from "@th4/http.ts";

/**
 * 通用对象的创建
 * @param modelName
 * @param data
 * @param uri 自定义请求
 */
export const modelBuild=(modelName:string,data?:any,uri?:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(uri||`${modelName}-build`,data).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象属性对象创建
 * @param modelName 模型名称
 * @param property 属性名称
 */
export const modelCreate=(modelName:string,property:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(`${modelName}-create`,{ property}).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象的保存
 * @param modelName 模型名称
 * @param data 请求数据
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelSave=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(uri||(auth?`auth/${modelName}/${auth}/save`:`${modelName}-save`),data).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象的删除，必须传入对象的索引
 * {
 *     idFieldName:'唯一索引'
 * }
 * &
 * {
 *     fieldName:''
 * }
 * @param modelName 对象标识
 * @param data 包含对象索引信息的请求对象
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelUpdate=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(uri||(auth?`auth/${modelName}/${auth}/update`:`${modelName}-update`),data).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象的删除，必须传入对象的索引
 * {
 *     idFieldName:'唯一索引'
 * }
 * @param modelName 对象标识
 * @param data 包含对象索引信息的请求对象
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelDelete=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(uri||(auth?`auth/${modelName}/${auth}/delete`:`${modelName}-delete`),data).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象的详情，必须传入对象的索引
 * {
 *     idFieldName:'唯一索引'
 * }
 * @param modelName 对象标识
 * @param data 包含对象索引信息的请求对象
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelInfo=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any>((resolve, reject)=>{
        http.post<any,any>(uri||(auth?`auth/${modelName}/${auth}/info`:`${modelName}-info`),data).then((model:any)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象的分页，包括分页对象
 * {
 *   page?:1, 页码
 *   size?:20 条数
 * }
 * &
 * {
 *   fieldName[Eq,Le,Ne,Ge,Lt,Le,Like,Null,NotNull]:'值域',
 *   fieldName[asc,desc,orderBy]:'asc|desc|number'
 * }
 * @param modelName 对象标识
 * @param data 包含分页查询条件及分页信息的请求体
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelPage=(modelName:string,data:Record<any, any>&{page?:number,size?:number},uri?:string,auth?:string)=>{
    return new Promise<th4.framework.Page<any>>((resolve, reject)=>{
        http.post<any,th4.framework.Page<any>>(uri||(auth?`auth/${modelName}/${auth}/page`:`${modelName}-page`),data).then((model:th4.framework.Page<any>)=>{
            resolve(model)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 *
 * @param modelName 对象标识
 * @param data 包含分页查询条件及分页信息的请求体
 * @param uri 自定义请求
 * @param auth 鉴权标识
 */
export const modelList=(modelName:string,data?:Record<any, any>,uri?:string,auth?:string)=>{
    return new Promise<any[]>((resolve, reject)=>{
        http.post<any,any[]>(uri||(auth?`auth/${modelName}/${auth}/list`:`${modelName}-list`),data).then((list:any[])=>{
            resolve(list)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
/**
 * 通用对象统计
 * {
 *     fieldName[count,max,min,avg,sum,group]
 * }
 * @param modelName 对象标识
 * @param data 包含查询条件的请求体
 * @param uri
 * @param auth
 */
export const modelReport=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any[]>((resolve, reject)=>{
        http.post<any,any[]>(uri||(auth?`auth/${modelName}/${auth}/report`:`${modelName}-report`),data).then((list:any[])=>{
            resolve(list)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
export const modelCount=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<number>((resolve, reject)=>{
        http.post<any,number>(uri||(auth?`auth/${modelName}/${auth}/count`:`${modelName}-count`),data).then((count:number)=>{
            resolve(count)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
export const modelTree=(modelName:string,data:any,uri?:string,auth?:string)=>{
    return new Promise<any[]>((resolve, reject)=>{
        http.post<any,any[]>(uri||(auth?`auth/${modelName}/${auth}/tree`:`${modelName}-tree`),data).then((children:any[])=>{
            resolve(children)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}

/**
 * 通用查询对象类型的枚举信息
 * @param modelName 对象标识
 * @param property 字段名称，支持关联role.type
 */
export const modelEnums=(modelName:string,property:string)=>{
    return new Promise<th4.framework.Enumerated<any>[]>((resolve, reject)=>{
        http.post<any,th4.framework.Enumerated<any>[]>(`${modelName}-enums`,{property}).then((list:th4.framework.Enumerated<any>[])=>{
            resolve(list)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}

/**
 * 验证对象属性是否唯一
 * @param modelName 对象标识
 * @param property 属性名称
 * @param propertyValue 唯一标识
 * @param data 验证数据
 */
export const modelPropertyUnique=(modelName:string,property:string,propertyValue:any,data?:any)=>{
    return new Promise<boolean>((resolve, reject)=>{
        http.post<any,boolean>(`${modelName}-unique`,{property,propertyValue,...data}).then((b    )=>{
            resolve(b)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}

