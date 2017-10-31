import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';

main();

async function main() {
  const browser: Puppeteer.Browser = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await browser.newPage();

  try {
    await CanvasPuppet.login(page, loginInfo);
  } catch (e) {
    console.log('Login Failed');
    console.log(e);
  }

  await page.close();
  await browser.close();
}
