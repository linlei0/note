# vue2和vue3常见考题
## vue2和vue3有什么区别
beforeDestory改为beforeUnmont

destoryed改为unmonted

其他继续沿用

## 如何理解Composition API和Options API

### Composition API带来了什么
- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

### 如何选择
- 不建议共用，会引起混乱
- 小型项目，业务逻辑简单Options API
- 中大型项目，逻辑复杂，用Composition API

### 如何正确理解Composition API
- Composition API属于高阶技巧，不是基础必会
- Composition API是为了解决复杂业务逻辑设计
- Composition API就像Hooks在react中的地位

### 如何理解ref toRef和toRefs

**ref** 
- 生成值类型的响应式数据
- 可用于模版和reactive
- 通过.vaule修改值
- 可以获取到dom元素

**toRef**

**toRefs**

**为何需要ref**
返回值类型，会丢失响应式

如在setup，computed，合成函数，都有可能返回值类型

vue如果不定义ref，用户将自造ref，反而混乱

**为何需要.value**