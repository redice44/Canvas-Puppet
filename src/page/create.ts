import * as Puppeteer from 'puppeteer';

import { Page } from './interfaces';

export default async function create( page: Puppeteer.Page, contentPage: Page ) {

  // @ts-ignore
  const isNewPage = await page.evaluate( () => !!window.ENV.WIKI_PAGE.created_at );

  if ( isNewPage ) {

    throw new Error( 'Page already exists' );

  }

  await page.click( 'input#title' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Enter' );
  await page.keyboard.type( contentPage.content );
  await page.click ( '#content > form > div.form-actions.clearfix > div > button.btn.btn-primary.submit' );

  await page.waitForNavigation();

}
