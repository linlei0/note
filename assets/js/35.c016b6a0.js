(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{407:function(s,t,a){"use strict";a.r(t);var n=a(45),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"前端性能优化rail"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端性能优化rail"}},[s._v("#")]),s._v(" 前端性能优化RAIL")]),s._v(" "),a("ul",[a("li",[s._v("FCP（First Contentful Paint）白屏时间，值越低越好；")]),s._v(" "),a("li",[s._v("SI（Speed Index）页面渲染时间，值越低越好；")]),s._v(" "),a("li",[s._v("LCP（Largest Contentful Paint）可视窗口最大内容渲染时间，值越低越好")]),s._v(" "),a("li",[s._v("TTI（Time to Interactive）用户可交互时间，值越低越好；")]),s._v(" "),a("li",[s._v("TBT（Total Blocking Time）用户行为阻塞时间，值越低越好；")]),s._v(" "),a("li",[s._v("CLS（Cumulative Layout Shift）可视窗口中累计可见元素布局偏移；")]),s._v(" "),a("li",[s._v("FID（First Input Delay）用户首次交互时间，值越低越好")])]),s._v(" "),a("h2",{attrs:{id:"fcp白屏时间"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fcp白屏时间"}},[s._v("#")]),s._v(" FCP白屏时间")]),s._v(" "),a("p",[s._v("白屏时间是指用户在浏览器打开页面到渲染第一个DOM元素所花费的时间，DOM元素包括图片，非空白canvas，SVG等元素，不包含iframe中的元素")]),s._v(" "),a("h3",{attrs:{id:"fcp优化策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fcp优化策略"}},[s._v("#")]),s._v(" FCP优化策略")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("DNS解析优化，DNS缓存优化，DNS预加载在策略，稳定可靠的DNS服务器")])]),s._v(" "),a("li",[a("p",[s._v("服务端处理优化，Redis缓存，数据库存储优化或是系统的各种中间件以及Gzip压缩等")])]),s._v(" "),a("li",[a("p",[s._v("CDN加速")])]),s._v(" "),a("li",[a("p",[s._v("精简DOM结构，合理压缩和放置css，js")])]),s._v(" "),a("li",[a("p",[s._v("字体加载优化")])])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@font-face")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-family")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Pacifico'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" normal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-weight")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 400"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("src")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("local")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Pacifico Regular'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("local")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Pacifico-Regular'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("format")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'woff2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" swap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("//注意这里\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("浏览器经常会出现一些出乎我们意料的问题，而字体的加载就是其中之一。大多数浏览器在自定义字体还未下载之前会先隐藏文本。一般情况下，我们可能没有感知，但是网速较慢的情况下可以看到，大部分浏览器会隐藏文本一定时间直到字体加载完成，如果字体没有加载完成，甚至不会显示文本。")]),s._v(" "),a("p",[s._v("这个时候font-display属性就起到作用了，具体如上代码。它不仅提供了自定义字体和内容的可访问性之间的最佳平衡，还提供了和使用JavaScript脚本相同的字体加载行为。当然，这个属性存在一定的兼容性，但是问题不大。")]),s._v(" "),a("p",[s._v("如果字体肯定会用到，我们甚至可以预加载字体。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("link rel"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"preload"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("as")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"font"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"si-speed-index-页面内容呈现的速度"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#si-speed-index-页面内容呈现的速度"}},[s._v("#")]),s._v(" SI(Speed Index)页面内容呈现的速度")]),s._v(" "),a("ol",[a("li",[s._v("优化主进程，包括解析HTML，创建DOM树，解析CSS，执行JavaScript")]),s._v(" "),a("li",[s._v("优化第三方JavaScript")]),s._v(" "),a("li",[s._v("利用防抖优化用户输入事件")]),s._v(" "),a("li",[s._v("利用web worker")]),s._v(" "),a("li",[s._v("减少复杂的样式计算和嵌套")]),s._v(" "),a("li",[s._v("避免大的，复杂的布局和布局回流")]),s._v(" "),a("li",[s._v("简化页面绘制和减少绘制区域")]),s._v(" "),a("li",[s._v("减少冗余代码")]),s._v(" "),a("li",[s._v("异步加载非必要的css")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("noscript"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("link rel"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"stylesheet"')]),s._v(" href"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"styles.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("noscript"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"lcp-最大内容渲染速度"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lcp-最大内容渲染速度"}},[s._v("#")]),s._v(" LCP(最大内容渲染速度)")]),s._v(" "),a("p",[s._v("哪些元素可能是最大的？")]),s._v(" "),a("ul",[a("li",[s._v("图片")]),s._v(" "),a("li",[s._v("里面的图片")]),s._v(" "),a("li",[s._v("带有通过url加载北京图片的元素，不包括css gradient")])]),s._v(" "),a("p",[s._v("注意：只有当元素在可视窗口才可能被认为渲染内容，最大元素是可变的。")])])}),[],!1,null,null,null);t.default=r.exports}}]);