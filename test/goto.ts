import * as Puppeteer from 'puppeteer';

import { NavigationError } from '../src/errors/navigation';
import goto from '../src/utility/goto';

test();

async function test() {
  const browser: Puppeteer.Browser = await Puppeteer.launch({ headless: false });
  const page: Puppeteer.Page = await browser.newPage();

  try {
    await goto(page, 'http://notapage.ojsfoj', 1);
  } catch (e) {
    if (e instanceof NavigationError) {
      console.log(`Unable to navigate to ${e.url}`)
    } else {
      console.log(`Uncaught error ${e.message}`);
    }
  }

  try {
    await goto(page, 'https://www.google.com');
  } catch (e) {
    if (e instanceof NavigationError) {
      console.log(`Unable to navigate to ${e.url}`)
    } else {
      console.log(`Uncaught error ${e.message}`);
    }
  }

  await page.close();
  await browser.close();
}
