// server.js
// ExpressJS调用方式
const express = require('express');
// var phantomjs = require('phantom');
const app = express();
const path = process.cwd();
const port = 16015;
// 引入NodeJS的子进程模块
const child_process = require('child_process');
app.get('*', function (req, res) {
  // 部署到服务器的完整URL
  const url = req.protocol + '://' + req.hostname + req.originalUrl;

  console.log("url is: " + url);
  // 测试的url
  // var url = 'https://www.baidu.com'

  // 预渲染后的页面字符串容器
  let content = '';
  // 开启一个phantomjs子进程
  const spider = child_process.spawn('node', [path + '/spider.js', url]);
  // 设置stdout字符编码
  spider.stdout.setEncoding('utf8');
  // 监听phantomjs的stdout，并拼接起来
  spider.stdout.on('data', function (data) {
    content += data.toString();
  });
  // 监听子进程退出事件
  spider.on('exit', function (code) {
    console.log("content是：")
    console.log(content)
    switch (code) {
      case 1:
        console.log('加载失败');
        res.send('加载失败');
        break;
      case 2:
        console.log('加载超时: ' + url);
        res.send(content);
        break;
      default:
        console.log('加载页面: ' + url);
        res.send(content);
        break;
    }
  });
});
app.listen(port, function () {
  console.log(`Spider app listening on port ${port}!`);
  console.log(path + '/spider.js')
});
