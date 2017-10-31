import * as Puppeteer from 'puppeteer';

import { Course } from '../interfaces/course';
import { selectors as courseSelectors } from '../config/selectors/courseList';
import goto from '../utility/goto';

export default async function getCourseList(page: Puppeteer.Page, rootUrl: string, includeTerms?: string[]): Promise<Course[]> {
  const courseUrl = `${rootUrl}/courses`;

  await goto(page, courseUrl);

  const current: Course[] = await page.evaluate(getCourse, courseSelectors.tables.current, courseSelectors.course);
  const past: Course[] = await page.evaluate(getCourse, courseSelectors.tables.past, courseSelectors.course);
  const future: Course[] = await page.evaluate(getCourse, courseSelectors.tables.future, courseSelectors.course);
  let courses: Course[] = current.concat(past, future);

  if (includeTerms) {
    courses = courses.filter(course => includeTerms.includes(course.term));
  }
  return courses;
}

function getCourse(table, selector): Course[] {
  let numCourses = document.querySelectorAll(`${table}${selector.row}`).length;
  let courses: Course[] = [];

  for (let i = 1; i <= numCourses; i++) {
    const titleSelector = selector.title.replace('INDEX', i);
    const linkSelector = selector.link.replace('INDEX', i);
    const termSelector = selector.term.replace('INDEX', i);
    const titleEl = document.querySelector(`${table}${titleSelector}`);
    const linkEl = document.querySelector(`${table}${linkSelector}`);
    const termEl = document.querySelector(`${table}${termSelector}`);

    if (titleEl) {
      const id = linkEl.getAttribute('href').split('/');
      courses.push({
        title: titleEl.innerHTML.trim(),
        id: id[id.length-1],
        term: termEl.innerHTML.trim()
      });
    }
  }

  return courses;
};