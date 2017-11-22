import * as Puppeteer from 'puppeteer';

import { Page } from '../interfaces/page';

export default async function createPage( page: Puppeteer.Page, contentPage: Page ) {

  await page.click( 'input#title' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Enter' );
  await page.keyboard.type( contentPage.content );
  await page.click ( '#content > form > div.form-actions.clearfix > div > button.btn.btn-primary.submit' );

  await page.waitForNavigation();

}