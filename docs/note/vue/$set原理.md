# Vue.\$set 原理

**Vue.\$set 解决了什么问题**

在 Vue.js 中只有 data 中已经存在的数据才会被 Observe 为响应式数据，如果你是新增的属性是不会成为响应式数据的，因此 Vue 提供了一个 api(Vue.\$set())来解决这个问题。

来看一个例子：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Vue Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      {{user.name}} {{user.age}}
      <button @click="addUserAgeField">增加一个年纪字段</button>
    </div>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          user: {
            name: "test",
          },
        },
        mounted() {},
        methods: {
          addUserAgeField() {
            // this.user.age = 20 这样是不起作用, 不会被Observer
            this.$set(this.user, "age", 20); // 应该使用
          },
        },
      });
    </script>
  </body>
</html>
```

## 原理

Vm.\$set 在 new Vue()就被注入到 Vue 的原型上。

- 源码位置：

```shell
vue/src/core/instance/index.js
```

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

initMixin(Vue);
// 给原型绑定代理属性$props, $data
// 给Vue原型绑定三个实例方法: vm.$watch，vm.$set，vm.$delete
stateMixin(Vue);
// 给Vue原型绑定事件相关的实例方法: vm.$on, vm.$once ,vm.$off , vm.$emit
eventsMixin(Vue);
// 给Vue原型绑定生命周期相关的实例方法: vm.$forceUpdate, vm.destroy, 以及私有方法_update
lifecycleMixin(Vue);
// 给Vue原型绑定生命周期相关的实例方法: vm.$nextTick, 以及私有方法_render, 以及一堆工具方法
renderMixin(Vue);

export default Vue;
```

- stateMixin()

```js
Vue.prototype.$set = set;
Vue.prototype.$delete = del;
```

- set()
  源码位置:

```shell
vue/src/core/observer/index.js
```

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // 1.类型判断
  // 如果 set 函数的第一个参数是 undefined 或 null 或者是原始类型值，那么在非生产环境下会打印警告信息
  // 这个api本来就是给对象与数组使用的
  if (
    process.env.NODE_ENV !== "production" &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(
      `Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`
    );
  }
  // 2.数组处理
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 类似$vm.set(vm.$data.arr, 0, 3)
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    //如果不设置length，splice时，超过原本数量的index则不会添加空白项
    target.length = Math.max(target.length, key);
    // 利用数组的splice变异方法触发响应式, 这个前面讲过
    target.splice(key, 1, val);
    return val;
  }
  //3.对象，且key不是原型上的属性处理
  // target为对象, key在target或者target.prototype上。
  // 同时必须不能在 Object.prototype 上
  // 直接修改即可, 有兴趣可以看issue: https://github.com/vuejs/vue/issues/6845
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = (target: any).__ob__;
  // Vue 实例对象拥有 _isVue 属性, 即不允许给Vue 实例对象添加属性
  // 也不允许Vue.set/$set 函数为根数据对象(vm.$data)添加属性
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" &&
      warn(
        "Avoid adding reactive properties to a Vue instance or its root $data " +
          "at runtime - declare it upfront in the data option."
      );
    return val;
  }
  //5.target是非响应式数据时
  // target本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  //6.target对象是响应式数据时
  //定义响应式对象
  defineReactive(ob.value, key, val);
  //watcher执行
  ob.dep.notify();
  return val;
}
```

- 工具函数

```js
// 判断给定变量是否是未定义，当变量值为 null时，也会认为其是未定义
export function isUndef(v: any): boolean %checks {
  return v === undefined || v === null;
}

// 判断给定变量是否是原始类型值
export function isPrimitive(value: any): boolean %checks {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

// 判断给定变量的值是否是有效的数组索引
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
```

- 关于 ob&ob.vmCount

```js
export function observe(value: any, asRootData: ?boolean): Observer | void {
  // 省略...
  if (asRootData && ob) {
    // vue已经被Observer了,并且是根数据对象, vmCount才会++
    ob.vmCount++;
  }
  return ob;
}
```

- 初始化 Vue 的过程中有

```js
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    //opts.data为对象属性
    initData(vm);
  } else {
    observe((vm._data = {}), true /* asRootData */);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

- initData(vm)

```js
function initData(vm: Component) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};

  // 省略...

  // observe data
  observe(data, true /* asRootData */);
}
```

从源码处知道 set 方法的主要逻辑如下：

1. 判断类型
2. target 为数组调用 splice 方法
3. target 为对象，且 key 不是原型对象上的属性，直接修改
4. target 不能是 Vue 实例，或者 Vue 实例的根数据对象，否则报错
5. target 是非响应式数据时，我们就按照普通对象添加属性的方式来处理
6. target 为响应数据，且**key 为新增属性**，我们 key 设置为响应式，并手动触发其属性值的更新

## 总结

vm.$set(target,key,value)

- 当 target 为数组时，直接调用数组方法 splice 实现；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式
  defineReactive 方法进行响应式处理
    - defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProterty 动态添加 getter 和 setter 的功能所调用的方法
