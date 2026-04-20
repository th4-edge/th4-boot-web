import http from "@th4/http.ts";

export const flowStageSteps=(modelName:string,property:string,stage:string)=>{
    return new Promise<th4.framework.Enumerated<any>[]>((resolve, reject)=>{
        http.post<any,th4.framework.Enumerated<any>[]>(`flow/${modelName}/${property}/${stage}/steps`,{}).then((list:th4.framework.Enumerated<any>[])=>{
            resolve(list)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
export const flowStageStepReceiptName=(modelName:string,property:string,stage:string,step:string)=>{
    return new Promise<string>((resolve, reject)=>{
        http.post<any,string>(`flow/${modelName}/${property}/${stage}/${step}/receipt/name`,{}).then((name:string)=>{
            resolve(name)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}
export const flowStageReceiptName=(modelName:string,property:string,stage:string)=>{
    return new Promise<string>((resolve, reject)=>{
        http.post<any,string>(`flow/${modelName}/${property}/${stage}/receipt/name`,{}).then((name:string)=>{
            resolve(name)
        }).catch((error:th4.framework.ErrorCode)=>{
            reject(error)
        })
    })
}