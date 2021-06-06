const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const url = process.argv[2];
const maxTimeout = 3000;

console.log(process.argv);

const options = new chrome.Options().addArguments([
  '--headless',
  '--disable-gpu'
]);

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

(async function example() {
  await driver.get(url);
  setTimeout(async () => {
    let html = await driver.executeScript('return document.documentElement.outerHTML');
    console.log(html)
  }, maxTimeout)
})()
