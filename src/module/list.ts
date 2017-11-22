import * as Puppeteer from 'puppeteer';

import { subModuleItem, ModuleItems } from './interfaces';
import { selectors, itemTypes } from './selectors';

export default async function getModuleList( page: Puppeteer.Page ): Promise < ModuleItems[] > {

  const numModules: number = await page.$$eval( selectors.primaryModules, modules => modules.length );
  const modules: ModuleItems[] = [];

  for ( let i = 1; i <= numModules; i++ ) {

    modules.push( await getModule( page, i ) );

  }

  return modules;

}

async function getModule( page: Puppeteer.Page, index: number ): Promise < ModuleItems > {

  const moduleItems: ModuleItems = {

    title: '',
    items: []

  };

  const moduleTitleSelector = selectors.moduleTitle.replace( 'INDEX', '' + index );
  const moduleContentSelector = selectors.contentItems.replace( 'INDEX', '' + index );

  moduleItems.title = await page.$eval( moduleTitleSelector, el => el.innerHTML.trim() );
  const numItems = await page.$$eval( moduleContentSelector, items => items.length );

  for ( let i = 1; i <= numItems; i++ ) {

    const item: subModuleItem = {

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
