import http from "@/th4/http.ts";

/**
 * 获取对象标识的表格展示列
 * @param modelName 对象标识
 * @param ignoreFieldName 忽略属性
 * @param uri 请求路径
 * @param auth 鉴权信息
 */
export const uiModelTableViewColumns=(modelName:string,ignoreFieldName?:string,uri?:string,auth?:string)=>{
    return new Promise<any[]>((resolve, reject)=>{
        uri =auth?`auth/${modelName}/${auth}/page`:uri
        http.post<any,any[]>(`admin/ui/${modelName}/table-column`,{ignoreFieldName,uri}).then((tableColumns:any[])=>{
            resolve(tableColumns)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode)
        })
    });
}
/**
 * 获取对象是否支持关键字查询，返回可进行关键字检索的字段名称，通过｜进行分割。
 * @param modelName 对象标识
 */
export const uiModelQueryKeyword=(modelName:string)=>{
    return new Promise<string>((resolve, reject)=>{
        http.post<any,string>(`admin/ui/${modelName}/query-keyword`,{}).then((keyword:string)=>{
            resolve(keyword)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}
/**
 * 对象视图类型
 * @param modelName 对象标识
 */
export const uiModelViewLayout=(modelName:string)=>{
    return new Promise<th4.admin.ui.Clazz>((resolve, reject)=>{
        http.post<any,th4.admin.ui.Clazz>(`admin/ui/${modelName}/view-layout`,{}).then((clazz:th4.admin.ui.Clazz)=>{
            resolve(clazz)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}

/**
 * 对象保存表单列表
 * @param modelName 对象标识
 * @param ignoredFieldNames 忽略字段
 */
export const uiModelFormSave=(modelName:string,ignoredFieldNames?:string)=>{
    return new Promise<th4.admin.ui.EditFormItem[]>((resolve, reject)=>{
        http.post<any,th4.admin.ui.EditFormItem[]>(`admin/ui/${modelName}/form-save`,{ignoredFieldNames}).then((formItems:th4.admin.ui.EditFormItem[])=>{
            resolve(formItems)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}

/**
 * 对象修改表单列表
 * @param modelName 对象标识
 * @param ignoredFieldNames 忽略字段
 */
export const uiModelFormUpdate=(modelName:string,ignoredFieldNames?:string)=>{
    return new Promise<th4.admin.ui.EditFormItem[]>((resolve, reject)=>{
        http.post<any,th4.admin.ui.EditFormItem[]>(`admin/ui/${modelName}/form-update`,{ignoredFieldNames}).then((formItems:th4.admin.ui.EditFormItem[])=>{
            resolve(formItems)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}
/**
 * 对象详情表单列表
 * @param modelName 对象标识
 * @param ignoredFieldNames 忽略字段
 * @param uri
 * @param auth
 */
export const uiModelFormInfo=(modelName:string,ignoredFieldNames?:string,uri?:string,auth?:string)=>{
    return new Promise<th4.admin.ui.InfoItem[]>((resolve, reject)=>{
        uri =auth?`auth/${modelName}/${auth}/info`:uri
        http.post<any,th4.admin.ui.InfoItem[]>(`admin/ui/${modelName}/info-item`,{ignoredFieldNames,uri}).then((formItems:th4.admin.ui.InfoItem[])=>{
            resolve(formItems)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}
/**
 * 对象字段表单
 * @param modelName 对象标识
 * @param property 对象字段
 */
export const uiModelFormItem=(modelName:string,property:string)=>{
    return new Promise<th4.admin.ui.InfoItem>((resolve, reject)=>{
        http.post<any,th4.admin.ui.InfoItem>(`admin/ui/${modelName}/form-item`,{property}).then((formItem:th4.admin.ui.InfoItem)=>{
            resolve(formItem)
        }).catch((errorCode:th4.framework.ErrorCode)=>{
            reject(errorCode);
        })
    })
}