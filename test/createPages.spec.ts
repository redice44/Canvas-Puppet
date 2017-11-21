import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { Course } from '../src/interfaces/course';
// import { Page } from '../src/interfaces/page';

test();

async function test() {

  const contentPages = []

  for ( let i = 0; i < 100; i++ ) {

    contentPages.push({

      title: `Page ${i}`,
      content: `full of ${i}`

    });

  }

  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: true } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login(page, loginInfo);
  const courseList: Course[] = await CanvasPuppet.courseList(page, lmsInfo.url);

  await CanvasPuppet.createPages( page, lmsInfo.url, courseList[ 3 ], contentPages );

  await page.close();
  await browser.close();

}
