import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {


  const rootUrl = lmsInfo.url;

  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );

  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.admin.login( page, loginInfo );
  let courseList = await CanvasPuppet.course.list( page, rootUrl );
  console.log( JSON.stringify( courseList ) );

  courseList = await CanvasPuppet.course.list( page, rootUrl, [ 'Student' ] );
  console.log( JSON.stringify( courseList ) );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
