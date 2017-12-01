import * as Puppeteer from 'puppeteer';

import { Course } from '../course/interfaces';
import { Page } from './interfaces';
import { allPages as selectors } from './selectors';
import goto from '../utility/goto';

export default {

  edit: navToEditPage,
  list: navToPageList,
  page: navToPage,
  create: navToNewPage

}

async function navToPageList( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages` );

  while ( await loadMore( page ) ) {

    if ( !process.env.RUN_SILENT ) {

      console.log( `    Loading more pages` );

    }

    const count = await page.$$eval( selectors.pageList, p => p.length );

    await page.click( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );
    await page.waitForFunction( ( c, s ) => c < document.querySelectorAll( s ).length, { polling: 'mutation', }, count, selectors.pageList );

  }

}

async function navToPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  if ( !contentPage.id ) {

    throw new Error( 'Page missing ID' );

  }

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages/${ contentPage.id }` );

}

async function navToNewPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages/${ contentPage.title.split( ' ' ).join( '-' ) }/edit` );

}

async function navToEditPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  if ( !contentPage.id ) {

    throw new Error( 'Page missing ID' );

  }

  await goto( page, `${ rootUrl }/courses/${ course.id }/pages/${ contentPage.id }/edit` );

}

async function loadMore( page: Puppeteer.Page ): Promise < boolean > {

  return !! await page.$( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );

}
