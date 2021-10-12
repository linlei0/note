# 常用 node 库总结

- [fs-extra](https://www.npmjs.com/package/fs-extra)

  对 fs 的扩展

- [user-home](https://www.npmjs.com/package/user-home)

  获取当前用户主目录

- [ejs](https://www.npmjs.com/package/ejs)

  模版渲染

- [glob](https://www.npmjs.com/package/glob)

  遍历文件

- [kebab-case](https://www.npmjs.com/package/kebab-case)

  驼峰转"-"连接

  例如：WebkitTransform -> -webkit-
  
- [semver](https://www.npmjs.com/package/semver)

  版本比对工具

- [colors](https://www.npmjs.com/package/colors)

  终端文本颜色设置

- [chalk](https://www.npmjs.com/package/chalk)

  终端文本颜色设置

- [commander](https://www.npmjs.com/package/commander)

  开发脚手架常用命令行工具

- [inquirer](https://www.npmjs.com/package/inquirer)

  常见的交互式命令行用户界面和 commander 组合开发 cli 的利器

- [lerna](https://www.npmjs.com/package/lerna)

  开发脚手架常用框架

- [dotenv](https://www.npmjs.com/package/dotenv)

  读取.env 文件库，用于处理一些常用的配置文件

- [import-local](https://www.npmjs.com/package/import-local)

  用于判断是否使用本地版本和开发版本

```js
const importLocal = require("import-local");

function logInfo(info) {
  require("npmlog").info("cli", info); // 开发版本
}
// console.log(__filename)
// console.log(__dirname)
if (importLocal(__filename)) {
  // require('npmlog').info('cli', '正在使用本地版本！') // 发布npm的包下载到本地的package
  logInfo("正在使用本地版本！");
} else {
  // require('npmlog').info('cli', '正在使用开发版本') // 开发版本
  logInfo("正在使用开发版本");
  require("../lib")(process.argv.slice(2));
}
```

- [npmlog](https://www.npmjs.com/package/npmlog)

  终端打印日志工具

- [path-exists](https://www.npmjs.com/package/path-exists)

  判断文件目录地址是否存在

- [root-check](https://www.npmjs.com/package/root-check)

  对 root 权限进行降级

```js
const rootCheck = require("root-check");
rootCheck();
console.log(process.getuid());
```

- [simple-git](https://www.npmjs.com/package/simple-git)

  用于 git 在任何 node.js 应用程序中运行命令的轻量级界面


- [terminal-link](https://www.npmjs.com/package/terminal-link)

  在终端种进行 url 浏览器地址跳转

- [npminstall](https://www.npmjs.com/package/npminstall)

  npm install 更快速和方便

- [pkg-dir](https://www.npmjs.com/package/pkg-dir)

  查找 Node.js 项目或 npm 包的根目录

- [url-join](https://www.npmjs.com/package/url-join)

  拼接 url 地址

- [cli-spinner](https://www.npmjs.com/package/cli-spinner)

  spinner 加载器

- koa 全家桶
  - [koa](https://www.npmjs.com/package/koa)

    koa
    
  - [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

    解析 body 参数

  - [koa-router](https://www.npmjs.com/package/koa-router)

    路由

  - [koa-static](https://www.npmjs.com/package/koa-static)

    静态服务器

  - [log4js](https://www.npmjs.com/package/log4js)

    日志

  - [puppeteer](https://www.npmjs.com/package/puppeteer)

    生成 pdf

  - [uuid](https://www.npmjs.com/package/uuid)

    生成 uuid



