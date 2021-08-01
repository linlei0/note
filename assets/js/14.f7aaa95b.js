(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{380:function(s,t,a){"use strict";a.r(t);var r=a(45),n=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"css和js渲染阻塞"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css和js渲染阻塞"}},[s._v("#")]),s._v(" css和js渲染阻塞")]),s._v(" "),a("h2",{attrs:{id:"浏览器渲染引擎"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染引擎"}},[s._v("#")]),s._v(" 浏览器渲染引擎")]),s._v(" "),a("h3",{attrs:{id:"主要模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#主要模块"}},[s._v("#")]),s._v(" 主要模块")]),s._v(" "),a("ul",[a("li",[s._v("一个渲染引擎主要包括：HTML解析器，CSS解析器，javascript引擎，布局layout模块，绘图模块")])]),s._v(" "),a("h2",{attrs:{id:"阻塞渲染"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#阻塞渲染"}},[s._v("#")]),s._v(" 阻塞渲染")]),s._v(" "),a("h3",{attrs:{id:"关于css阻塞"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于css阻塞"}},[s._v("#")]),s._v(" 关于css阻塞")]),s._v(" "),a("p",[a("strong",[s._v("申明：只有link引入的外部css才会引起阻塞")])]),s._v(" "),a("ol",[a("li",[a("p",[s._v("style标签中的样式：\n(1).由html解析器进行解析\n(2).不阻塞浏览器渲染（可能会产生闪屏的现象）\n(3).不阻塞dom解析")])]),s._v(" "),a("li",[a("p",[s._v("link引入的外部css样式（推荐使用方式）\n(1).由css解析器进行解析\n(2).阻塞浏览器渲染（可以理由这种阻塞避免闪屏现象）\n(3).阻塞其后面的js语句的执行\n(4).不阻塞dom的解析（绝大多数浏览器的工作方式）")])]),s._v(" "),a("li",[a("p",[s._v("优化核心理念：尽可能快的提高外部css加载速度\n(1).使用CDN节点进行外部资源加速\n(2).对css进行压缩（利用打包工具，webpack，gulp等）\n(3).减少http请求，将多个css文件合并\n(4).优化样式的代码")])])]),s._v(" "),a("h3",{attrs:{id:"关于js阻塞"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于js阻塞"}},[s._v("#")]),s._v(" 关于js阻塞")]),s._v(" "),a("ol",[a("li",[s._v("阻塞后续DOM解析：\n原因：浏览器不知道后续脚本的内容，如果先去解析下面的DOM，而随后的js删除了后面所有DOM，\n那么浏览器就做了无用功，浏览器无法预估脚本里面具体做了什么操做。")]),s._v(" "),a("li",[s._v("阻塞页面渲染：\n原因：js中也可以给DOM设置样式，浏览器等该脚本执行完毕，渲染出一个最终结果，避免做无用功。")]),s._v(" "),a("li",[s._v("阻塞后续js的执行：\n原因：维护依赖关系，例如：使用bootstrap不许引用jquery")])]),s._v(" "),a("h3",{attrs:{id:"备注"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#备注"}},[s._v("#")]),s._v(" 备注")]),s._v(" "),a("ol",[a("li",[s._v("css的解析和js是互斥的，css解析的时候js停止工作，js解析的时候css停止工作。")]),s._v(" "),a("li",[s._v("无论css阻塞还是js阻塞，都不会阻塞浏览器加载外部资源（蹄片，视频，样式，脚本等）\n原因：浏览器始终处于一种“先把请求发出去”的工作模式，只要涉及到网络请求的内容，无论是图片，样式\n脚本都会先发送请求去获取资源，至于资源到本地如何使用，由浏览器自己协调，这种做法效率很高。")])])])}),[],!1,null,null,null);t.default=n.exports}}]);