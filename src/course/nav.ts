import * as Puppeteer from 'puppeteer';

import goto from '../utility/goto';

export default {

  list: courseList

}

async function courseList( page: Puppeteer.Page, rootUrl: string ) {

  await goto( page, `${rootUrl}/courses` );

}
