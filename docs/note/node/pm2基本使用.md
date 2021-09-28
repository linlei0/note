# pm2基本使用

## pm2简介
pm2（process manager）是一个进程管理工具，维护一个进程列表，可以用它来管理你的node进程，负责所有正在运行的进程，并查看node进程的状态，也支持性能监控，负载均衡等功能。

### 使用pm2的好处

- 监听文件变化，自动重启程序
- 支持性能监控
- 负载均衡
- 程序崩溃自动重启
- 服务器重新启动时自动重新启动
- 自动化部署项目

## pm2的安装和使用

### 安装
```shell
npm install pm2 -g 
```
### 常用命令

1. 启动一个程序
```shell
pm2 start xxx.js
```
2. 启动进程并指定应用的程序名

```shell
 pm2 start app.js --name application1
```

3. 集群模式启动

```shell
// -i 表示 number-instances 实例数量
// max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量
pm2 start start.js -i max
```

4. 列出所有进程

```shell
pm2 list
pm2 ls // 简写
```

5. 从进程列表中删除进程

```shell
// pm2 delete [appname] | id
pm2 delete app  // 指定进程名删除
pm2 delete 0    // 指定进程id删除
```
6. 删除进程列表中所有进程

```shell
pm2 delete all
```

7. 查看某个进程具体情况

```shell
 pm2 describe app
 // app 对应name
```
8. 查看进程的资源消耗情况

```shell
pm2 monit
```

9. 重启进程

```shell
pm2 restart app // 重启指定名称的进程
pm2 restart all // 重启所有进程
```
10. 查看进程日志

```shell
pm2 logs app    // 查看该名称进程的日志, app对应name
pm2 logs all    // 查看所有进程的日志
```
11. 设置pm2开机自启

开启启动设置，此处是CentOS系统，其他系统替换最后一个选项（可选项：ubuntu, centos, redhat, gentoo, systemd, darwin, amazon）

```shell
pm2 startup centos 
```

然后按照提示需要输入的命令进行输入

最后保存设置

```shell
pm2 save
```