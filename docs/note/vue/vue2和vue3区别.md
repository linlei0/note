# vue2 和 vue3

## vue2 和 vue3 有什么区别

beforeDestory 改为 beforeUnmont

destoryed 改为 unmonted

其他继续沿用

## 如何理解 Composition API 和 Options API

### Composition API 带来了什么

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

### 如何选择

- 不建议共用，会引起混乱
- 小型项目，业务逻辑简单 Options API
- 中大型项目，逻辑复杂，用 Composition API

### 如何正确理解 Composition API

- Composition API 属于高阶技巧，不是基础必会
- Composition API 是为了解决复杂业务逻辑设计
- Composition API 就像 Hooks 在 react 中的地位

### 如何理解 ref toRef 和 toRefs

**ref**

- 生成值类型的响应式数据
- 可用于模版和 reactive
- 通过.vaule 修改值
- 可以获取到 dom 元素

**toRef**

**toRefs**

**为何需要 ref**

返回值类型，会丢失响应式

如在 setup，computed，合成函数，都有可能返回值类型

vue 如果不定义 ref，用户将自造 ref，反而混乱

**为何需要.value**

可以用 computed 来做讲解


**vue3 升级了那些重要功能**

- createApp
- emits 属性
- fragment
  组件不必包裹在 div
- 移除了.sync

  <!--v2-->

  <MyComponent :title.sync="title"></MyComponent>

  <!--v3-->

  <MyComponent v-model.title="title"></MyComponent>

- 异步组件
  <!--v2-->

```js
export default {
  componets: {
    "my-component": () => import("../a.vue"),
  },
};
```

<!--v3-->

```js
import { defineComponent, ref, defineAsyncComponent } from "vue";
export default {
  componets: {
    "my-component": defineAsyncComponent(() => import("../a.vue")),
  },
};
```

- 移除 filter

- teleport

```vue
<template>
  <teleport to="body">
    <div>body</div>
  </teleport>
</template>
```

- Suspense

```vue
<template>
  <Suspense>
    <template>
      <Test1></Test1>
    </template>
    <template #fallback>
      loading...
    </template>
  </Suspense>
</template>
```

- composition Api

  - reative
  - ref 相关
  - readonly
  - watch 和 watchEffect
  - setup
  - 生命周期钩子函数

  **compositon Api 实现逻辑复用**

  - 抽离逻辑代码到一个函数
  - 函数命名约定为 useXxx（React Hooks 也是）
  - 在 setup 中引用

  **vue 如何实现响应式**

  **v-model 参数用法**

  **watch 和 watchEffect 的区别**

  - 两者都可以监听 data 属性变化
  - watch 需要明确的属性
  - wacth 需要指定监听的属性，watchEffect 内部写的什么就监听什么

  **setup 获取组件实例**

  getCurrentInstance

  **vue3 为何比 vue2 快**

  - Proxy 响应式
  - PatchFlag
    - 编译模版时，动态节点做标记
    - 标记，分为不同的类型，如 TEXT PROPS
    - diff 算法时，可以区分静态节点，以及不同类型的动态节点
  - hoistStatic
    - 将静态节点的定义，提升到副作用域，缓存起来
    - 多个相邻的静态节点，会被合并起来
    - 拿空间换时间的策略
  - cacheHandler
    - 缓存事件
  - SSR 优化
    - 静态节点直接输出，绕过 vdom
    - 动态节点仍然需要渲染
  - tree-shaking
    - 编译的时候根据不同的情况引入不同的 API

**Vite**

- Vite 是什么？
  - 一个前端打包工具
- Vite 为什么启动快？
  - 开发环境使用 ES6 Module，无需打包，非常快
  - 生产环境使用 rollup，并不会快很多

**Composition API 和 React Hooks 对比**

- 前者 setup 只会被调用一次，后者会被多次调用
- 前者无需 useMemo use Callback，因为 setup 只调用一次
- 前者无需考虑调用顺序，而后者需要保证 hooks 的调用顺序一致
- reactive + ref 比 useState 更难理解


```shell
// 原来的origin暂时先保留
// origin-net 可以为任意
git remote add origin-net 'http://xxx.xxx.xxxx:5678/haosong/insight-stage.git'
git add .
git commit -m 'xxx'
git pull origin-net dev-mobile
git push origin-net dev-mobile
 
```