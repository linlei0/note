# 输入URL到渲染页面过程
1. 浏览器根据输入的URL地址根据DNS解析成IP地址
2. 向这个IP机器发送请求
3. 服务器收到请求，响应并返回数据
4. 浏览器得到返回内容，也就是HTML字符串
5. 根据`HTML`结构生成`DOM`
6. 根据`CSS`生成`CSSOM`
7. 将生成的`DOM`和`CSSOM`整合成`renderTree`
8. 根据`renderTree`开始渲染和展示
9. 遇到`<script>`时，会执行并阻塞并渲染


