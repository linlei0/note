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
## 如何实现css in js
我们有时候会看到这样的css写法，那么他们是怎么实现的呢？

**css代码 src/home.css**
```css
.test{
    color: red
}
.d {
    color: white
}
```
**javascript代码 src/index.js**
```javascript
import home from './home.css'
console.log(home)
document.getElementById("app").innerHTML = `<h1 class="${home['test']}">测试数据</h1>`
```
实现步骤：
- 1.使用webpack进行配置，安装webpack，webpack-cli插件
```
npm i webpack webpack-cli -D
```
- 2.安装css-loader，style-loader插件
```
npm i css-loader style-loader -D
```
- 3.配置webpack，在根目录下创建webpack.config.js文件，写入如下配置
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                       loader: 'css-loader',
                       options: {
                           modules: true
                       } 
                    }
                ]

            }
        ]
    }
}
```
- 4.设置打包命令，在package.json中配置dev命令
```json
...
"scripts": {
    "dev": "webpack --mode development"
  }
...
```
- 5.执行 npm run dev即可在dist中生成main.js

- 6.在生产的dist目录下创建index.html，手动写入如下代码
```html
...
<div id="app"></div>
<script src="./main.js"></script>
...
```
- 7.运行dist下的index.html
可以很明显的看到webpack帮我们把css转成了obj同时dom元素上也绑定了
![result1](/css/test-css.png)

![result2](/css/test-html.png)
- 8.虽然实现了如上的结果但是我们还是有个问题，就是在css中的类如果很多，就不方便咱们写代码了此处用到了一个提示插件
```
cnpm i typed-css-modules-loader -D
```
配置如下
```js
...
rules: [
    {
        enforce: 'pre',
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'typed-css-modules-loader'
    }
]
...
```

再次执行npm run dev会生成一个ts文件，也就是css文件的类在你写书写代码过程中会出现提示是不是很舒服

![result2](/css/test-html.png)




