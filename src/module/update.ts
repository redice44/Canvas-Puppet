import * as Puppeteer from 'puppeteer';

import { Module } from './interfaces';
import { updateSelectors as selectors } from './selectors';

export default async function updateModule( page: Puppeteer.Page, contentModule: Module ) {

  const clearInputText = inputEH => { inputEH.value = ''; };

  // The button's event listener isn't attached for some unknown amount of time. ¯\_(ツ)_/¯
  await page.waitFor( 1000 );
  const moduleElement = await page.$( `#context_module_${ contentModule.id }` );
  await ( await moduleElement.$( selectors.triggerBtn ) ).click();
  await ( await moduleElement.$( selectors.editBtn ) ).click();
  const modal = await page.$( selectors.form );
  const titleElement = await page.$( selectors.titleInput );
  await page.evaluate( clearInputText, titleElement );
  await titleElement.click();
  await page.keyboard.type( contentModule.title );
  await ( await modal.$( selectors.submitBtn ) ).click();

}
