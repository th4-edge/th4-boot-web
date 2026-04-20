import {RouteRecordRaw} from "vue-router";

export const baseRoutes: RouteRecordRaw[]=[
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("@/views/login/Login.vue"),
    },
    {
        path: "/test/fashion-layout",
        component: () => import("@/views/admin/test/FashionLayoutTest.vue"),
    }]