import * as Puppeteer from 'puppeteer';

import { NavigationError, NavigationErrorCodes } from '../errors/navigation';

export default async function goto(page: Puppeteer.Page, url: string, opts: Puppeteer.NavigationOptions = {}, retry: number = 2) {
  if ( !process.env.RUN_SILENT ) {
    console.log(`  Navigating to: ${url}`);
  }
  try {
    await page.goto(url, opts);
  } catch (e) {
    if (e.message === `Failed to navigate: ${url}`) {
      if ( !process.env.RUN_SILENT ) {
        console.log(`    Failed to navigate: ${url}`);
      }
      if (retry > 0) {
        if ( !process.env.RUN_SILENT ) {
          console.log(`    Retrying...\n`);
        }
        await goto(page, url, opts, retry-1);
      } else {
        if ( !process.env.RUN_SILENT ) {
          console.log();
        }
        let error: NavigationError = new Error(e.message) as NavigationError;
        error.code = NavigationErrorCodes.FAILED;
        error.url = url;
        throw error;
      }
    } else if (e.message.includes('Navigation Timeout Exceeded')) {
      if ( !process.env.RUN_SILENT ) {
        console.log(`    Timed out navigating to: ${url}`);
      }
      if (retry > 0) {
        if ( !process.env.RUN_SILENT ) {
          console.log(`    Retrying...\n`);
        }
        await goto(page, url, opts, retry-1);
      } else {
        if ( !process.env.RUN_SILENT ) {
          console.log();
        }
        let error: NavigationError = new Error(e.messsage) as NavigationError;
        error.code = NavigationErrorCodes.TIMEOUT;
        error.url = url;
        throw error;
      }
    } else {
      throw e;
    }
  }
}
