# 现代化css方法论
## 声明css变量并使用
**使用如下我们会发现页面已经已经变成红色了**
```css
:root{
    --bgColor: red;
}
body{
    background: var(--bgColor)
}
```
**那么我们该如何修改这个变量呢?**
## javascript给css变量赋值
只需调用setProperty方法设置变量即可一个基本的动态设置变量咱们就处理好了
```javascript
const root = document.documentElement
root.style.setProperty('--bgColor','blue')
```
## css-doodle
**什么是css-doodle**
- 1.[css-doodle](https://css-doodle.com/)是一个用来绘制css图案的web组件
**如何使用？**
- 1.直接CDN引入,然后引入css-doodle组件
```html
<script src="https://unpkg.com/css-doodle@0.8.5/css-doodle.min.js"></script>
<css-doodle></css-doodle>
```
- 2.实现一个简单的demo
(1).实现一个简单的grid

```html
<css-doodle>
    :doodle {
        @grid: 10 x 10 / 61.8vmax;
    }
</css-doodle>
```


