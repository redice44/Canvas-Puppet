import * as Puppeteer from 'puppeteer';
import lmsConfig from '../../private/lmsConfig';
import goto from '../utility/goto';

export default async function getCourseList(page: Puppeteer.Page) {
  const courseUrl = `${lmsConfig.url}/courses`;
  const tableSelectors = {
    current: '#my_courses_table',
    past: '#past_enrollments_table',
    future: '#future_enrollments_table'
  };
  const selectors = {
    row: ' > tbody > tr',
    title: ' > tbody > tr:nth-child(INDEX) > td.course-list-course-title-column.course-list-no-left-border > a > span',
    link: ' > tbody > tr:nth-child(INDEX) > td.course-list-course-title-column.course-list-no-left-border > a',
    term: ' > tbody > tr:nth-child(INDEX) > td.course-list-no-left-border.course-list-term-column'
  };

  await goto(page, courseUrl);

  console.log('Getting Courses');
  const current = await page.evaluate(getCourse, tableSelectors.current, selectors);
  const past = await page.evaluate(getCourse, tableSelectors.past, selectors);
  const future = await page.evaluate(getCourse, tableSelectors.future, selectors);

  return current.concat(past, future);
}

function getCourse(table, selector) {
  let numCourses = document.querySelectorAll(`${table}${selector.row}`).length;
  let courses = [];

  for (let i = 1; i <= numCourses; i++) {
    const titleSelector = selector.title.replace('INDEX', i);
    const linkSelector = selector.link.replace('INDEX', i);
    const termSelector = selector.term.replace('INDEX', i);
    const titleEl = document.querySelector(`${table}${titleSelector}`);
    const linkEl = document.querySelector(`${table}${linkSelector}`);
    const termEl = document.querySelector(`${table}${termSelector}`);

    if (titleEl) {
      courses.push({
        title: titleEl.innerHTML.trim(),
        link: linkEl.getAttribute('href'),
        term: termEl.innerHTML.trim()
      });
    }
  }

  return courses;
};