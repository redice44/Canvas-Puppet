import * as Puppeteer from 'puppeteer';

import { Course } from '../interfaces/course';
import { Page } from './interfaces';
import goto from '../utility/goto';

export default {

  list: navToPageList,
  page: navToPage,
  new: navToNewPage

}

async function navToPageList( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  await goto( page, `${rootUrl}/courses/${course.id}/pages`, { waitUntil: 'networkidle' } );

  let hasMore = await loadMore( page );

  while ( hasMore ) {

    await page.click( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );
    await page.waitForNavigation( { waitUntil: 'networkidle' } );

    hasMore = await loadMore( page );

  }

}

async function navToPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await goto( page, `${rootUrl}/courses/${course.id}/pages/${contentPage.id}`, { waitUntil: 'networkidle' } );

}

async function navToNewPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await goto( page, `${rootUrl}/courses/${course.id}/pages/${contentPage.title.split( ' ' ).join( '-' )}/edit`, { waitUntil: 'networkidle' } );

}

async function loadMore( page: Puppeteer.Page ): Promise < boolean > {

  return await page.evaluate(() => {

    const loadingEl = document.querySelector( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );

    return loadingEl !== null;

  });

}
