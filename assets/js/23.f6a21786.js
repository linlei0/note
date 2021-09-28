(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{401:function(a,s,t){"use strict";t.r(s);var e=t(46),l=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"pm2基本使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pm2基本使用"}},[a._v("#")]),a._v(" pm2基本使用")]),a._v(" "),t("h2",{attrs:{id:"pm2简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pm2简介"}},[a._v("#")]),a._v(" pm2简介")]),a._v(" "),t("p",[a._v("pm2（process manager）是一个进程管理工具，维护一个进程列表，可以用它来管理你的node进程，负责所有正在运行的进程，并查看node进程的状态，也支持性能监控，负载均衡等功能。")]),a._v(" "),t("h3",{attrs:{id:"使用pm2的好处"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用pm2的好处"}},[a._v("#")]),a._v(" 使用pm2的好处")]),a._v(" "),t("ul",[t("li",[a._v("监听文件变化，自动重启程序")]),a._v(" "),t("li",[a._v("支持性能监控")]),a._v(" "),t("li",[a._v("负载均衡")]),a._v(" "),t("li",[a._v("程序崩溃自动重启")]),a._v(" "),t("li",[a._v("服务器重新启动时自动重新启动")]),a._v(" "),t("li",[a._v("自动化部署项目")])]),a._v(" "),t("h2",{attrs:{id:"pm2的安装和使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pm2的安装和使用"}},[a._v("#")]),a._v(" pm2的安装和使用")]),a._v(" "),t("h3",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" pm2 -g \n")])])]),t("h3",{attrs:{id:"常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[a._v("#")]),a._v(" 常用命令")]),a._v(" "),t("ol",[t("li",[a._v("启动一个程序")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 start xxx.js\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[a._v("启动进程并指定应用的程序名")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v(" pm2 start app.js --name application1\n")])])]),t("ol",{attrs:{start:"3"}},[t("li",[a._v("集群模式启动")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("// -i 表示 number-instances 实例数量\n// max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量\npm2 start start.js -i max\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[a._v("列出所有进程")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 list\npm2 "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" // 简写\n")])])]),t("ol",{attrs:{start:"5"}},[t("li",[a._v("从进程列表中删除进程")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("// pm2 delete "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("appname"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("id")]),a._v("\npm2 delete app  // 指定进程名删除\npm2 delete "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("    // 指定进程id删除\n")])])]),t("ol",{attrs:{start:"6"}},[t("li",[a._v("删除进程列表中所有进程")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 delete all\n")])])]),t("ol",{attrs:{start:"7"}},[t("li",[a._v("查看某个进程具体情况")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v(" pm2 describe app\n // app 对应name\n")])])]),t("ol",{attrs:{start:"8"}},[t("li",[a._v("查看进程的资源消耗情况")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 monit\n")])])]),t("ol",{attrs:{start:"9"}},[t("li",[a._v("重启进程")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 restart app // 重启指定名称的进程\npm2 restart all // 重启所有进程\n")])])]),t("ol",{attrs:{start:"10"}},[t("li",[a._v("查看进程日志")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 logs app    // 查看该名称进程的日志, app对应name\npm2 logs all    // 查看所有进程的日志\n")])])]),t("ol",{attrs:{start:"11"}},[t("li",[a._v("设置pm2开机自启")])]),a._v(" "),t("p",[a._v("开启启动设置，此处是CentOS系统，其他系统替换最后一个选项（可选项：ubuntu, centos, redhat, gentoo, systemd, darwin, amazon）")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 startup centos \n")])])]),t("p",[a._v("然后按照提示需要输入的命令进行输入")]),a._v(" "),t("p",[a._v("最后保存设置")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("pm2 save\n")])])])])}),[],!1,null,null,null);s.default=l.exports}}]);