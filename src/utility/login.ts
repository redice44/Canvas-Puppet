import * as Puppeteer from 'puppeteer';
import Credentials from '../../private/credentials';
import lmsConfig from '../../private/lmsConfig';

export default async function login(page: Puppeteer.Page) {
  const loginUrl = lmsConfig.login.url;

  console.log('Logging In');
  await page.goto(loginUrl);
  await page.click(lmsConfig.login.selectors.username);
  await page.keyboard.type(Credentials.username);

  await page.click(lmsConfig.login.selectors.password);
  await page.keyboard.type(Credentials.password);

  await page.click(lmsConfig.login.selectors.loginButton);
  await page.waitForNavigation();
  console.log('Logged In');
}