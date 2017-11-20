import * as Puppeteer from 'puppeteer';

import { NavigationErrorCodes } from '../src/errors/navigation';
import goto from '../src/utility/goto';

test();

async function test() {
  const browser: Puppeteer.Browser = await Puppeteer.launch({ headless: false });
  const page: Puppeteer.Page = await browser.newPage();

  try {
    await goto(page, 'http://notapage.ojsfoj', {}, 0);
    console.log('Fail');
    throw new Error('Should have thrown error');
  } catch (e) {
    if (e.code && e.code === NavigationErrorCodes.FAILED) {
      console.log('Pass');
    } else {
      console.log('Fail');
      throw e;
    }
  }

  try {
    await goto(page, 'http://notapage.ojsfoj', {}, 0);
    console.log('Fail');
    throw new Error('Should have thrown error');
  } catch (e) {
    if (e.code && e.code === NavigationErrorCodes.TIMEOUT) {
      console.log('Pass');
    } else {
      console.log('Fail');
      throw e;
    }
  }

  try {
    await goto(page, 'https://www.google.com');
    console.log('Pass');
  } catch (e) {
    console.log('Fail');
    throw e;
  }

  await page.close();
  await browser.close();
}
