import * as Puppeteer from 'puppeteer';

import { QuestionBank } from './interfaces';

import { createSelectors as selectors } from './selectors';

export default async function createBanks( page: Puppeteer.Page, qBank: QuestionBank ) {

  await page.click( selectors.addBtn );
  await page.keyboard.type( qBank.title );
  await page.keyboard.press( 'Enter' );
  await page.waitFor( 100 );

}
