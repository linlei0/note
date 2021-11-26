# 浏览器异常全局处理node异常全局处理

## 浏览器异常处理

```html
<script>
 window.onerror = (msg, url, lineNum, colNum, err) => {
    console.log(`错误发生的异常信息（字符串）:${msg}`);
    console.log(`错误发生的脚本URL（字符串）:${url}`);
    console.log(`错误发生的行号（数字）:${lineNum}`);
    console.log(`错误发生的列号（数字）:${colNum}`);
    console.log(`错误发生的Error对象（错误对象）:${err}`);
};
function test() {
    allert('xxx)
}
test()
</script>
```
![](./img/error1.png)
