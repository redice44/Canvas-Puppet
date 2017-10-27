import * as Puppeteer from 'puppeteer';

import login from '../config/login';
import getCourseList from '../stats/getCourseList';
import captureFrontPage from './frontPage';
import { Course } from '../stats/course';
import { DeviceList } from '../stats/device';

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