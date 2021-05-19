# Nginx
## Nginx安装步骤
### 一、安装编译工具及库文件
`yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel`
### 二、首先要安装 PCRE
1. 下载 PCRE 安装包

`cd /usr/local/src/`

`wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz`

2. 解压安装包

`tar zxvf pcre-8.35.tar.gz`

3. 进入安装包目录

`cd pcre-8.35`

4. 编译安装 

`./configure`

`make && make install`

5. 查看pcre版本

`pcre-config --version`

### 安装 Nginx
1. 下载 Nginx

`cd /usr/local/src/`

`wget http://nginx.org/download/nginx-1.18.0.tar.gz`

2. 解压

`tar zxvf nginx-1.18.0.tar.gz`

3. 进入安装包目录

`cd nginx-1.18.0`

4. 编译

`./configure`

`make && make install`

5. 查看nginx版本

`cd /usr/local/nginx/sbin`

`./nginx -v`

6. 查看进程

`ps -ef | grep nginx`

## nginx常用命令
1. 查看版本
`./nginx -v`
2. 查看进程
`ps -ef | grep nginx`
3. 启动
`./nginx`
4. 停止
`./nginx -s stop`
5. 重载
`./nginx -s reload`