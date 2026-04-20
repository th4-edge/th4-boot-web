<<<<<<< HEAD
# th4-boot-web
=======
# TH4-Admin 前端系统架构
## 项目介绍
 TH4-Admin 是基于 TH4-Framework 开发的前端系统架构，主要用于快速搭建企业级中后台系统。UI框架基于Element-UI为基础，组件库使用>=Vue3.2.0 ，路由管理器使用Vue-Router，状态管理器使用Vuex，请求处理器使用Axios。实现了系统管理、日志管理

## 项目结构
```
├── build  # 构建相关
├── config  # 项目配置
├── src  # 源代码
│   ├── assets  # 静态资源
│   └── components  # 全局公用组件
│       ├── directives  # 全局指令
│       ├── filters  # 全局过滤器
│       ├── mock  # mock数据  
│       ├── plugins  # 插件  
│       ├── utils  # 工具类
│       └── views  # 视图组件
│   ├── layout  # 全局布局
│   ├── views  # 页面
│   ├── router  # 路由
│   ├── store  # 全局状态管理
│   ├── App.vue  # 入口页面
│   └── main.ts  # 入口文件
├── public  # 静态资源  
│   ├── favicon.ico  # favicon图标
│   ├── lib  # 库文件  
│   ├── logo.png  # logo图片
│   ├── robots.txt  # 爬虫协议
│   └── theme  # 主题
├── dist  # 打包输出目录
├── index.html  # 入口html
├──.env.development  # 开发环境变量
├──.env.production  # 生产环境变量
├──.babelrc  # babel-loader 配置
├──.eslintrc.js  # eslint 配置
├──.gitignore  # git 忽略项
└── package.json  # package.json
```

## 项目依赖
- [TH4-Framework](https://github.com/th4-io/th4-framework)
- [Element-UI](https://element.eleme.cn/#/zh-CN)
- [Vue-Router](https://router.vuejs.org/zh/)
- [Vuex](https://vuex.vuejs.org/zh/)
- [Axios](https://github.com/axios/axios)
- [Mock.js](https://github.com/nuysoft/Mock)
- [NProgress](https://github.com/rstacruz/nprogress)
- [Vue-i18n](https://kazupon.github.io/vue-i18n/)
- [Vue-Meta](https://github.com/declandewet/vue-meta)
- [Vue-Cookie](https://github.com/alfhen/vue-cookie)
- [Vue-Clipboard2](https://github.com/Inndy/vue-clipboard2)
- [Vue-Quill-Editor](https://github.com/surmon-china/vue-quill-editor)
- [Vue-Echarts](https://github.com/ecomfe/vue-echarts)
- [Vue-AMap](https://github.com/ElemeFE/vue-amap)
- [Vue-Draggable](https://github.com/SortableJS/Vue.Draggable)
- [Vue-Print-nb](https://github.com/zhaowb/vue-print-nb)
- [Vue-Echarts-v3](https://github.com/xlsdg/vue-echarts-v3)
- [Vue-Cropper](https://github.com/xyxiao001/vue-cropper)
- [Vue-Socket.io](https://github.com/MetinSeylan/Vue-Socket.io)
- [Vue-Socket.io-extended](https://github.com/probil/vue-socket.io-extended)
- [Vue-Socket.io-client](https://github.com/MetinSeylan/Vue-Socket.io-Client)
- [Vue-Socket.io-extended-client](https://github.com/probil/vue-socket.io-extended-client)
>>>>>>> 5bfa32a (项目初始化)
