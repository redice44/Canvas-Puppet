import * as Puppeteer from 'puppeteer';

import { NavigationError, NavigationErrorCodes } from '../errors/navigation';

export default async function goto(page: Puppeteer.Page, url: string, retry: number = 2) {
  console.log(`  Navigating to: ${url}`);
  try {
    await page.goto(url);
  } catch (e) {
    if (e.message === `Failed to navigate: ${url}`) {
      console.log(`    Failed to navigate: ${url}`);
      if (retry > 0) {
        console.log(`    Retrying...\n`);
        await goto(page, url, retry-1);
      } else {
        console.log();
        throw new NavigationError(e.message, NavigationErrorCodes.FAILED, url);
      }
    } else if (e.message.includes('Navigation Timeout Exceeded')) {
      console.log(`    Timed out navigating to: ${url}`);
      if (retry > 0) {
        console.log(`    Retrying...\n`);
        await goto(page, url, retry-1);
      } else {
        console.log();
        throw new NavigationError(e.message, NavigationErrorCodes.TIMEOUT, url);
      }
    } else {
      throw e;
    }
  }
}
