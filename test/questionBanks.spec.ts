import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { questionBank } from '../private/questionBank';

test();

async function test() {

  const browser: Puppeteer.Browser = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await browser.newPage();
  // 3 is my course
  await CanvasPuppet.login(page, loginInfo);
  const courseList = await CanvasPuppet.courseList(page, lmsInfo.url);

  for ( let i = 0; i < courseList.length; i++ ) {
    if (courseList[i].title === 'PET5391C RVC 1181') {
      const start = Date.now();
      console.log(i, courseList[i]);
      await CanvasPuppet.QuestionBank.goto(page, lmsInfo.url, courseList[i]);
      const newBank = await CanvasPuppet.QuestionBank.createBank(page, 'Final');
      await CanvasPuppet.QuestionBank.goto(page, lmsInfo.url, courseList[i], newBank);
      for (let i = 0; i < questionBank.length; i++) {
        questionBank[i].title = `Question ${i+1}`;
        questionBank[i].type = 'multiple_choice_question';
        await CanvasPuppet.QuestionBank.createQuestion(page, questionBank[i]);
        console.log(`Question ${i+1} of ${questionBank.length}`);
      }
      console.log(Date.now() - start);
    }
  }

  await page.close();
  await browser.close();
}
