import * as Puppeteer from 'puppeteer';

import createModuleItem from './item/create';

import { Module } from './interfaces';
import { createSelectors as selectors } from './selectors';

export default async function createModule( page: Puppeteer.Page, contentModule: Module ): Promise < Module > {

  // The button's event listener isn't attached for some unknown amount of time. ¯\_(ツ)_/¯
  // await page.waitForSelector( selectors.addBtn, { visible: true } );
  await page.waitFor( 1000 );
  await page.click( selectors.addBtn );
  const modal = await page.$( selectors.form );
  await page.click( selectors.nameInput );
  await page.keyboard.type( contentModule.title );
  await ( await modal.$( selectors.submitBtn ) ).click();
  // Another unknown wait time for canvas to update the new dom
  await page.waitFor( 1000 );

  const evalId = element => parseInt( element.id.substr( 15 ) );

  const moduleList = await page.$$( selectors.list );
  const newModule = moduleList[ moduleList.length - 1 ];
  contentModule.id = await page.evaluate( evalId, newModule );

  for ( let i = 0; i < contentModule.items.length; i++ ) {

    await createModuleItem( page, contentModule.id, contentModule.items[ i ] );

  }

  return contentModule;

}
