import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { LoginError } from '../src/utility/errors';
import { LoginInfo } from '../src/interfaces/credentials';
import { loginInfo } from '../private/loginInfo';

test();

async function test() {
  await login(loginInfo);
  await login(Object.assign({}, loginInfo, { expectedLanding: '' }));
}

async function login(info: LoginInfo) {
  const browser: Puppeteer.Browser = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await browser.newPage();

  try {
    await CanvasPuppet.login(page, info);
  } catch (e) {
    if (e instanceof LoginError) {
      console.log('Login Failed');
    } else {
      console.log(e);
    }
  }

  await page.close();
  await browser.close();
}