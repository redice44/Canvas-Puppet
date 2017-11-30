import * as Puppeteer from 'puppeteer';

import { QuestionBank } from './interfaces';

import { updateSelectors as selectors } from './selectors';

export default async function updateBanks( page: Puppeteer.Page, qBank: QuestionBank ) {

  const bank = await page.$( `#question_bank_${ qBank.id }` );
  await ( await bank.$( selectors.editBtn ) ).click();
  await page.keyboard.type( qBank.title );
  await page.keyboard.press( 'Enter' );

}
