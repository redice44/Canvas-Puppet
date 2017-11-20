import * as Puppeteer from 'puppeteer';

export default async function getPages( page: Puppeteer.Page ) {

  const r = await page.evaluate(() => {

    let pages: NodeListOf < Element > = document.querySelectorAll( '#content > div > div.index-content-container > div > table > tbody > tr' );
    let r = [];

    for ( let i = 0; i < pages.length; i++ ) {

      let title = pages[ i ].querySelector( 'td:nth-child(1) > a' ).innerHTML.trim();
      let link = pages[ i ].querySelector( 'td:nth-child(1) > a' ).getAttribute( 'href' );

      r.push( {

        title: title,
        link: link

      } );

    }

    return r;

  });

  return r;

}