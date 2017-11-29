import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseId = 7;
  const qbId = 1;
  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, lmsInfo.url );
  const questionBankList = await CanvasPuppet.questionBank.list( page, lmsInfo.url, courseList[ courseId ] );
  const questionList = await CanvasPuppet.question.list( page, lmsInfo.url, courseList[ courseId ], questionBankList[ qbId ] );
  console.log( JSON.stringify( questionList ) );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
