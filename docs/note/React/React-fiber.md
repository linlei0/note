# React-fiber

## 背景

- react 在组件渲染的时候，从 setState 开始到渲染完成整个过程是同步的。如果需要渲染的组件比较庞大，js 执行会占据主线程，会导致页面响应度变差，使得 react 在动画，手势等应用中效果比较差。
- 页面卡顿：Stack 。父组件调用子组件，可以类比为函数的递归；对于特别庞大的 vDOM 树来说，reconciliation 过程会很长，超过 16ms，在这期间，主线程是被 js 占用的，因此任何交互，布局，渲染都会停止，给用户造成页面被卡住的感觉。

## 实现原理

旧版本 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，他会一直执行到栈空为止。使用的是 JS 引擎自身的函数调用栈，他会一直执行到栈空为止。而 Fiber 实现了自己的组件调用栈，它以链表的形式组件树，可以灵活的暂停，继续和丢弃执行的任务。实现方式是使用了浏览器的 requestldleCallback 的这个 API。Fiber 其实指的是一种数据结构，他可以用一个纯 JS 对象来表示：

```js
const fiber = {
  stateNode,
  child,
  sibling,
  return,
};
```

- react 内部转运分三层：

  - Vitrual DOM 描述页面长什么样
  - Reconciler 层，负责调用组件生命周期方法，进行 DOM 方法
  - render 层，渲染出相应的页面

- 为了实现不卡顿，就需要有一个调度器（Scheduler）来进行任务分配。优先级高的任务可以打断优先级低的任务的执行，从而更快生效。任务的优先级有 6 种：
  - synchronous，与之前的 Stack 操作一样同步执行
  - task，在 next Tick 之前执行
  - high，在不久的将来立即执行
  - low，稍微延迟执行也没关系
  - offscreen，下一次 render 时或 scroll 时才执行
- fiber Reconciler（react）执行阶段：
  - 阶段一，生成 Fiber 数，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断
  - 阶段二，将需要更新的节点，一次过批量更新，这个过程不能被打断
- Fiber Reconciler 在阶段一进行 Diff 计算的时候，会基于 Vitual DOM 树生成一颗 Fiber 树，他的本质是链表
- 从 Stack Reconciler 到 Fiber Reconciler，源码层面其实就做了一件事递归改循环
