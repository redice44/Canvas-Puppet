import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const courseId = 3;
  const qbId = 0;
  const rootUrl = lmsInfo.url;
  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );
  const page: Puppeteer.Page = await browser.newPage();
  const question = {
    "title": "Question asdfasdf",
    "text": "<p>Which of the following types</p>",
    "type": "multiple_choice_question",
    "answers": [
      {
        "text": "One",
        "correct": false
      },
      {
        "text": "Two",
        "correct": true
      },
      {
        "text": "Three",
        "correct": false
      },
      {
        "text": "Four",
        "correct": false
      }
    ]
  };

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList =  await CanvasPuppet.course.list( page, rootUrl );
  const questionBankList = await CanvasPuppet.questionBank.list( page, rootUrl, courseList[ courseId ] );
  await CanvasPuppet.question.create( page, rootUrl, courseList[ courseId ], questionBankList[ qbId ], question );
  const questionList = await CanvasPuppet.question.list( page, rootUrl, courseList[ courseId ], questionBankList[ qbId ] );
  const delQuestion = questionList.filter( q => q.title === question.title )[ 0 ];
  await CanvasPuppet.question.delete( page, rootUrl, courseList[ courseId ], questionBankList[ qbId ], delQuestion );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
