# 前端性能优化RAIL
<!-- 链接：https://juejin.cn/post/6967156013464027143 -->
- FCP（First Contentful Paint）白屏时间，值越低越好；
- SI（Speed Index）页面渲染时间，值越低越好；
- LCP（Largest Contentful Paint）可视窗口最大内容渲染时间，值越低越好
- TTI（Time to Interactive）用户可交互时间，值越低越好；
- TBT（Total Blocking Time）用户行为阻塞时间，值越低越好；
- CLS（Cumulative Layout Shift）可视窗口中累计可见元素布局偏移；
- FID（First Input Delay）用户首次交互时间，值越低越好

## FCP白屏时间
白屏时间是指用户在浏览器打开页面到渲染第一个DOM元素所花费的时间，DOM元素包括图片，非空白canvas，SVG等元素，不包含iframe中的元素

### FCP优化策略

1. DNS解析优化，DNS缓存优化，DNS预加载在策略，稳定可靠的DNS服务器

2. 服务端处理优化，Redis缓存，数据库存储优化或是系统的各种中间件以及Gzip压缩等

3. CDN加速

4. 精简DOM结构，合理压缩和放置css，js

5. 字体加载优化

```js
@font-face {
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');
  font-display: swap;//注意这里
}
```
浏览器经常会出现一些出乎我们意料的问题，而字体的加载就是其中之一。大多数浏览器在自定义字体还未下载之前会先隐藏文本。一般情况下，我们可能没有感知，但是网速较慢的情况下可以看到，大部分浏览器会隐藏文本一定时间直到字体加载完成，如果字体没有加载完成，甚至不会显示文本。

这个时候font-display属性就起到作用了，具体如上代码。它不仅提供了自定义字体和内容的可访问性之间的最佳平衡，还提供了和使用JavaScript脚本相同的字体加载行为。当然，这个属性存在一定的兼容性，但是问题不大。

如果字体肯定会用到，我们甚至可以预加载字体。

```js
<link rel="preload" as="font">
```

### SI(Speed Index)页面内容呈现的速度

1. 优化主进程，包括解析HTML，创建DOM树，解析CSS，执行JavaScript
2. 优化第三方JavaScript
3. 利用防抖优化用户输入事件
4. 利用web worker
5. 减少复杂的样式计算和嵌套
6. 避免大的，复杂的布局和布局回流
7. 简化页面绘制和减少绘制区域
8. 减少冗余代码
9. 异步加载非必要的css

 ```js
 <noscript><link rel="stylesheet" href="styles.css"></noscript>
 ```

### LCP(最大内容渲染速度)
哪些元素可能是最大的？
- 图片
- 里面的图片
- 带有通过url加载北京图片的元素，不包括css gradient

注意：只有当元素在可视窗口才可能被认为渲染内容，最大元素是可变的。

<!-- **如何监测最大元素**
```js

``` -->

<!-- https://light-dev.ghzq.com.cn/light/h5/ymuoitjpl/index.html#/index/loading?callback=https://light-dev.ghzq.com.cn/WebReport/ReportServer?formlet=ghzq-erqi/ghzq-erqi/oahome/oahome-gr-cs.frm -->