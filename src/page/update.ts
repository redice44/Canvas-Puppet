import * as Puppeteer from 'puppeteer';

import { Page } from './interfaces';

export default async function update( page: Puppeteer.Page, contentPage: Page ) {

  await page.click( 'input#title' );
  await page.$eval( 'input#title', inputEl => { inputEl.value = ''; } );
  await page.keyboard.type( contentPage.title );

  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( '\r' );
  await page.$eval( '#wiki_page_body', textEl => { textEl.innerHTML = ''; textEl.value = ''; } );
  await page.keyboard.type( contentPage.content );
  await page.click ( '#content > form > div.form-actions.clearfix > div > button.btn.btn-primary.submit' );

  await page.waitForNavigation();

}
