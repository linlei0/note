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
## loader优化
在 webpack 5 之前，通常使用

- `raw-loader` 将文件导入为字符串
- `url-loader` 将文件作为 data URI 内联到 bundle 中
- `file-loader` 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现
