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
      let error: DOMError = new Error(e.message) as DOMError;
      error.code = DOMErrorCodes.SELECTOR_NOT_FOUND;
      error.selector = e.message.substr(28);
      throw error;
    } else if (e.message.includes('Evaluation failed: DOMException') && e.message.includes('The provided selector is empty.')) {
      console.log(`    DOMError: Empty Selector`);
      let error: DOMError = new Error(e.message.split('\n')[0]) as DOMError;
      error.code = DOMErrorCodes.EMPTY_SELECTOR;
      throw error;
    } else if (e.message.includes('Navigation Timeout Exceeded')) {
      console.log(`    Navigation Error: Timed out`);
      let error: NavigationError = new Error(e.message) as NavigationError;
      error.code = NavigationErrorCodes.TIMEOUT;
      error.url = page.url();
      throw error;
    }
    throw e;
  }

  if (page.url() !== loginInfo.expectedLanding) {
    console.log(`    Navigation Error: Unexpected Landing Page`);
    let error: NavigationError = new Error(`Unexpected Landing Page`) as NavigationError;
    error.code = NavigationErrorCodes.UNEXPECTED_DESTINATION;
    error.url = page.url();
    throw error;
  }
  console.log('Logged In\n');
}