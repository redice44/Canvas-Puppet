import * as Puppeteer from 'puppeteer';

import { Course } from './interfaces';
import selectors from './selectors';

export default async function getCourseList( page: Puppeteer.Page, includeTerms?: string[] ): Promise < Course[] > {

  const current: Course[] = await page.evaluate( getCourse, selectors.tables.current, selectors.course );
  const past: Course[] = await page.evaluate( getCourse, selectors.tables.past, selectors.course );
  const future: Course[] = await page.evaluate( getCourse, selectors.tables.future, selectors.course );
  let courses: Course[] = current.concat( past, future );

  if ( includeTerms ) {

    courses = courses.filter( course => includeTerms.includes( course.term ) );

  }

  return courses;

}

function getCourse( table, selector ): Course[] {

  let numCourses = document.querySelectorAll( `${table}${selector.row}` ).length;
  let courses: Course[] = [];

  for ( let i = 1; i <= numCourses; i++ ) {

    const titleSelector = selector.title.replace( 'INDEX', i );
    const linkSelector = selector.link.replace( 'INDEX', i );
    const termSelector = selector.term.replace( 'INDEX', i );
    const titleEl = document.querySelector( `${table}${titleSelector}` );
    const linkEl = document.querySelector( `${table}${linkSelector}` );
    const termEl = document.querySelector( `${table}${termSelector}` );

    if ( titleEl ) {

      const id = linkEl.getAttribute( 'href' ).split( '/' );

      courses.push( {

        title: titleEl.innerHTML.trim(),
        id: id[ id.length-1 ],
        term: termEl.innerHTML.trim()

      } );

    }

  }

  return courses;

}
