# vue3+rollup实现个人组件库
首先我们需要知道rollup是干嘛的
## rollup是做什么的？
rollup是一个JavaScript打包模块器，可以将小代码编译成大块复杂的代码，例如 library 或应用程序。
Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。 <br />

参考文档： <br />
[rollup中文文档](https://www.rollupjs.com/guide/tutorial) <br />
[rollup插件集合](https://github.com/rollup/awesome)
## 安装rollup
1. 首选安装`node.js`
2. 使用如下命令进行全局安装

```js
npm install rollup --global // or npm i rollup -g
```
3. 查看是否安装成功只需要在终端输入：rollup

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f7a57a9b0004f28bdead6bc082ba3e4~tplv-k3u1fbpfcp-watermark.image)
如上则表明全局的`rollup`安装成功
## 实现一个简单的hello world
1. 创建一个文件夹，在文件夹下创建`index.js`,`hello.js`
hello.js代码如下：
```js
export function hello() {
    return 'hello'
}

export function world() {
    return 'world'
}
```
index.js代码如下：

```js
import {hello, world} from './hello.js'
const result = hello() + world()
```
2. 编译，在终端输入如下指令：
```js
npx rollup index.js --file dist/bundle.js --format iife
```
我们发现打包了一个dist文件夹如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47bdcc23c7b2433e83123931c5b18469~tplv-k3u1fbpfcp-watermark.image)
接下来我们看看打包的内容：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c5bd363b02c42c1a47a11d13c6e8402~tplv-k3u1fbpfcp-watermark.image)
这个时候我们就会很疑惑了，说好的hello，world呢？其实这个是因为tree-shaking的作用，是不是感觉和webpack类似了。那我们在做一下变形：

```js
import {hello, world} from './hello.js'
const result = hello() + world()
document.getElementById('app').innerHTML = result
```
然后在打包看看输出的代码

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b287560cac9841f68f2cec46d7d3a838~tplv-k3u1fbpfcp-watermark.image)
这个时候就有了hello，world了，对比发现rollup打包后的代码比webpack更加的清晰，这个我们接下来探讨webpack和rollup的区别。

## webpack和rollup
### webpack
**大型SPA项目的构建**，也就是我们常说的web应用。
- 通过各种Loader处理各种各样的资源文件
- 通过各种插件Plugins对整体文件进行一些处理
- code spliting对公共模块进行提取
- 提供一个webpack-dev-server对本地进行开发
- 支持HMR模块进行热替换
### rollup
- rollup设计之初就是面向ES module的构建出结构扁平，性能出众的类库
- 目的是将ES module打包生成特定的JS模块文件，并减少它的体积
- 编译出来的代码可读性更好，内容小，执行效率更高
- 配置更加简单

**顺带说一下ES module规则**
- import语句只能作为模块的顶层出现，不能出现在function if里面这点和commonJS不一样
- ES module的模块名只能是字符串常量
- 不管import的语句位置出现在哪，在模块初始化的时候所有的import都必须是导入完成的
### webpack VS rollup
通过以上我们可以知道构建App应用时选用webpack适合，构建类库rollup更加适合。

接下来开始尝试配置rolluop吧
## rolluop配置
1. 新建一个文件夹`rolluplearn`目录下执行`npm init -y`
2. 安装rollup
2. 创建如下目录结构，并新建文件`rollup.config.js`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8766aed88ea64697857921f4b7a985f1~tplv-k3u1fbpfcp-watermark.image)
3. 编写rollup配置如下：
```js
// 读取json文件
import json from '@rollup/plugin-json';
export default {
    input: 'main.js',
    input: 'main.js', // 入口文件
    output: {        
        file: 'dist/bundle.js', //打包文件地址
        format: 'esm',          // 打包格式为esmodule
    }
    plugins: [json()]
}
```
4. 在`package.json`中编辑打包脚本：
```js
"scripts": {
    "build": "rollup --config rollup.config.js"
  }
```
5. 开始编写main.j和src/test.js文件
src/test.js
```js
const hell = ()=> {
    console.log('hell')
}
const fn = () => {
    console.log('fn')
}

export {
    hell,
    fn 
}
```
main.js

```js
import { fn, hell }from './src/test'
import { version } from './package.json'
console.log(version)
fn()
```
6. 执行 `npm run build`，结果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f492b5a569d2471c8e9a2f0172889ac4~tplv-k3u1fbpfcp-watermark.image)
rollup相对来说比较简单，没有weebpack的配置那么复杂，接下来我们介绍下vue3的插件开发。
## vue3插件系统开发
给vue3应用添加全局功能，一般是Object有一个`install`方法或者是直接使用`function`，它们没有严格的限制，一般有如下几个功能：
- 添加全局方法和属性
- 添加全局资源和指令
- 通过全局混入添加一些组件选项
- 通过config.globalProperties来添加app的实例方法

### 开发一个插件
#### 全局方法
使用vue-cli创建一个项目，在`components`下创建`test.plugin.ts`文件，代码如下：

```js
import {App} from 'vue'
const plugins = {
    install(app: App) {
        app.config.globalProperties.$echo = ()=>{
            console.log('echo plugin')
        }
    }
}
export default plugins

```
接下来在`main.ts`中使用进行全局使用

```js
import testPlugin from './components/test.plugin'
createApp(App)
.use(store)
.use(router)
.use(testPlugin)
.mount('#app')
```
此时我们就注册成功了一个全局方法`$echo`，接下来我们调用试试看能否成功，
在`App.vue`写入以下代码：
```js
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
      // getCurrentInstance 返回当前组件的实例对象
    getCurrentInstance()?.appContext.config.globalProperties.$echo()
  }
})
</script>
```
查看浏览器控制台

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0af48da1d7c64b90980f26cfd09c407d~tplv-k3u1fbpfcp-watermark.image)
说明我们的全局方法已经添加成功，接下来我们看看如何添加全局组件。
#### 全局组件
还是在`mian.ts`中进行一些修改
```js
import {App} from 'vue'
const plugins = {
    install(app: App) {
        app.config.globalProperties.$echo = ()=>{
            console.log('echo plugin')
        }
        app.component(HelloWord.name, HelloWord)
    }
}
export default plugins
```
在全局方法的使用中我们已经在`main.ts`中使用了`use`方法进行了全局注册，接下来我们只需要在App.vue中进行使用即可，如下：

```js
<template>
  <div id="nav">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>
```
查看浏览器发现全局组件已经注册成功
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0275f977d804e2ab6c2217b61fe70a0~tplv-k3u1fbpfcp-watermark.image)

整体来看其实是和vue2差不多的，主要的区别就是：
- vue2全局方法是挂载在vue的原型对象上的，vue3挂载在`app.config.globalProperties`方法上
- 调用的时候vue2可以直接使用this.xxx进行调用，vue3需要`getCurrentInstance()?.appContext.config.globalProperties`进行调用
到这里使用vue3开发一个插件基本算是完成了，接下来我们需要了解一个组件库入口应该如何开发。

### 组件库入口文件设计
我们使用一个组件库的时候一般会有两种引入方式，一个是全局引入，一个是按需加载。所以在导出的时候应该有这样一个index.ts文件:

```js
import componentA from './a'
const componentList = [
    componentA
]
const install = (app: App) {
      ...
}
// 导出单个
expoert {
...
}
// 导出所有
export default {
    install
}
```
在`componentA`也应该有一个`install`方法，那么应该如何实现呢？🤔️
在原有的vue-cli下载下来的项目进行一些改造，目录如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7bcb74287ab492cb0a9a743a01b4437~tplv-k3u1fbpfcp-watermark.image)
现在主要实现`components/TText/index.ts`和`index.ts`
components/TText/index.ts
```js
import { App } from 'vue'
// 随便写一个组件就行
import TText from './TText.vue'

// 在组件上添加install方法，方便直接使用单个组件
TText.install = (app: App)=> {
    app.component(TText.name, TText)
}

export default TText
```
index.ts

```js
import { App } from 'vue'
import TText from './components/TText'
// 组件列表
const components = [
  TText
] 
// 使用所有组件
const install = (app: App)=> {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
export {
  TText,
  install
}
export default { install }
```
到这里我们就完成组件入口文件的开发，其他的基本就是按照这个模式直接造轮子就好了，接下来我们就使用rollup来打包成umd和esmodule格式的文件。
### 添加tollup配置并打包
根目录创建`build`文件夹，并依此创建
1. `rollup.config.js`：公共基础配置
2. `rollup.esm.config.js`：打包esmodule文件配置
3. `rollup.umd.config.js`打包umd文件配置
因为都是配置就直接写了，可以看后面的备注
rollup.config.js

```js
// 处理vue文件插件
import vue from 'rollup-plugin-vue'
// 处理css文件插件
import css from 'rollup-plugin-css-only'
// 处理ts插件
import typescript from 'rollup-plugin-typescript2'
// 用于在节点单元模块中使用第三方模块
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { name } from '../package.json'
// 输出打包后的文件名称type 1.esm 2.umd
const file = type => `dist/${name}.${type}.js`
const overrides = {
  compilerOptions: { declaration: true }, // 生成.d.ts的文件
  exclude: ["tests/**/*.ts", "tests/**/*.tsx"] 
}
export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' }) // 可自行修改output文件名
  ],
  external: ['vue', 'lodash-es'] // 规定哪些是外部引用的模块
}
```
rollup.esm.config.js
```js
import basicConfig, {file, name} from './rollup.config'
export default {
    ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
}
```
rollup.umd.config.js

```js
import basicConfig, { name, file } from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name: 'thComponents',
    file: file('umd'),
    format: 'umd',
    globals: { // 设定全局变量的名称
      'vue': 'Vue',
      'lodash-es': '_'
    },
    exports: 'named'
  }
}
```
编写打包脚本

```json
"scripts": {
    "build": "npm run clean && npm run build:esm && npm run build:umd", // 整体打包指令
    "build:esm": "rollup --config ./build/rollup.esm.config.js", // 打包esmodule
    "build:umd": "rollup --config ./build/rollup.umd.config.js", // 打包umd格式
    "clean": "rimraf ./dist" // 清除dist
  },
```
运行 `npm run build`

查看结果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7f7c316c14e422891149c739284321a~tplv-k3u1fbpfcp-watermark.image)

组件已经打包完成，接下来我们进行在本地使用 npm link进行测试

### 发布组件

#### 使用npm link进行组件库测试
1. 配置package.json

```js
{
    "name": "th-bricks",
    "version": "0.1.0",
    "private": false,
    "author": "linlei",
    "main": "dist/th-bricks.umd.js",
    "module": "dist/th-bricks.esm.js",
    "types": "dist/index.d.ts"
    ...
 }
```
2. 根目录下执行：`npm link`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd02720af9ae4139a540d92f756476be~tplv-k3u1fbpfcp-watermark.image)
3. 在项目中使用
- 配置
```js
"dependencies": {
    ...
    "th-bricks": "0.1.0"
  }
```
4. 执行 `npm link th-bricks`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7176bf42f5214c23bd9e7a2d68d5d76a~tplv-k3u1fbpfcp-watermark.image)

5. 在项目的main.ts中引入，并在App.vue中使用
main.ts
```js
import { createApp } from 'vue'
import App from './App.vue'
import thBricks from 'th-bricks'
import 'th-bricks/dist/bundle.css'
import router from './router'
import store from './store'
createApp(App)
.use(store)
.use(router)
.use(thBricks)
.mount('#app')
```
App.vue

```js
<template>
  <div id="nav">
    <!-- 使用 -->
    <t-text text="hello" tag="h2" />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

  setup() {
    return {}
  }
})
</script>
```
6. 查看结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31612dedaada43678dd8367b6d4d3bf8~tplv-k3u1fbpfcp-watermark.image)
可以看到已经渲染出了组件
**坑：如果出现可以打印thBricks无法使用的情况，可以重启电脑试试。**
#### 发布npm
1. 首先查看是否登录 `npm whami`
2. 如果已经登录就直接跳过，否则使用`npm login`进行登录，没有npm账号的就需要注册一个了
3. 发布`npm publish`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b13ef20367b4220b066b2877ed023cb~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71e3efc3aa7940b8aee98f404141ad6c~tplv-k3u1fbpfcp-watermark.image)
可以看到已经发布成功了。

🤔我们每次执行`npm publish`的时候并不能保证我们一定执行了`npm run build`，那么有什么方法可以处理呢？
经过查看各种资料发现了可以这样处理：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cf7a56bbd3c488a94fb08d1af3387b3~tplv-k3u1fbpfcp-watermark.image)
```js
"scripts": {
    "build": "npm run clean && npm run build:esm && npm run build:umd",
    "build:esm": "rollup --config ./build/rollup.esm.config.js",
    "build:umd": "rollup --config ./build/rollup.umd.config.js",
    "clean": "rimraf ./dist",
    "prepublishOnly": "npm run build" // npm publish的时候先执行npm run build
  }
```
### 写在最后
- 基本的组件库的流程基本上已经完成了，但是离真正的一个完善组件库还有很远的距离，需要不断的丰富组件库，例如：tree，table，message，还有各种项目特定的组件等等
- [组件库代码](https://github.com/linlei0/th-component.git/)
