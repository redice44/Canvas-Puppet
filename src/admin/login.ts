import * as Puppeteer from 'puppeteer';

import goto from '../utility/goto';
import { LoginInfo } from '../interfaces/credentials';

export default async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
  console.log('Logging In');
  await goto(page, loginInfo.url);
  try {
    await page.click(loginInfo.selectors.username);
    await page.keyboard.type(loginInfo.credentials.username);

    await page.click(loginInfo.selectors.password);
    await page.keyboard.type(loginInfo.credentials.password);

    await page.click(loginInfo.selectors.loginButton);
    await page.waitForNavigation();
  } catch (e) {
    if (e.code === 'ERR_ASSERTION') {
      console.log('Already Logged In');
    } else {
      console.log(e);
      throw e;
    }
  }
  console.log('Logged In');
}