import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { Course } from '../src/interfaces/course';


test();

async function test() {

  // @ts-ignore
  process.env.RUN_SILENT = '1';

  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: false } );
  const page: Puppeteer.Page = await browser.newPage();

  await CanvasPuppet.login( page, loginInfo );
  const courseList: Course[] = await CanvasPuppet.courseList( page, lmsInfo.url );

  const pages = await CanvasPuppet.getAllPages( page, lmsInfo.url, courseList[ 0 ] );

  console.log( pages );

  await page.close();
  await browser.close();

}
