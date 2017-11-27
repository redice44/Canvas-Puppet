import * as Puppeteer from 'puppeteer';

import { Course } from '../course/interfaces';
import { QuestionBank } from '../questionBank/interfaces';

import goto from '../utility/goto';

export default {

  list: navToQuestionBank

}

async function navToQuestionBank( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/question_banks/${ qBank.id }` );

  while ( await hasMore( page ) ) {

    await page.click( '#more_questions > a.more_questions_link' );
    await page.waitForNavigation( { waitUntil: 'networkidle' } );
    // await page.waitFor( 500 );

  }

}

async function hasMore( page: Puppeteer.Page ): Promise < boolean > {

  try {

    return await page.$eval( '#more_questions', div => div.style.display !== 'none' );

  } catch ( e ) {

    return false;

  }

}
