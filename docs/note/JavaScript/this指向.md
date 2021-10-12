# this指向
在前端开发中`this`的指向问题是一个非常基础也很重要的知识点，是开发人员绕不过去的一个问题。那么今天用几个面试题来聊一聊前端中`this`问题吧.

首先需要知道一点:**this 永远指向最后调用它的那个对象**,通俗一点就是指向他爹。

### this 指向

#### 案例 1

```js
this.value = "value";
function fn() {
  var value = "innerValue";
  console.log(this.value);
}
fn(); // value
```

这个题大家应该都知道答案肯定是打印`value`，那么为什么打印的结果是`value`呢？看刚才那句话**this 永远指向最后调用它的那个对象**,这个时候我们就想了究竟是谁调用了`fn`呢？其实就是`window`，这个时候我们就清楚了，哦原来是`widnow`调用了`fn`，所以这个`this`就指向了`window`，因此就输出打印`value`。

#### 案例 2

```js
this.num = 30;
const obj = {
  num: 20,
  fn: function() {
    console.log(this.num);
  },
};
obj.fn(); // 20
var fn = obj.fn;
fn(); // 30
```

分析：

1. 默读三遍**this 永远指向最后调用它的那个对象**,**this 永远指向最后调用它的那个对象**,**this 永远指向最后调用它的那个对象**
2. 根据`案例1`的思路，是`obj`调用的`fn`，函数内部`this`指向的是`obj`,所有打印输出`obj.num`的值`20`
3. 接下来我们声明了一个全局变量`fn=obj.fn`，调用`fn()`等同于调用`window.fn()`，所有打印输出`window.num`的值`30`

#### 案例 3

难度加大一点

```js
this.a = 20;
function go() {
  console.log(this.a);
  this.a = 30;
}
go.prototype.a = 40;
var test = {
  a: 50,
  init: function(fn) {
    fn();
    console.log(this.a);
    return fn;
  },
};
//输出1
console.log(new go().a);
// 输出2
test.init(go);
var p = test.init(go);
p();
```

**在做这个题目之前，首先有一个知识点需要清楚**,代码如下，首先会找对象的值，然后再去找原型对象的值。也就是说`p.a`的时候会先在对象上获取这个值，没有则在原型对象上获取，明白了这个就好了。

```js
function P() {
  this.a = 1;
}
P.prototype = 2;
let p = new P();
console.log(p.a); // 1
```

分析：

1. 首先实例化一个对象`new go()`，同时调用函数`go`，代码执行`console.log(this.a)`,此时的`this`是指向实例化对象，按照 刚才的所说的，先找对象上的 key 值，发现没有，然后找原型对象上的`a`，发现`go.prototype.a = 40`所以打印**40**，同时`this.a = 30`,然后获取`new go().a`重复上一步的思路，先读取对象的 key 值发现存在且为**30**，所以整个的结果**就是先输出 40，然后输出 30**

2. 调用`test.init(go)`，首先调用`go`方法，我们可以这里理解`test.init(window.go)`,其实就是调用`window.go()`，首先打印`this.a`，也就是`window.a`,发现全局声明了`this.a=20`，所以打印`20`，同时**注意接下来的`this.a=30`，已经将全局的`a`改变了此时的`window.a=30`**，接下来执行`console.log(this.a);`，此时的`this`指向`test`，所以输出打印`50`，**因此最后的结果就是先输出 20，然后 50**

3. 执行`var p = test.init(go)`，重复步骤 2 首先调用全局函数`go`，打印全局的`a`，步骤 2 中更改了全局`a`的值为`30`，所以先输出`30`,然后调用`test`对象的`init`方法，执行`console.log(this.a)`,因此打印`50`，最后定义了一个全局`p`，并返回了一个函数`go`，执行`p()`,也就是执行`window.p()`，此时的`window.a===30`所以打印`30`，**最终的输出就是 30，50，30**

4. 综合以上分析最终的输出就是**40，30，20，50，30，50，30**
