## nuxt 基础使用

## 安装

```
yarn create nuxt-app <项目名>
or
npx create-nuxt-app <项目名>
```

## 目录说明

- 1.资源目录
  资源目录 assets 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript。

- 2.组件目录
  组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。

- 3.布局目录
  布局目录 layouts 用于组织应用的布局组件。
  若无额外配置，该目录不能被重命名。

- 4.中间件目录
  middleware 目录用于存放应用的中间件

- 5.页面目录
  页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。

若无额外配置，该目录不能被重命名。

- 6.插件目录
  插件目录 plugins 用于组织那些需要在 根 vue.js 应用 实例化之前需要运行的 Javascript 插件。

- 7.静态文件目录
  静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。

举个例子: /static/robots.txt 映射至 /robots.txt

若无额外配置，该目录不能被重命名。

- 8.Store 目录
  store 目录用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置。

若无额外配置，该目录不能被重命名。

## 生命周期

### 服务器端生命周期

nuxtServerInit // 服务器初始化

运行在 store 的目录下，首先创建 index.js

```js
export const actions = {
  nuxtServerInit(store, context) {
    console.log(store, context);
  },
};
```

middleware // 中间件运行

- 1.可以在 nuxt.config.js 中进行配置,然后在 middleware 的文件夹中创建 auth.js

```js
// nuxt.config.js
// 类是全局守卫
router: {
  middleware: "auth"; //
}
```

```js
// auth.js
// 类是全局守卫
router: {
  middleware: "auth";
}
```

- 2.也可以在 layout 中使用

```js
// middleware: 'auth', // 页面层级中的定义
  middleware() {
    console.log('middleware layout');
  }
}
```

- 3.也可以在 pages 中使用

```js
middleware() {
    console.log('middleware pages')
}
```

运行结果

```
nuxt middleware nuxt.config.js outside
middleware layout
middleware pages
```

从上我们看到顺序是 nuxt.config.js -> layout(匹配布局) -> pages(匹配页面)

validate // 校验参数

在 pages 中使用如果校验通过返回 true，否则返回 false

```js
validate({params,query}) {
    console.log(params,query)
    return true
  }
```

asyncData // 读取数据，返回给组件
最后我们会发现 asyncData 会合并到 data 中也就是{ a: 1, b: 2 }

```js
data() {
    return {
        a: 1
    }
},
asyncData() {
    return {
        b: 2
    }
}
```

fetch // 读取数据，返回给 vuex

同 asyncData 类是

render // 开始客户端渲染

### 客户端生命周期

beforeCreate && creatd

和 spa 中一样，只不过在服务器端也会渲染

mounted,update...

和 spa 中一样，服务端不会渲染

**需要注意的是在服务端渲染中是不存在 window 的包括 beforeCreate，created**

## 约定式路由

路由的页面都放在 pages 路径下

### 一级路由的配置

比如我们在 pages 下创建一级路由页面 login，reg，goods 等等其他页面，此时我们便可以在 layouts 的 dafault.vue 使用 nuxt-link 进行跳转了。

```vue
<template>
  <div>
    <!-- 跳转 nuxt-link  router-link -->
    <nuxt-link to="/goods">goods</nuxt-link>

    <nuxt-link to="/login">login</nuxt-link>
    <!-- 展示区 router-view -->
    <Nuxt />
  </div>
</template>
```

### 多级路由的配置

比如我们现在已经已经有了 goods 商品列表了那么我们如果需要商品列表展示呢？此时就需要配置多级路由了。
那么我们就需要在 pages 下建立 goods 文件夹，然后创建\_id.vue 文件，在 goods.vue 文件中使用 nuxt-link 进行配置,记得不要忘记使用 nuxt 进行展示

```vue
<template>
  <div>
    goods
    <nuxt-link to="/goods/1?&a=1">商品列表1</nuxt-link>
    <nuxt-link to="/goods/2?&a=2">商品列表2</nuxt-link>
    <!-- name: 路劲名+文件名 (不需要_)  params: 文件名 -->
    <nuxt-link :to="{ name: 'goods-id', params: { id: 1 }, query: { a: 1 } }"
      >商品列表3</nuxt-link
    >
    <nuxt-link to="/goods/comment">评论</nuxt-link>

    <nuxt />
  </div>
</template>
```

如果我们需要做一个商品的评论列表那么我们就要首先在 foods 下创建一个 comment.vue 文件同时在 doods.vue 中加入路由跳转，同时我们也需要评论详情，所有需要在 goods 下创建 comment 文件夹同时创建\_uid.vue 文件，接下来在 comment.vue 文件中写入如下内容,那么我们的多级路由就创建完成了。

```vue
<template>
  <div>
    <nuxt-link to="/goods/comment/1?a=1">评论详情1</nuxt-link>
    <nuxt-link
      :to="{ name: 'goods-comment-uid', query: { uid: 1 }, params: { c: 1 } }"
      >评论详情2</nuxt-link
    >
    <nuxt />
  </div>
</template>
```

### 展示区层级控制

| PATH             | FILE              |
| :--------------- | ----------------- |
| `/`              | `index.vue` -     |
| `/goods`         | `goods/index.vue` |
| `/goods/123`     | `goods/_id.vue`   |
| `/goods/comment` | `goods/comment`   |

pages / 一级页面 / 二级页面
/index/vue 在一级页面展示
/ index.vue 空文档 代表有默认页面 不会找寻其他 \_id.vue 页面

### 扩展路由

首先我们看到我们的 layout/default.vue 现在的内容如下：

```vue
<template>
  <!-- 跳转 nuxt-link  router-link -->
  <div>
    <!-- 跳转 nuxt-link  router-link -->
    <!--  exact-active-class -->
    <nuxt-link to="/" active-class="header-active">首页</nuxt-link>

    <nuxt-link to="/goods" active-class="header-active">goods</nuxt-link>

    <nuxt-link to="/login" active-class="header-active">login</nuxt-link>
  </div>
</template>
<style scoped>
.header-active {
  background-color: red;
  color: blue;
}
</style>
```

我们发现无论我们访问那个路由 / 都会存在 active-class，原因是因为我们使用的是匹配导致 / 都会被匹配到，如果我们不想这样那么我们可以使用 exact-active-class,这个是一种解决方案，同时我们也可以在 nuxt.config.js 中进行配置，找到 router 配置项,配置如下：

```js
 router: {
    middleware: 'auth',
    extendRoutes(routes,resolve) {
      console.log(routes)
      routes.push({
        name: 'root', // 别名
        path: '/index', //地址栏访问的路由
        component: resolve(__dirname, 'pages/index.vue') // 相对目录
      })
    }
  }
```

同时需要将 layout/default.vue 中的/改为/inde 即可，我们访问/index 就行

```
   <nuxt-link to="/index" active-class="header-active">首页</nuxt-link>
```

### 参数校验错误，路由定制同意定制

当我们用到参数校验的时候我们我们可以在 comment/\_uid.vue 使用生命周期函数 validate 进行处理如下即可,那么当我们传过来的 params 的 uid 是非 number 的时候就会被拒绝访问，使用 nuxt 自带的 error 页面。

```js
 validate({params, query}) {
        console.log(params,query)
        return typeof params.uid === 'number'
    }
```

如果我们需要使用自定义的 error 页面那么我们只需要在 layout 下创建一个 error.vue 即可,注意 props 接收的参数 error

```vue
<template>
  <div>
    <h1 v-if="error.message">
      {{ error.message }}
    </h1>
    <h1 v-else>
      应用发生异常
    </h1>
    <button @click="$router.replace('/index')">
      回到首页
    </button>
  </div>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
};
</script>
```

当我们需要使用统一动效时我们可以使用 nuxt 自动的进场和离场的 class,我们首先在 assets 下建立一个 style 文件夹，并创建一个 transition.css 文件

```css
/* 路由统一动效 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

同时在 nuxt.config.js 中配置如下,就可以实现一个淡入淡出的动画效果了

```js
css: ["assets/style/transition.css"];
```

如果我们想实现单个页面的动画效果只需要单个页面中配置 transition: 'test'(test 现在相当于全局的.page-xxx)，在写入 css 的动画代码即可

## 路由守卫

- 前置：依赖中间件 middleware， 插件
  middleware：通过前面生命周期的学习我们知道可以有多种使用 middleware 的方法，同时在这些方法里面我们也可以使用路由守卫，如果是在项目的 middleware 中是使用则是全局路由守卫，如果是在单个页面中使用则是单个页面的路由守卫

  插件：
  首先我们在 plugins 目录下创建 router.js,然后在 nuxt.config.js 中配置 plugins

  ```js
  {
    plugins: ["~/plugins/router"];
  }
  ```

  然后在 router.js 中写入如下内容

```js
export default ({ app, redirect }) => {
  // console.log('plugin')

  app.router.beforeEach((to, from, next) => {
    console.log("前置路由守卫", to);

    if (to.name === "login" || to.name === "goods") {
      next();
    } else {
      redirect("/login");
    }
    // next()
  });

  app.router.afterEach((from, to) => {});
};
```

- 后置：使用插件，使用 vue 的 beforeRouteLeave 钩子

  使用插件，依然使用上面 router.js 的代码

  使用 beforeRouterLeave

```js
export default {
  beforeRouteLeave(to, from, next) {
    const confirm = window.confirm("是否离开");
    next(confirm);
  },
};
```

## 数据交互

安装@nuxtjs/axios @nuxtjs/proxy

然后在 nuxt.config.js 中配置我们的插件

```js
{
  modules: ["@nuxtjs/axios"];
}
```

使用的时候我们用模拟数据，在 static 创建 data/list.json,然后在 login.vue 中进行使用,
需要说明的是\$axios 是我们在 module 中添加之后 nuxt 帮我们生成的

```js
export default {
  async asyncData({ $axios }) {
    console.log($axios);
    const res = await $axios({ url: "/data/list.json" });
    console.log(res);
  },
};
```

在 nuxt.config.js 中配置代理

```js
{
  axios: {
    proxy: true, // 打开跨域设置
    // perfix: '/', // baseurl 根据实际项目情况来
  },
  proxy: {// 类似vue的代理配置
    '/api': {
      target: 'http://localhost:30001',
      changeOrigin: true
    }
  }
}
```
