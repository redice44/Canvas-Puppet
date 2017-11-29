import * as Puppeteer from 'puppeteer';

import { Page } from './interfaces';

export default async function update( page: Puppeteer.Page, contentPage: Page ) {

  const updateTitle = inputEH => { inputEH.value = ''; };
  const updateBody = textEH => { textEH.innerHTML = ''; textEH.value = ''; };

  await page.click( 'input#title' );
  await page.$eval( 'input#title', updateTitle );
  await page.keyboard.type( contentPage.title );

  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( '\r' );
  await page.$eval( '#wiki_page_body', updateBody );
  await page.keyboard.type( contentPage.content );
  await page.click ( '#content > form > div.form-actions.clearfix > div > button.btn.btn-primary.submit' );

  await page.waitForNavigation();

}
