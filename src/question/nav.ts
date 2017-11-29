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

    if ( !process.env.RUN_SILENT ) {

      console.log( `    Loading more questions` );

    }

    const count = await page.$$eval( '#questions > div', q => q.length );

    await page.click( '#more_questions > a.more_questions_link' );
    await page.waitForFunction( c => c < document.querySelectorAll( '#questions > div' ).length, { polling: 'mutation' }, count );

  }

}

async function hasMore( page: Puppeteer.Page ): Promise < boolean > {

  try {

    const isHidden = eh => eh.style.display !== 'none';

    return await page.$eval( '#more_questions', isHidden );

  } catch ( e ) {

    return false;

  }

}
