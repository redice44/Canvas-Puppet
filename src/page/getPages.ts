import * as Puppeteer from 'puppeteer';

import { Page } from '../interfaces/page';

export default async function getPages( page: Puppeteer.Page ): Promise < Page[] >  {

  return await page.evaluate(() => {

    let pages: NodeListOf < Element > = document.querySelectorAll( '#content > div > div.index-content-container > div > table > tbody > tr' );
    let r = [];

    for ( let i = 0; i < pages.length; i++ ) {

      let title = pages[ i ].querySelector( 'td:nth-child(1) > a' ).innerHTML.trim();
      let id = pages[ i ].querySelector( 'td:nth-child(1) > a' ).id.split( '_' );

      r.push( {

        title: title,
        id: id[ id.length - 1 ]

      } );

    }

    return r;

  });

}