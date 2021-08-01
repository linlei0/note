# vue3实现toast
在实现组件之前我们需要了解如下知识点：

- [createVNode的用法](https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0)
- render（查阅源码发现的方法，api未体现）
接下来开始写代码

在 src/components下创建toast文件夹，并依此创建index.vue和index.ts
## 创建模版index.vue

**编写index.vue创建模版**

一般toast会有如下功能：
- 背景色
- 字体颜色
- 文本
- 停留时间
- ...

那么自然可以写出如下代码：
```vue
<template>
<div class="toast-box" >
    <p class="toast-value" :style="{background: background, color: color}">
        {{ value }}
    </p> 
</div>
</template>    
<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'Toast',
        props: {
            value: {
                type: String,
                default: ''
            },
            duration: {
                type: Number,
                default: 3000
            },
            background: {
                type: String,
                default: '#000'
            },
            color: {
                type: String,
                default: '#fff'
            }
        }
    })
</script>

<style>
.toast-box  {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
    .toast-value {
        max-width: 100px;
        background: rgb(8, 8, 8);
        padding: 8px 10px;
        border-radius: 4px;
        text-align: center;
        display: inline-block;
        animation: anim 0.5s;
    }
    @keyframes anim { 
            0% {opacity: 0;}
            100%{opacity:1;
        }
    }
    .toast-value.reomve {
        animation: reomve 0.5s;
    }
     @keyframes reomve { 
            0% {opacity: 1;}
            100%{opacity:0;
        }
    }
</style>
```

## 导出Toast方法
思路
- 创建时
    - 首先使用`createVNode`方法创建一个`vNode`独享
    - 使用`render`方法转换成真实`dom`
    - 添加到`body`上
- 销毁时
    - 首先添加一个淡入淡出效果
    - 使用`render`将真实设置为`null`
    - 移除创建的dom
具体代码实现如下：
```ts
import { createVNode, render } from 'vue'
import toastTemplate from './index.vue'
export interface IProps {
    value?: string;
    duration?: number;
    background?: string;
    color?: string;
}
const defaultOpt = { // 创建默认参数
    duration: 3000
}

export interface ResultParams {
    destory?: () => void;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Toast = (options: IProps):ResultParams => {
    const container = document.createElement('div')
    const opt = {...defaultOpt,...options}
    const vm = createVNode(toastTemplate, opt) // 创建vNode
    render(vm, container)
    document.body.appendChild(container)       // 添加到body上
    const destory =  ()=> {
        const dom = vm.el as HTMLDivElement
        if(dom.querySelector('.toast-value')) {
            dom.querySelector('.toast-value')?.classList.add('reomve') // 销毁时添加淡入淡出效果
            const t = setTimeout(() => {             // 淡入淡出效果之后删除dom节点
                render(null, container)
                document.body.removeChild(container)
                clearTimeout(t)
            },500);
        } 
    }
    if(opt.duration) {                            // 如果传入的值为0可以持续保留在页面，需要手动销毁
        const timer = setTimeout(()=> {
            destory()
            clearTimeout(timer)
        }, opt.duration)
    }
    return {
        destory
    }
}
export default Toast
```
## 测试
在任意vue页面引入刚完成的`Toast`方法,进行调用
```vue
<template>
  <div class="home">
   测试toast
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Toast from '@/components/toast'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  setup() {
    onMounted(()=> {
      const toast = Toast({
        value: 'toast',
        duration: 0, // 如果大于0则不必使用destory方法
        background: '#000',
        color: '#fff'
      })
      setTimeout(() => {
        toast.destory && toast.destory()
      }, 3000);
     
    })
    
  }
});
</script>
```
调用
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c61995623daa48ec8da7f403ffb58e07~tplv-k3u1fbpfcp-watermark.image)
销毁
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8facd7e6563f4c7cba85c80737cb7199~tplv-k3u1fbpfcp-watermark.image)

## 写在最后
相比较vue2的实现方式，整体思路差不多主要是api的变化

