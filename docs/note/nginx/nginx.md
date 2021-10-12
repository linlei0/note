# Nginx
## Nginx安装步骤
### 一、安装编译工具及库文件
```shell
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```
### 二、首先要安装 PCRE
1. 下载 PCRE 安装包

```shell
cd /usr/local/src/

wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
```

2. 解压安装包

```shell
tar zxvf pcre-8.35.tar.gz
```

3. 进入安装包目录

```shell
cd pcre-8.35
```

4. 编译安装 

```shell
./configure
```

```shell
make && make install
```

5. 查看pcre版本

```shell
pcre-config --version
```

### 安装 Nginx
1. 下载 Nginx

```shell
cd /usr/local/src/
```

```shell
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

2. 解压

```shell
tar zxvf nginx-1.18.0.tar.gz
```

3. 进入安装包目录

```shell
cd nginx-1.18.0
```

4. 编译

```shell
./configure
```

```shell
make && make install
```

5. 查看nginx版本

```shell
cd /usr/local/nginx/sbin
```

```shell
./nginx -v
```

6. 查看进程

```shell
ps -ef | grep nginx
```

## nginx常用命令总结
```shell
nginx -s reload 重新加载配置
nginx -s reopen 重启
nginx -s stop 停止
nginx -s quit 退出
nginx -V 查看版本，以及配置文件地址
nginx -v 查看版本
nginx -c filename 指定配置文件
nginx -h 帮助
```

## nginx反向代理
```json
server
{
    listen 80;
    server_name www.720ui.com;

    location ^~ /blog/ {
        proxy_pass http://blog.720ui.com/;
    }   
}
```