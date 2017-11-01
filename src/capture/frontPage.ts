import * as Puppeteer from 'puppeteer';

import { DeviceList } from '../interfaces/device';
import { Course } from '../interfaces/course';
import frontPageSelectors from '../config/selectors/frontPage';
import capturePage from './page';

export default async function captureFrontPage(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList) {
  const courseUrl = `${rootUrl}/courses/${course.id}`;
  deviceList.screenshot.subPostPath = 'Front Page';

  await capturePage(page, courseUrl, frontPageSelectors.content, deviceList);
}