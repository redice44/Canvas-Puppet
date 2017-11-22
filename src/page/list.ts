import * as Puppeteer from 'puppeteer';

import { Page } from './interfaces';
import { allPages as selectors } from './selectors';

export default async function getPages( page: Puppeteer.Page ): Promise < Page[] >  {

  const extractPages = ( pages: NodeListOf < HTMLElement >, selector: string ): Page[] => {

    let formatedPages: Page[] = [];

    for ( let i = 0; i < pages.length; i++ ) {

      let title = pages[ i ].querySelector( selector ).innerHTML.trim();
      let id = pages[ i ].querySelector( selector ).id.split( '_' );

      formatedPages.push( {

        title: title,
        id: parseInt( id[ id.length - 1 ] )

      } );

    }

    return formatedPages;

  };

  // @ts-ignore
  return await page.$$eval( selectors.pageList, extractPages, selectors.pageLink );

}