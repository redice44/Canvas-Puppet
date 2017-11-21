import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: argOpts.headless } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login( page, loginInfo );
  console.log( await CanvasPuppet.course.list( page, lmsInfo.url ) );

  await page.close();
  await browser.close();

}
