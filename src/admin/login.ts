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
    if (page.url() !== loginInfo.expectedLanding) {
      throw new Error(`Login not successful. Expected to be at ${loginInfo.expectedLanding}, but is at ${page.url()}`);
    }
  } catch (e) {
    if (e.code === 'ERR_ASSERTION') {
      console.log('Already Logged In');
    } else {
      throw e;
    }
  }
  console.log('Logged In');
}