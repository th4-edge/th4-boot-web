import axios from "axios";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {API, TokenHeader} from "@th4/http.config.ts";
import {ElMessage} from "element-plus";



const http = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api',
    baseURL: API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});
// 工厂模式
const errorManager: any = {};
((errorManager: any) => {
    const files: any = import.meta.glob("../error-code/*.ts", {eager: true});
    for (const key in files) {
        errorManager[key.replace(/^\..\/error-code\/(.*)\.\w+$/, "$1")] = files[key].default;
    }
})(errorManager);

http.interceptors.request.use((config:any) => {
    const systemStore = useTh4AdminSystem();
    config.headers[TokenHeader] = systemStore.token;
    // config.headers["monitor"] = "IOS";
    config.headers["monitor"] = "Chrome";
    return config;
});
http.interceptors.response.use(
    (response:any) => {
        if (response.data.success) {
            return response.data.data;
        } else {
            const error:th4.framework.ErrorCode = response.data.errorCode;
            if (error.code) {
                //
                if(error.code in errorManager){
                    errorManager[error.code](error);
                } else{
                    ElMessage.error(error.message);
                }
            } else {
            }
            return Promise.reject(error);
        }
    },
    (error:any) => {
        return Promise.reject(error);
    }
);

export default http;

