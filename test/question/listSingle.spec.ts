import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseId = 3;
  const qbId = 0;
  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: argOpts.headless } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, lmsInfo.url );
  const questionBankList = await CanvasPuppet.questionBank.list( page, lmsInfo.url, courseList[ courseId ] );
  const questionList = await CanvasPuppet.question.list( page, lmsInfo.url, courseList[ courseId ], questionBankList[ qbId ] );
  console.log( JSON.stringify( questionList ) );

  await page.close();
  await browser.close();

}
