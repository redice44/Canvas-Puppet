import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { Course } from '../src/interfaces/course';


test();

async function test() {
  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: false } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login(page, loginInfo);
  const courseList: Course[] = await CanvasPuppet.courseList(page, lmsInfo.url);

  const pageList = await CanvasPuppet.pageList(page, lmsInfo.url, courseList[0]);

  console.log( pageList );

  await page.close();
  await browser.close();
}
