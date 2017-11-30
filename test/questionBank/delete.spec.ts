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

    title: 'Testing Bank-Unique1234'

  }

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList = await CanvasPuppet.course.list( page, rootUrl );
  await CanvasPuppet.questionBank.create( page, rootUrl, courseList[ courseId ], questionBank );
  const questionBankList = await CanvasPuppet.questionBank.list( page, rootUrl, courseList[ courseId ] )
  const qBank = questionBankList.filter( bank => bank.title === 'Testing Bank-Unique1234' )[ 0 ];
  await CanvasPuppet.questionBank.delete( page, rootUrl, courseList[ courseId ], qBank );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
