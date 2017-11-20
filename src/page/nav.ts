import * as Puppeteer from 'puppeteer';

import { Course } from '../interfaces/course';
import { Page } from '../interfaces/page';
import goto from '../utility/goto';

export async function navToPages( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  const url = `${rootUrl}/courses/${course.id}/pages`;

  await goto( page, url, { waitUntil: 'networkidle' } );

  let hasMore = await loadMore( page );

  while ( hasMore ) {

    await page.click( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );
    await page.waitForNavigation( { waitUntil: 'networkidle' } );

    hasMore = await loadMore( page );

  }

}

export async function navToPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  const url = `${rootUrl}/courses/${course.id}/pages/${contentPage.id}`;

  await goto( page, url, { waitUntil: 'networkidle' } );

}

async function loadMore( page: Puppeteer.Page ): Promise < boolean > {

  return await page.evaluate(() => {

    const loadingEl = document.querySelector( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );

    return loadingEl !== null;

  });

}
