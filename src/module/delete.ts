import * as Puppeteer from 'puppeteer';

import { Module } from './interfaces';
import { deleteSelectors as selectors } from './selectors';

export default async function deleteModule( page: Puppeteer.Page, contentModule: Module ) {

  page.once( 'dialog', async dialog => await dialog.accept() );

  // The button's event listener isn't attached for some unknown amount of time. ¯\_(ツ)_/¯
  await page.waitFor( 1000 );
  const moduleElement = await page.$( `#context_module_${ contentModule.id }` );
  await ( await moduleElement.$( selectors.triggerBtn ) ).click();
  await ( await moduleElement.$( selectors.delBtn ) ).click();

}
