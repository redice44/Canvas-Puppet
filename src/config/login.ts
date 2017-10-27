import * as Puppeteer from 'puppeteer';
import Credentials from '../../private/credentials';
import { loginConfig } from '../../private/lmsConfig';

export default async function login(page: Puppeteer.Page) {
  const loginUrl = loginConfig.url;

  console.log('Logging In');
  await page.goto(loginUrl);
  await page.click(loginConfig.selectors.username);
  await page.keyboard.type(Credentials.username);

  await page.click(loginConfig.selectors.password);
  await page.keyboard.type(Credentials.password);

  await page.click(loginConfig.selectors.loginButton);
  await page.waitForNavigation();
  console.log('Logged In');
}