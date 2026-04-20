export default [{
    path: 'mine-setting',
    name: 'mine-setting',
    meta: {
        title: '个人设置'
    },
    component: () => import('@/views/admin/mine/mine-setting/MineSetting.vue'),
},{
    path: 'reset-password',
    name: 'reset-password',
    meta: {
        title: '修改密码'
    },
    component: () => import('@/views/admin/mine/reset-password/ResetPassword.vue'),
},{
    path: 'mine-info',
    name: 'mine-info',
    meta: {
        title: '个人信息'
    },
    component: () => import('@/views/admin/mine/mine-info/MineInfo.vue'),
},{
    path: 'about',
    name: 'about',
    meta: {
        title: '关于系统'
    },
    component: () => import('@/views/admin/mine/about/About.vue'),
},{
    path: '/logout',
    redirect: '/login',
}]