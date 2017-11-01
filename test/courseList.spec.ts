import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

test();

async function test() {
  const browser: Puppeteer.Browser = await Puppeteer.launch();
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login(page, loginInfo);
  const courseList = await CanvasPuppet.courseList(page, lmsInfo.url);
  console.log(courseList);

  await page.close();
  await browser.close();
}
