import * as Puppeteer from 'puppeteer';

import { ModuleItem } from './interfaces';
import { moduleItemSelectors as selectors } from './selectors';

export default async function parseModuleItem( page: Puppeteer.Page, modItemElement: Puppeteer.ElementHandle ): Promise < ModuleItem > {

  const isValid = element => element.classList.contains( 'context_module_sub_header' );
  const evalId = element => parseInt( element.getAttribute( 'data-content-id' ) );
  const evalModId = element => parseInt( element.getAttribute( 'data-module-item-id' ) );
  const evalTitle = ( element ): string => element.getAttribute( 'data-module-item-name' );
  const evalType = ( element ): string => element.getAttribute( 'data-module-type' );

  if ( await page.evaluate( isValid, modItemElement ) ) {

    return null;

  }

  const adminElement = await modItemElement.$( selectors.admin );

  return {

    itemId: await page.evaluate( evalId, adminElement ),
    moduleId: await page.evaluate( evalModId, adminElement ),
    title: await page.evaluate( evalTitle, adminElement ),
    type: await page.evaluate( evalType, adminElement )

  }

}
