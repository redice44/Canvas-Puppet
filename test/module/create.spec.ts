import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

import { Module } from '../../src/module/interfaces';

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
  const contentModule: Module = {

    title: 'Testing Module',
    items: [
      {
        "itemId": 32176,
        // "moduleId": 169586,
        "title": "Page 10",
        "type": "wiki_page"
      },
      {
        "itemId": 32177,
        // "moduleId": 169587,
        "title": "Page 11",
        "type": "wiki_page"
      },
      {
        "itemId": 32178,
        // "moduleId": 169589,
        "title": "Page 12",
        "type": "wiki_page"
      },
      {
        "itemId": 32179,
        // "moduleId": 169588,
        "title": "Page 13",
        "type": "wiki_page"
      },
      {
        "itemId": 32180,
        // "moduleId": 169590,
        "title": "Page 14",
        "type": "wiki_page"
      }
    ]

  };

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, rootUrl );
  const newContentModule = await CanvasPuppet.module.create( page, rootUrl, courseList[ courseId ], contentModule );

  console.log( JSON.stringify( newContentModule ) );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
