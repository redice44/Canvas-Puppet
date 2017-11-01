import * as Puppeteer from 'puppeteer';

import goto from '../utility/goto';
import { LoginInfo } from '../interfaces/credentials';

import { DOMError, DOMErrorCodes } from '../errors/DOM';
import { NavigationError, NavigationErrorCodes } from '../errors/navigation';

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
    if (e.code && e.code === 'ERR_ASSERTION') {
      console.log(`    DOMError: ${e.message}`);
      throw new DOMError(e.message, DOMErrorCodes.SELECTOR_NOT_FOUND, e.message.substr(28));
    } else if (e.message.includes('Evaluation failed: DOMException') && e.message.includes('The provided selector is empty.')) {
      console.log(`    DOMError: Empty Selector`);
      throw new DOMError(e.message.split('\n')[0], DOMErrorCodes.EMPTY_SELECTOR);
    } else if (e.message.includes('Navigation Timeout Exceeded')) {
      console.log(`    Navigation Error: Timed out`);
      throw new NavigationError(e.message, NavigationErrorCodes.TIMEOUT, page.url());
    }
    throw e;
  }

  if (page.url() !== loginInfo.expectedLanding) {
    console.log(`    Navigation Error: Unexpected Landing Page`);
    throw new NavigationError(`Unexpected Landing Page`, NavigationErrorCodes.UNEXPECTED_DESTINATION, page.url());
  }
  console.log('Logged In\n');
}