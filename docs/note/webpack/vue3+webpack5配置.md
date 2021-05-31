# vue3+webpack5配置

**webpack新特性**
- 持久化缓存
- moduleIds & chunkIds 的优化
- 更智能的 tree shaking
- Module Federation
- ...

**Vue3 的新特性**
- 更小
- 更快
- 加强 TypeScript 支持
- 加强 API 设计一致性
- 提高自身可维护性
- 开放更多底层功能

## 开始配置
### 创建项目
`npm init -y`
### 安装所需插件及必要配置
1. 安装webppack5
```js
npm i webpack webpack-cli webpack-dev-server -D 
```
2. css 解析
```js
npm i less less-loader css-loader style-loader -D 
```
3. vue-loader
```js
npm i vue-loader@next @vue/compiler-sfc -D 
```
src 文件夹下添加 shims-vue.d.ts 文件，解决 vue 类型报错
```js
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
```
4. 模板解析
```js
npm i html-webpack-plugin -D
```
5. 安装 typescript 及解析插件
```js
npm i typescript ts-loader --save-dev
```
6. 处理图片url-loader
```js
npm i url-loader -D
```
7. 处理css，less
```js
cnpm i mini-css-extract-plugin css-loader less less-loader postcss postcss-loader -D
```
配置如`webpack.base.config.js`所示

8. 处理ts
```js
npm i typescript ts-loader --save-dev
```
`ts-loader` 为单进程执行类型检查和转译，因此效率有些慢，可以用多进程方案：即关闭`ts-loader`的类型检查，类型检查由 `fork-ts-checker-webpack-plugin` 插件执行。`npm i fork-ts-checker-webpack-plugin --save-dev`

9. 其他插件
合并插件配置`webpack-merge`

删除build生成的dist包`clean-webpack-plugin`

跨平台`cross-env`

### 创建配置文件,并写入配置(webpack4与webpack5配置基本一样)

创建build文件夹，并依次创建公共配置文件`webpack.base.config.js`,开发配置文件`webpack.dev.config.js`,生产配置文件`webpack.prod.config.js`。

webpack.base.config.js
```js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')

function getConfigPath(mode) {
  return path.resolve(process.cwd(), `.env.${mode}`)
}
module.exports = {
    entry: './src/main.ts',
    cache: {
      type: 'filesystem'  // 持久化缓存
    },
    output: {
        filename: 'js/[name].[chunkhash:5].js',
        path: path.resolve(__dirname, "../dist")
      },
    module: {
        rules: [
          {
            test: /\.(t|j)s$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
              test: /\.(t|j)s$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    // 指定特定的ts编译配置，为了区分脚本的ts配置
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                    // 对应文件添加个.ts或.tsx后缀
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true // 关闭类型检测，即值进行转译
                  },
                },
              ],
          },
          {
            test: /\.css$/,
            use: [
              // 'vue-style-loader',
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              'postcss-loader',
              'css-loader'
            ],
          },
          {
            test: /\.less$/,
            use: [
              // 'vue-style-loader',
              MiniCssExtractPlugin.loader,
              // 'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ],
          },
          {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                },
              }
            ]
          }
        ]
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1, // 最小使用的次数 
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        minChunks: 1,
        cacheGroups: {
          // 提取公共js
          commons: {
            chunks: "all", // initial
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: "commons"
          }
        }
      }
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'webpack5+Vue3'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "style/[name].[hash:8].css",
          chunkFilename: "style/[hash:8].css"
        }),
        new ForkTsCheckerWebpackPlugin(),
    ]
}

```
webpack.dev.config.js
```js
const { merge } = require('webpack-merge')
const common = require('./webpack.base.config')
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
// const smp = new SpeedMeasurePlugin()
module.exports = merge(common,{
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9091, // 本地服务器端口号
        // hot: true, // 热重载
        // overlay: true // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        disableHostCheck: true
    }
})
```
webpack.prod.config.js
```js
const { merge } = require('webpack-merge')
const common = require('./webpack.base.config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = merge(common,{
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
})
```
### 配置脚本
package.json
```json
...
"scripts": {
    "server": "cross-env NODE_ENV=development webpack serve  --progress --hot --inline --config build/webpack.dev.config.js",
    "build": "cross-env NODE_ENV=production webpack --mode=production --config build/webpack.prod.config.js"
  },
...
```
### 4.配置tsconfig.json
```json
{
    "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "strict": true,
      "jsx": "preserve",
      "importHelpers": true,
      "moduleResolution": "node",
      "experimentalDecorators": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "sourceMap": true,
      "baseUrl": ".",
      "types": [
        "webpack-env",
        "node"
      ],
      "paths": {
        "@/*": [
          "src/*"
        ]
      },
      "lib": [
        "esnext",
        "dom",
        "dom.iterable",
        "scripthost"
      ]
    },
    "include": [
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.vue"
    ],
    "exclude": [
      "node_modules"
    ]
  }
```
到这里配置的项目已经可以运行了，但是还有几个问题： **Ts 可以编译为指定版本的 js，那么还需要 babel 么？**

tsc 的 target 只转译语法，不集成 polyfill，所以还是得要 babel。

比如把箭头函数转成普通 function、aysnc + await 变成 Promise.then，这是语法转译；

但你运行环境里如果没有 Promise.prototype.finally，那没有就还是没有。

因此我们项目里还是需要 babel.

**Webpack 转译 Typescript 现有方案:**

|  方案    | 1 |  2 |  3 |
|  ----  | ----  | ----  | ----  |
| 单进程方案（类型检查和转译在同一个进程） | ts-loader(transplieOnly为false) | awesome-typescript-loader  |   |
| 多进程方案  | ts-loader(transplieOnly为true+fork-ts-checker-webpack-plugin) | awesome-typescript-loader+自带的Checkplugin  | babel+fork-ts-checker-webpack-plugin  |

综合考虑性能和扩展性，目前比较推荐的是 `babel+fork-ts-checker-webpack-plugin` 方案。

在 babel7 之前，是需要同时使用 ts-loader 和 babel-loader 的，其编译过程 TS > TS 编译器 > JS > Babel > JS 。可见编译了两次js，效率有些低下。但是 babel7 出来之后有了解析 typescript 的能力，有了这一层面的支持，我们就可以只使用 babel，而不用再加一轮 ts 的编译流程了。

在 babel 7 中，我们使用新的 @babel/preset-typescript 预设，结合一些插件便可以解析大部分的 ts 语法。

那么，Babel 是如何处理 TypeScript 代码的呢？

Babel 删除了所有 TypeScript，将其转换为常规的 JavaScript，并继续以它自己的方式处理。删除了 typescript 则不需要进行类型检查，不会有烦人的类型错误提醒，因此编译速度提升.

**添加 babel 解析 typescript**
```js
# 安装以下依赖 --save-dev
# webpack loader
babel-loader
# babel 核心
@babel/core
# 智能转换成目标运行环境代码
@babel/preset-env
# 解析 typescript 的 babel 预设
@babel/preset-typescript
# polyfill 
@babel/plugin-transform-runtime
# 支持 ts 类的写法
@babel/plugin-proposal-class-properties 

# 安装以下依赖 --save
@babel/runtime
@babel/runtime-corejs3
"core-js": "^3.11.0"
```

删除 ts-loader, 添加 babel-loader

```js
{
    test: /\.(t|j)s$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
}
```

项目根目录添加 babel 配置文件 babel.config.js

```js
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage', // 按需引入 polyfill
          corejs: 3,
        },
      ],
      [
        '@babel/preset-typescript', // 引用Typescript插件
        {
          allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
      '@babel/proposal-class-properties'
      // '@babel/proposal-object-rest-spread',
    ],
  }
```
思考：vue-cli自动创建的脚手架项目可以根据.env.production，.env.development读取配置，应该如何实现？

思路：可以使用`dotenv-webpack`,并在执行脚本前指定其运行环境`cross-env NODE_ENV=development`，使用`process.env.NODE_ENV`获取即可实现。

其他插件：
 speed-measure-webpack-plugin 打包速度分析
 webpack-bundle-analyzer 打包结果分析
 ...
 当然还有很多其他的插件。

 最后附上代码：[地址](https://github.com/linlei0/webpack5-vue3.git)