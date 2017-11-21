import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { Course } from '../src/interfaces/course';
// import { Page } from '../src/interfaces/page';

test();

async function test() {

  const contentPage = {
    // id: 7140,
    title: 'Testing with spaces',
    content: '<p>Hello world</p>'
  };

  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: false } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login(page, loginInfo);
  const courseList: Course[] = await CanvasPuppet.courseList(page, lmsInfo.url);

  await CanvasPuppet.createPage( page, lmsInfo.url, courseList[ 3 ], contentPage );

  await page.close();
  await browser.close();

}
