# nextTick

## 用法
在下次 DOM 更新循环结束之后执行延迟回调。
1. 两种写法
```js

Vue.$nextTick(()=> {

})
Vue.$nextTick().then(()=> {

})

```
2. 使用场景
    - 在beforeCreate或created中使用
    ```js
    created() {
        this.$nextTick(()=> {
            console.log(this.$el)
        })
    }
    ```
    - 修改数据后及时获取DOM的数据
    ```js
    this.newValue = 'xxxx'
    this.$nextTick(()=> {
        console.log(document.getelementById('#id').innerHTML)
    })
    ```
3. nextTick源码实现
```js
// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
可以看到上面有几个条件判断:
- 优先使用原生的Promsie
- 在判断MutationObserver
- 然后判断setImmdiate
- 最后使用setTimeout


<!-- ## 你能说一说 Vue 的 patch 算法吗？
Vue 的 patch 算法有三个作用：负责首次渲染和后续更新或者销毁组件
  - 如果老的 VNode 是真实元素，则表示首次渲染，创建整棵 DOM 树，并插入 body，然后移除老的模版节点
  - 如果老的 VNode 不是真实元素，并且新的 VNode 也存在，则表示更新阶段，执行 patchVnode
    - 首先是全量更新所有的属性
    - 如果新老 VNode 都有孩子，则递归执行 updateChildren，进行 diff 过程
      >针对前端操作 DOM 节点的特点进行如下优化：

      - 同层比较（降低时间复杂度）深度优先（递归）
      - 而且前端很少有完全打乱节点顺序的情况，所以做了四种假设，假设新老 VNode 的开头结尾存在相同节点，一旦命中假设，就避免了一次循环，降低了 diff 的时间复杂度，提高执行效率。如果不幸没有命中假设，则执行遍历，从老的 VNode 中找到新的 VNode 的开始节点
      - 找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置
    - 如果老的 VNode 先于新的 VNode 遍历结束，则剩余的新的 VNode 执行新增节点操作
    - 如果新的 VNode 先于老的 VNode 遍历结束，则剩余的老的 VNode 执行删除操纵，移除这些老节点
    - 如果新的 VNode 有孩子，老的 VNode 没孩子，则新增这些新孩子节点
    - 如果老的 VNode 有孩子，新的 VNode 没孩子，则删除这些老孩子节点
    - 剩下一种就是更新文本节点
  - 如果新的 VNode 不存在，老的 VNode 存在，则调用 destroy，销毁老节点 -->