import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseIndex = 3;
  const pageIndex = 2;

  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );

  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, lmsInfo.url );
  const pageList = await CanvasPuppet.page.list( page, lmsInfo.url, courseList[ courseIndex ] );
  const contentPage = await CanvasPuppet.page.get( page, lmsInfo.url, courseList[ courseIndex ], pageList[ pageIndex ] );

  console.log( JSON.stringify( contentPage ) );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }
}
