import * as Puppeteer from 'puppeteer';

import { Course } from './interfaces';
import { listSelectors as selectors } from './selectors';

export default async function getCourseList( page: Puppeteer.Page, excludeRoles?: string[], includeTerms?: string[] ): Promise < Course[] > {

  const evalInnerHTML = element => element ? element.innerHTML.trim() : null;
  const evalHref = element => element ? element.getAttribute( 'href' ) : null;

  const coursesElement = await page.$$( selectors.courses );
  let courses = [];

  for ( let i = 0; i < coursesElement.length; i++ ) {

    const linkElement = await coursesElement[ i ].$( selectors.link );
    let id = await page.evaluate( evalHref, linkElement );

    if ( id ) {

      const titleElement = await coursesElement[ i ].$( selectors.title );
      const roleElement = await coursesElement[ i ].$( selectors.role );
      const termElement = await coursesElement[ i ].$( selectors.term );

      id = id.split( '/' );
      id = id[ id.length - 1 ];

      courses.push( {

        id: id,
        role: await page.evaluate( evalInnerHTML, roleElement ),
        title: await page.evaluate( evalInnerHTML, titleElement ),
        term: await page.evaluate( evalInnerHTML, termElement )

      } );

    }

  }

  if ( excludeRoles ) {

    courses = courses.filter( course => !excludeRoles.includes( course.role ) );

  }

  if ( includeTerms ) {

    courses = courses.filter( course => includeTerms.includes( course.term ) );

  }

  return courses;

}
