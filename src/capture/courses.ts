import * as Puppeteer from 'puppeteer';

import login from '../config/login';
import captureFrontPage from './frontPage';

import { Course } from '../stats/course';
import { DeviceList } from '../stats/device';
import { rootUrl } from '../../private/lmsConfig';
import goto from '../utility/goto';

export default async function captureCourses(browser: Puppeteer.Browser, deviceList: DeviceList) {
  const page: Puppeteer.Page = await browser.newPage();

  await login(page);

  let courses: Course[] = await getCourseList(page);
  console.log(`Courses: #${courses.length}`);

  for (let i = 0; i < courses.length; i++) {
    console.log(`Capturing Course ${i+1} of ${courses.length}`);
    await captureCourse(page, courses[i], deviceList);
  }

  await page.close();
}

async function captureCourse(page: Puppeteer.Page, course: Course, deviceList: DeviceList) {
  deviceList.screenshot.rootPath = `courses/${course.term}/${course.title}`
  await captureFrontPage(page, course, deviceList);
}

async function getCourseList(page: Puppeteer.Page, includeTerms?: string[]): Promise<Course[]> {
  const courseUrl = `${rootUrl}/courses`;
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

  console.log('Getting Course List');
  const current: Course[] = await page.evaluate(getCourse, tableSelectors.current, selectors);
  const past: Course[] = await page.evaluate(getCourse, tableSelectors.past, selectors);
  const future: Course[] = await page.evaluate(getCourse, tableSelectors.future, selectors);
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