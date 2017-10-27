import * as Puppeteer from 'puppeteer';

run();

async function run() {
  const browser: Puppeteer.Browser  = await Puppeteer.launch({
    // headless: false;
  });

  browser.close();
}
