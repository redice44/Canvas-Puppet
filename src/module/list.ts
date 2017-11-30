import * as Puppeteer from 'puppeteer';

import { ModuleItem, Module } from './interfaces';
import { selectors } from './selectors';

export default async function getModuleList( page: Puppeteer.Page ): Promise < Module[] > {

  const getTitle = ( moduleEl: HTMLElement ): string => moduleEl.querySelector( '.header span.name' ).innerHTML.trim();
  const getId = element => parseInt( element.getAttribute( 'data-module-id' ) );
  const getModuleItem = ( moduleEl: HTMLElement ): ModuleItem|null => {

    if ( moduleEl.classList.contains( 'context_module_sub_header' ) ) {

      return null;

    }

    return {

      itemId: parseInt( moduleEl.querySelector( '.ig-admin > span' ).getAttribute( 'data-content-id' ) ),
      moduleId: parseInt( moduleEl.querySelector( '.ig-admin > span' ).getAttribute( 'data-module-item-id' ) ),
      title: moduleEl.querySelector( '.ig-info span.locked_title' ).getAttribute( 'title' ).trim(),
      type: moduleEl.querySelector( '.ig-admin > span' ).getAttribute( 'data-module-type' ).trim()

    }

  }

  const modulesEH = await page.$$( selectors.primaryModules );
  const modules = [];

  for ( let i = 0;  i < modulesEH.length; i++ ) {

    const id = await page.evaluate( getId, modulesEH[ i ] );
    const title: string = await page.evaluate( getTitle, modulesEH[ i ] );
    const itemsEH = await modulesEH[ i ].$$( 'ul.items > li' );
    const items: ModuleItem[] = [];

    for ( let j = 0; j < itemsEH.length; j++ ) {

      const item = await page.evaluate( getModuleItem, itemsEH[ j ] )

      if ( item ) {

        items.push( item );

      }

    }

    modules.push( {

      id: id,
      title: title,
      items: items

    } );

  }


  return modules;

}
