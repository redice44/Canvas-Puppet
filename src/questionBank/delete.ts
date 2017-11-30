import * as Puppeteer from 'puppeteer';

import { QuestionBank } from './interfaces';

import { deleteSelectors as selectors } from './selectors';

export default async function deleteBanks( page: Puppeteer.Page, qBank: QuestionBank ) {

  page.once( 'dialog', async dialog => await dialog.accept() );
  const bank = await page.$( `#question_bank_${ qBank.id }` );
  await ( await bank.$( selectors.delBtn ) ).click();

}
