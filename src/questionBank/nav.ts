import * as Puppeteer from 'puppeteer';

import { Course } from '../course/interfaces';

import goto from '../utility/goto';

export default {

  list: navToQuestionBanks

}

async function navToQuestionBanks( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  await goto( page, `${rootUrl}/courses/${course.id}/question_banks` );

}
