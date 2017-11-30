import * as Puppeteer from 'puppeteer';

import parseModuleItem from './parseModuleItem';

import { ModuleItem, Module } from './interfaces';
import { moduleSelectors as selectors } from './selectors';

export default async function parseModule( page: Puppeteer.Page, moduleElement: Puppeteer.ElementHandle ): Promise < Module > {

  const evalId = element => parseInt( element.getAttribute( 'data-id' ) );
  const evalTitle = element => element.getAttribute( 'data-publish-title' );

  const adminElement = await moduleElement.$( selectors.admin );
  const itemsElement = await moduleElement.$$( selectors.moduleItems );
  const items: ModuleItem[] = [];

  for ( let i = 0; i < itemsElement.length; i++ ) {

    const item = await parseModuleItem( page, itemsElement[ i ] );

    if ( item ) {

      items.push( item );

    }

  }

  return {

    id: await page.evaluate( evalId, adminElement ),
    title: await page.evaluate( evalTitle, adminElement ),
    items: items

  };

}
