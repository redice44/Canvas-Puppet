import * as Puppeteer from 'puppeteer';

export default async function del( page: Puppeteer.Page ) {

  await page.click( '.header-bar-right > div > a.btn' );
  await page.click( '.header-bar-right > div a.delete_page' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( '\r' );

  await page.waitForNavigation();

}
