import * as Puppeteer from 'puppeteer';

import parseModuleItem from '../parseModuleItem';

import { ModuleItem } from '../interfaces';
import { moduleSelectors, moduleItemSelectors } from '../selectors';

export default async function createModuleItem( page: Puppeteer.Page, moduleId: number, contentItem: ModuleItem ) {

  await page.waitFor( 1000 );
  const moduleElement = await page.$( `#context_module_${ moduleId }` );
  await ( await moduleElement.$( moduleSelectors.addModuleItemBtn ) ).click()
  await page.waitFor( 1000 );
  let modalElement = await ( await page.$( moduleItemSelectors.modalContent ) ).asElement();
  modalElement = await ( await page.evaluateHandle( element => element.parentElement, modalElement ) ).asElement();

  await page.select( moduleItemSelectors.modalSelect, contentItem.type );

  switch ( contentItem.type ) {

    case 'assignment':
    case 'quiz':
    case 'attachment':
    case 'discussion_topic':
    case 'context_module_sub_header':
    case 'external_url':
    case 'context_external_tool':
      break;

    case 'wiki_page':
      await page.select( moduleItemSelectors.pageSelect, '' + contentItem.itemId );
      break;

  }

  const itemCount = ( await moduleElement.$$( moduleSelectors.moduleItems ) ).length;

  await ( await modalElement.$( moduleItemSelectors.addBtn ) ).click();

  await page.waitForFunction(

    ( selector, count ) => {

      return count < document.querySelectorAll( selector ).length;

    },
    { polling: 'mutation' },
    `#context_module_${ moduleId } ${ moduleSelectors.moduleItems }`,
    itemCount

  );

  const itemElements = await moduleElement.$$( moduleSelectors.moduleItems );

  return await parseModuleItem( page, itemElements[ itemElements.length - 1 ] );

}
