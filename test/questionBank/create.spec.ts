import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseId = 3;
  const rootUrl = lmsInfo.url;
  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );
  const page: Puppeteer.Page = await browser.newPage();
  const questionBank = {

    title: 'Testing Bank'

  }

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, rootUrl );
  await CanvasPuppet.questionBank.create( page, rootUrl, courseList[ courseId ], questionBank );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
