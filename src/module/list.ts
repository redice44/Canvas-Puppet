import * as Puppeteer from 'puppeteer';

import { ModuleItem, Module } from './interfaces';
import { selectors, itemTypes } from './selectors';

export default async function getModuleList( page: Puppeteer.Page ): Promise < Module[] > {

  const getTitle = ( moduleEl: HTMLElement ): string => moduleEl.querySelector( '.header span.name' ).innerHTML.trim();
  const getModuleItem = ( moduleEl: HTMLElement ): ModuleItem|null => {

    if ( moduleEl.classList.contains( 'context_module_sub_header' ) ) {

      return null;

    }

    return {

      id: parseInt( moduleEl.querySelector( '.ig-admin > span' ).getAttribute( 'data-module-item-id' ) ),
      title: moduleEl.querySelector( '.ig-info span.locked_title' ).getAttribute( 'title' ).trim()

    }

  }

  const modulesEH = await page.$$( selectors.primaryModules );
  const modules = [];

  for ( let i = 0;  i < modulesEH.length; i++ ) {

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

      title: title,
      items: items

    } );

  }


  return modules;

}

async function getModule( page: Puppeteer.Page, index: number ): Promise < Module > {

  const moduleItems: Module = {

    title: '',
    items: []

  };

  const moduleTitleSelector = selectors.moduleTitle.replace( 'INDEX', '' + index );
  const moduleContentSelector = selectors.contentItems.replace( 'INDEX', '' + index );

  moduleItems.title = await page.$eval( moduleTitleSelector, el => el.innerHTML.trim() );
  const numItems = await page.$$eval( moduleContentSelector, items => items.length );

  for ( let i = 1; i <= numItems; i++ ) {

    const item: ModuleItem = {

      title: '',
      link: '',
      type: ''

    }

    const titleSelector = selectors.contentLink.replace( 'INDEX', '' + index ).replace( 'INDEX2', '' + i );
    const linkSelector = selectors.contentLink.replace( 'INDEX', '' + index ).replace( 'INDEX2', '' + i );
    const contentSelector = selectors.contentType.replace( 'INDEX', '' + index ).replace( 'INDEX2', '' + i );

    item.title = await page.$eval( titleSelector , ( el: HTMLElement ) => el.innerHTML.trim() );
    item.link = await page.$eval( linkSelector , ( el: HTMLElement ) => el.getAttribute( 'href' ).trim() );

    const itemClasses: string[] = await page.$eval( contentSelector, ( item: HTMLElement ) => {

      let classes = [];

      for ( let i = 0; i < item.classList.length; i++ ) {

        classes.push( item.classList[ i ] );

      }

      return classes;

    });

    for ( let i = 0; i < itemTypes.length; i++ ) {

      if ( itemClasses.includes( itemTypes[ i ].className ) ) {

        item.type = itemTypes[ i ].type;
        break;

      }
    }

    moduleItems.items.push( item );

  }

  return moduleItems;

}
