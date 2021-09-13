# webpack4 和 webpack5 差异

## 启动服务的差异

webapck4

```json
{
  "scripts:": {
    "serve": "webpack-dev-server --config webpack.config.js"
  }
}
```

webpack5

```json
{
  "script": {
    "serve": "webpack serve --conifg webpack.conifg.js"
  }
}
```

## loader 优化

在 webpack 5 之前，通常使用

- `raw-loader` 将文件导入为字符串
- `url-loader` 将文件作为 data URI 内联到 bundle 中
- `file-loader` 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现
- asset/inline 导出一个资源的 data URI。之前通过使用 `url-loader` 实现
- asset/source 导出资源的源代码。之前通过使用 `raw-loader` 实现
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现

### type 的类型设置

1. type 分别为 asset/resource、asset/inline、asset/source

```js
module.exports = {
  module: {
    rules: [
      {
        // 等同file-loader
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        // 等同url-loader
        test: /\.svg/,
        type: "asset/inline",
      },
      {
        // 等同raw-loader
        test: /\.txt/,
        type: "asset/source",
      },
    ],
  },
};
```

2. type 为 asset
   对于 type: asset，webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset",
        // 自定义设置
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
};
```

3. 自定义输出文件名

默认情况下，asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录

可以通过在 webpack.config.js 将 output.assetModuleFilename 和 Rule.generator.filename 结合使用来定制化文件的输出目录

```js
module.epxorts = {
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // [ext]前面自带"."
          filename: "assets/img/[hash:8].[name][ext]", //自定义输出目录
        },
      },
    ],
  },
};
```

## 文件缓存

```js
module.exports = {
  cache: {
    type: "filesystem",
    // 默认缓存到 node_modules/.cache/webpack 中
    // 也可以自定义缓存目录，cache.cacheDirectory 选项仅当 cache.type 被设置成 filesystem 才可用。
    // cacheDirectory:path.resolve(__dirname,'node_modules/.cac/webpack'),
    buildDependencies: {
      // 2. 将您的配置添加为 buildDependency 以使配置更改时缓存失效
      config: [__filename],

      // 3. 如果您有其他构建所依赖的东西你可以在这里添加它们
      // 请注意，webpack、加载器和从你的配置中引用的所有模块都会自动添加
    },
  },
};
```

## 更好的treeshaking
webpack 5 添加了对某些 CommonJs 结构的支持，允许消除未使用的 CommonJs 导出并跟踪require()调用中引用的导出名称

## 模块联邦




