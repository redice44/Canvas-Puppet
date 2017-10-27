import * as Puppeteer from 'puppeteer';

import setupPage from './utility/setupPage';
import login from './utility/login';
import getCourses from './utility/getCourses';

run();

async function run() {
  const browser: Puppeteer.Browser  = await Puppeteer.launch({
    // headless: false
  });
  const page: Puppeteer.Page = await setupPage(browser);
  await login(page);

  let courses = await getCourses(page);
  console.log(`Courses: #${courses.length}`);
  browser.close();
}
