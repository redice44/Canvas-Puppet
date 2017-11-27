import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseIndex = 3;
  const contentPage = {

    title: 'This is a test',
    content: '<p>Hello world</p>'

  };

  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );

  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, lmsInfo.url );

  try {

    const newPage = await CanvasPuppet.page.create( page, lmsInfo.url, courseList[ courseIndex ], contentPage );
    console.log( JSON.stringify( newPage ) );

  } catch ( e ) {

    console.log( e.message );

  }

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
