import * as Puppeteer from 'puppeteer';

export default async function clickAndNav( page: Puppeteer.Page, selector: string, navOptions: Puppeteer.NavigationOptions = {} ) {

  return page.click( selector ).then( () => page.waitForNavigation( navOptions ) );

  // return Promise.all( [

  //   page.waitForNavigation( navOptions ),
  //   page.click( selector )

  // ] )
  // .then( (value: [ Puppeteer.Response, void ] ) => {

  //   return value[ 0 ];

  // } );

}
