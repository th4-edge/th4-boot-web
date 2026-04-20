小图标用图标库，图标放在了/public/icon-font/

```javascript
   name: string, //图标名称（对应 iconfont 项目中的图标 class）
   size?: number, //图标大小，支持数字(px)或字符串(如 '1em', '20px')
   color?: string //颜色
```

用法如下：

```html
<x-font name="home" />
<x-font name="user" :size="24" color="#1890ff" />
```
