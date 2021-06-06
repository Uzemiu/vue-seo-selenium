const express = require('express');
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const app = express();
const port = 16015;
const timeout = 3000;
const options = new chrome.Options().addArguments([
  '--headless',
  '--disable-gpu',
  '--no-sandbox'
]);
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

app.get('*', function (req, res) {
  // 部署到服务器的完整URL
  const url = req.protocol + '://' + req.hostname + req.originalUrl;

  // const url = 'https://www.neptu.cn'
  console.log('Request received');
  console.log("Url is: " + url);
  console.log("Header is: " + req.header('user-agent'));

  (async () => {
    await driver.get(url);
    setTimeout(async () => {
      let html = await driver.executeScript('return document.documentElement.outerHTML');
      res.send(html);
    }, timeout)
  })().catch(() => {
    res.send("Error in getting source from " + url);
  })
});

app.listen(port, function () {
  console.log(`vue-seo-selenium server listening on port ${port}!`);
});
