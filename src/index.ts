import * as Puppeteer from 'puppeteer';

import setupPage from './config/setupPage';
import login from './config/login';
import getCourseList from './stats/getCourseList';

run();

async function run() {
  const browser: Puppeteer.Browser  = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await setupPage(browser);
  await login(page);

  let courses = await getCourseList(page);
  console.log(`Courses: #${courses.length}`);
  browser.close();
}
