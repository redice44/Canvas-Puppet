import * as Puppeteer from 'puppeteer';

import { rootUrl } from '../../private/lmsConfig';
import { DeviceList } from '../interfaces/device';
import { Course } from '../interfaces/course';
import frontPageSelectors from '../config/selectors/frontPage';
import capturePage from './page';

export default async function captureFrontPage(page: Puppeteer.Page, course: Course, deviceList: DeviceList) {
  const courseUrl = `${rootUrl}/courses/${course.id}`;
  deviceList.screenshot.subPath = 'Front Page';

  await capturePage(page, courseUrl, frontPageSelectors.content, deviceList);
}