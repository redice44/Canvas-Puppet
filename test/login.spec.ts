import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { LoginInfo } from '../src/interfaces/credentials';
import { loginInfo } from '../private/loginInfo';

test();

async function test() {
  let customLoginInfo;

  customLoginInfo = copyInfo(loginInfo);
  customLoginInfo.url = 'http://blargjs.sji';
  await login(customLoginInfo);

  customLoginInfo = copyInfo(loginInfo);
  customLoginInfo.selectors.username = '';
  await login(customLoginInfo);

  customLoginInfo = copyInfo(loginInfo);
  customLoginInfo.selectors.username = '#foo';
  await login(customLoginInfo);

  customLoginInfo = copyInfo(loginInfo);
  customLoginInfo.credentials.username = 'foo';
  await login(customLoginInfo);

  customLoginInfo = copyInfo(loginInfo);
  customLoginInfo.selectors.loginButton = loginInfo.selectors.username;
  await login(customLoginInfo);
}

function copyInfo(loginInfo: LoginInfo): LoginInfo {
  let customLoginInfo = Object.assign({}, loginInfo);
  customLoginInfo.selectors = Object.assign({}, loginInfo.selectors);
  customLoginInfo.credentials = Object.assign({}, loginInfo.credentials);
  return customLoginInfo;
}

async function login(info: LoginInfo) {
  const browser: Puppeteer.Browser = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await browser.newPage();

  try {
    await CanvasPuppet.login(page, info);
  } catch(e) {
    console.log(`    ${e.message}\n`);
  }
  await page.close();
  await browser.close();
}