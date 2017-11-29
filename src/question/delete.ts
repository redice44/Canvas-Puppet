import * as Puppeteer from 'puppeteer';

import { Question } from './interfaces';
import { deleteQuestion as selectors } from './selectors';

export default async function deleteQuestion( page: Puppeteer.Page, question: Question ) {

  page.on( 'dialog', async dialog => await dialog.accept() );

  const questionEH = await page.$( `#question_${ question.id }` );
  await questionEH.hover();
  const deleteEH = await questionEH.$( selectors.link );
  await deleteEH.click();

}
