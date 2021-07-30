# vue2 基础

## computed 和 watch

- computed 有缓存 data 不变则不会重新计算
- watch 如何深度监听

## v-if 和 v-for 为啥不能一起使用

关于这个问题我们可以先看看模版编译后的 render 函数

```js
const compiler = require("vue-template-compiler");
// v-if
const v_if = `<p v-if="show">{{ item }}</p>`;
const str1 = compiler.compile(v_if);
console.log(str1)
// with(this){return (show)?_c('p',[_v(_s(item))]):_e()}

// v-for
const v_for = `
    <ul>
        <li v-for="item in list">{{ item.value }}</li>
    </ul>
`;
const str2 = compiler.compile(v_for);
console.log(str2);
// with(this){return _c('ul',_l((list),function(item){return _c('li',[_v(_s(item.value))])}),0)}

// v-for + v-if

const v_for_if = `
    <ul>
        <li v-for="item in list" v-if="item.show">{{ item.value }}</li>
    </ul>
`;
const str3 = compiler.compile(v_for_if);
console.log(str3);

// 正确的写法1
const template= `
    <ul>
        <li v-for="item in list" >
            <div v-if="item.show">{ item.value }}</div> {
        </li>
    </ul>
`;
// 正确写法二使用computed
export default {
    computed() {
        showList() {
            return list.map(item=>item.show)
        }
    }
}
// with(this){return _c('ul',_l((list),function(item){return (item.show)?_c('li',[_v(_s(item.value))]):_e()}),0)}
```

过程分析：我们可以发现<font color=red>v-for</font>其实就是执行了`_l((list),function(item){return (item.show)?_c('li',[_v(_s(item.value))]):_e()}),0)`，而<font color=red>v-if</font>其实在`_l`函数内部又执行了一次 if 判断，这样就好造成性能的损耗，所以一般不建议这样写。

结论：**v-for 的优先级高于 v-if**

## vue 父子组件如何通讯

1. 使用`props`进行数据的传递，使用`$emit`对事件进行发布订阅

Parent 组件

```vue
<template>
  <div>
    <p>我是父组件</p>
    <Child @child-click="childClick" :mssage="msg"></Child>
  </div>
</template>
<script>
export default {
  name: "Parent",
  data() {
    return {
      msg: "父组件传递",
    };
  },
  methods: {
    childClick(value) {
      console.log(value);
    },
  },
};
</script>
```

child 组件

```vue
<template>
  <div class="child-component" @click="childClick">
    子组件 <br />
    父组件传递的参数：{{ message }}
  </div>
</template>
<script>
export default {
  name: "Child",
  props: ["message"],
  data() {
    return {};
  },
  methods: {
    childClick() {
      this.$emit("child-click", { a: 1 });
    },
  },
};
</script>
```

2. 使用 ref 调用组件方法
   当然还有其他的方式这里不一一列举了，这里主要是项目中常用的

## 如何自定义事件进行 vue 组件通讯

**使用`events`**

1.  创建`events.js`

```js
import Vue from "vue";
const Events = new Vue();
export default Events;
```

2.  在`main.js`进行引入并使用 use 方法载入 Vue 实例中

```js
import Vue from "vue";
import Events from "./events";
Vue.use(Events);
// 为了方便使用直接挂载在Vue的实例上
Vue.prototype.$events = Events;
```

3. 使用上述 demo 进行测试
   Parent 组件

```vue
<template>
  <div>
    <p @click="testBus">我是父组件</p>
    <Child :mssage="msg"></Child>
  </div>
</template>
<script>
export default {
  name: "Parent",
  data() {
    return {
      msg: "父组件传递",
    };
  },
  methods: {
    testBus() {
      this.$events.$emit("test", { b: 2 });
    },
  },
  beforeDestroy() {
    // 解除订阅事件
    this.$events.off("test");
  },
};
</script>
```

child 组件

```vue
<template>
  <div class="child-component">
    子组件 <br />
    父组件传递的参数：{{ message }}
  </div>
</template>
<script>
export default {
  name: "Child",
  props: ["message"],
  data() {
    return {};
  },
  created() {
    this.$events.$on("test", (value) => {
      console.log(value); // {a: 1}
    });
  },
};
</script>
```

## vue 父子组件生命周期调用顺序

## vue 如何如何实现 v-model

```vue
<template>
  <div>
    <input type="text" :value="text" @input="$emit('change', $event.target.value)"></input>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'text', // 与下边的props保持一致
      event: 'change'
    },
    props: {
      text: String
    }
  }
</script>
```

[参考 vue 官方文档链接](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

## vue 组件跟新之后如何获取最新的 dom

可以使用 this.\$nextTick，官方文档是这么说的：**将回调延迟到下次 DOM 更新循环之后执行。**，通俗的说也就是 dom 更新完成之后执行，
可以理解成 vue 在进行页面渲染的时候其实是进行了一个批处理的，因为 data 会有多次更新，当数据更新完成（相当于是批处理了），我们再去渲染页面，这样可以节省浏览器渲染 dom 的开销，从而提升性能。

```vue
...
<script>
export default {
  methods: {
    example() {
      this.$nextTick(() => {
        // DOM现在更新了
      });
    },
  },
};
</script>
```

## slot

[官方文档地址](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)

### 一般插槽

Child 组件

```vue
<template>
  <div>
    <slot>
      默认插槽
    </slot>
  </div>
</template>
```

Parent 组件

```vue
<template>
  <div>
    <child>
      <p>填充内容</p>
    </child>
  </div>
</template>
```

### 具名插槽

Child 组件

```vue
<template>
  <div>
    <slot name="header">
      默认插槽
    </slot>
  </div>
</template>
```

Parent 组件

```vue
<template>
  <div>
    <child>
      <!-- 使用方式一 -->
      <template #header>
        <p>填充内容</p>
      </template>
      <!-- 使用方式二 -->
      <div slot="header">填充内容</div>
    </child>
  </div>
</template>
```

### 作用域插槽

Child 组件

```vue
<template>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</template>
<script>
export default {
  data() {
    return {
      user: {
        lastName: "sss",
        firstName: "xxx",
      },
    };
  },
};
</script>
```

Parent 组件

```vue
<template>
  <div>
    <Child>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </Child>
  </div>
</template>
```

`v-slot:default="slotProps"`需要注意以下点：

- 如果`<slot v-bind:user="user">`没有`name`直接使用`v-slot:default`，否则使用 v-slot:[name]，即`<slot name="content" v-bind:user="user">`，`<template v-slot:content="slotProps">`
- slotProps 可任意定义

### 解构插槽

Parent 组件

```vue
<template>
  <Child>
    <template v-slot:default="{ user }">
      {{ user.firstName }}
    </template>
  </Child>
</template>
```

## vue 动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里，尽行 tab 切换，这个时候`component`组件就很有用了。

```vue
<template>
  <div>
    <component :is="'HelloWorld'" v-bind="{ message: 'ssss' }"></component>
  </div>
</template>
```

知识点：

1. 使用`is`进行组件的绑定，is 后面可以是**已注册组件的名字**，或者**一个组件的选项对象**
2. 使用`v-bind`传递 props

## vue 异步加载组件

```js
export default {
  components: {
    HelloWorld: () => import("../components/HelloWorld.vue"),
  },
};
```

使用`import()`方式进行异步加载组件，与路由懒加载一致

## vue 缓存

使用`keep-alive`

```vue
<template>
  <div>
    <keep-alive>
      <Component1 v-if="p === 1"></Component1>
      <Component2 v-else-if="p === 2"></Component2>
      <Component3 v-else></Component3>
    </keep-alive>
  </div>
</template>
```

## vue 组件抽离公共逻辑

使用 mixins
优点：

- 抽离公共方法，避免重复业务逻辑
  缺点：
- 随着 mixins 的增加，会给阅读代码增加一些困难
