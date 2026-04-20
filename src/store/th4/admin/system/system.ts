import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";
import http from "@/th4/http.ts";
import {Md5} from "ts-md5/dist/esm/md5";
import {RouteRecordRaw, useRouter} from "vue-router";
import {baseRoutes} from "@/router/route.ts";
import adminRoutes from "@/router/admin/admin.ts";

const TOKEN: string = "th4-token";

const components: any = {};


(() => {
    const files: any = import.meta.glob(
        [
            "@/views/**/*.vue",
        ],
        {import: "default"}
    );
    for (const key in files) {
        const componentName = key.replace("/src/", "");
        components[componentName] = files[key];
    }
})();

const loadView = (component: any) => {
    //return Empty;
    //return () => import("/src/" + component);
    return components[component]
};
const findParent = (items: any[], item: any, key: string): any => {
    if (item.parent) {
        for (let i: number = 0; i < items.length; i++) {
            if (item.parent[key] === items[i][key]) {
                if (!items[i].children) {
                    items[i].children = [];
                }
                items[i].children.push(item);
                return items[i];
            }
        }
    }
    return undefined;
};
export const useTh4AdminSystem = defineStore('th4-admin/system', () => {
    //
    const token = ref<string>(localStorage.getItem(TOKEN) || '')
    //
    const user = ref<th4.admin.system.User>();
    //
    const role = ref<th4.admin.system.Role>();

    const router = useRouter();

    const routes = shallowRef<RouteRecordRaw[]>([]);

    const menus = ref<Record<string, th4.admin.system.Menu[]>>({})
    const login = (loginForm: { username: string, password: string }) => {
        return new Promise<th4.admin.system.User>((resolve, reject) => {
            http.post<any, { token: string }>('admin/login', {
                    username: loginForm.username,
                    password: Md5.hashStr(loginForm.password)
                }
            ).then((response: { token: string }) => {
                token.value = response.token;
                localStorage.setItem(TOKEN, response.token);
                getUser().then((user: th4.admin.system.User) => {
                    user.role && router.push(user.role.home)
                    resolve(user)
                }).catch((error: th4.framework.ErrorCode) => {
                    reject(error)
                });
            }).catch((error: th4.framework.ErrorCode) => {
                reject(error)
            })
        })
    }
    const getUser = () => {
        return new Promise<th4.admin.system.User>((resolve, reject) => {
            menus.value = {}
            http.post<any, th4.admin.system.User>('admin/user', {}).then((userValue: th4.admin.system.User) => {
                user.value = userValue
                role.value = userValue.role
                if (role.value.menus) {
                    role.value.menus.forEach((menu: th4.admin.system.Menu) => {
                        let parent;
                        if (menu.parent) {
                            parent = findParent(userValue.role.menus, menu, "menuId");
                        }
                        if (!parent) {
                            if (menu.type && menu.type.value) {

                                if (!menus.value[menu.type.value]) {
                                    menus.value[menu.type.value] = [];
                                }
                                menus.value[menu.type.value].push(menu);
                                menus.value[menu.type.value].sort((a, b) => a.priority === b.priority ? a.menuId - b.menuId : a.priority - b.priority);
                            }
                        }
                    });
                }
                loadRoutes(userValue);
                resolve(userValue)
            }).catch((error: th4.framework.ErrorCode) => {
                resetToken();
                reject(error)
            })
        })
    }
    const loadRoutes = (user: th4.admin.system.User) => {

        router.clearRoutes();
        // 构建路由
        const root: RouteRecordRaw = {
            path: user.role.home,
            component: loadView(user.role.component),
            meta: {title: user.role.title},
            children: []
        }
        user.role.routes.forEach(route => {
            root.children.push({
                path: route.path,
                name: route.name,
                meta: route.meta,
                component: loadView(route.component)
            })
        });
        root.children.push(...adminRoutes)

        router.clearRoutes();
        baseRoutes.forEach(route => {
            router.addRoute(route)
        })
        router.addRoute(root)

    }
    const resetPassword = (password:string,newPassword:string,confirmPassword:string):Promise<any>=>{
        return http.post<any,any>('admin/reset-password',{password,newPassword,confirmPassword})
    }

    const resetToken = () => {
        token.value = '';
        localStorage.removeItem(TOKEN);

    }
    return {
        token,
        user,
        role,
        menus,
        login,
        getUser,
        routes,
        resetPassword,
        loadView
    }
})