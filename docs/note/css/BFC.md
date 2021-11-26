# BFC

## 概念
什么是BFC？
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
简单的说就是可以把BFC理解成一个容器，里面的元素不论如何变化都不会影响到外部元素。

## 触发BFC
1. float不是none
2. postion是asolute和fixed
3. overflow 除了 visible 以外的值 (hidden、auto、scroll)
4. display 为 inline-block、table-cells、flex
5. body根元素

## BFC特性

1. 同一个BFC下边距会发生折叠
```html
<head>
<style>
    div{
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }
</style>

</head>
<body>
    <div></div>
    <div></div>
</body>
```

解决办法设置两个BFC
```html
 <style>
    * {
      padding: 0;
      margin: 0;
    }
    p {
      width: 100px;
      height: 100px;
      background: lightblue;
      margin: 100px;
      }
    .container {
      overflow: hidden;
    }
  </style>
  <body>
   <div class="container">
     <p></p>
   </div>
   <div class="container">
     <p></p>
   </div>
  </body>
```
这个时候两个div的上下边距就会变成200px

 2. FC 可以包含浮动的元素（清除浮动）

 浮动的元素会脱离普通文档流

```html
 <style>
    * {
      padding: 0;
      margin: 0;
    }
    .container {
      border: 1px solid red;
    }
    .left,.right {
      float: left;
      width: 100px;
      height: 100px;
      background: lightblue;
    }
  </style>
  <body>
    <div class="container">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>
  </body>
</html>
```

![bfc2](./bfc2.png)

**解决办法**
```css
/* 第一种 */
.container {
    border: 1px solid red;
    display: flex; 
}
/* 第二种 */
.container {
    border: 1px solid red;
    overflow: hidden; 
}
```


 3. BFC 可以阻止元素被浮动元素覆盖