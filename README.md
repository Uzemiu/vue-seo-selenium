# vue-seo-selenium

基于selenium+chromedriver实现SPA的SEO优化

## 使用方法

下载与chrome版本对应的[chromedriver](http://npm.taobao.org/mirrors/chromedriver)
放到项目目录下

然后执行以下代码
```
npm install

node server
```

## 参数设置

```js
// server.js
const port = 16015 // express监听端口号
const timeout = 3000 // selenium加载完资源等待对数据接口请求的时间(毫秒)
```
