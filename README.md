# BoreTech HTML5 Template

> A mobile web develop template based Vue 3

`En Version` | [`简体中文`](./docs/README_ZH_CN.md)

## NOTE

[ICONS](https://www.flaticon.com/uicons)

## config.js

- 配置项目index.html所需参数

## 内置组件

### Preloader
- 加载资源

### music
- 背景音乐

### SvgIcon
- svg图标

### popup
- 提示弹窗  
- 使用
  ```javascript
    // 引入
    import {popup} from '@/utils/mitt'

    // 显示弹窗
    popup.emit({
        'show', 
        {
            text : '弹窗',
            type : 'modal',
            defineCallback(){}; // 取消回调
            removeCallback(){}; // 确定回调
            hideCallback(){};   // 关闭回调
        }
    })

    // 关闭弹窗
    popup.emit('hide')
    
  ```
  



