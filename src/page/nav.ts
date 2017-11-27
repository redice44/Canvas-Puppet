import * as Puppeteer from 'puppeteer';

import { Course } from '../course/interfaces';
import { Page } from './interfaces';
import goto from '../utility/goto';

export default {

  list: navToPageList,
  page: navToPage,
  new: navToNewPage

}

async function navToPageList( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages`, { waitUntil: 'networkidle' } );

  while ( await loadMore( page ) ) {

    await page.click( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );
    await page.waitForNavigation( { waitUntil: 'networkidle' } );

  }

}

async function navToPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages/${ contentPage.id }`, { waitUntil: 'networkidle' } );

}

async function navToNewPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages/${ contentPage.title.split( ' ' ).join( '-' ) }/edit`, { waitUntil: 'networkidle' } );

}

async function loadMore( page: Puppeteer.Page ): Promise < boolean > {

  return !! await page.$( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );

}
