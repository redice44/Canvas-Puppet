import * as Puppeteer from 'puppeteer';

import { rootUrl } from '../../private/lmsConfig';
import { DeviceList } from '../stats/device';
import { Course } from '../stats/course';
import frontPageSelectors from '../config/selectors/frontPage';
import goto from '../utility/goto';
import emulateElement from '../utility/emulateElement';
import ss from '../utility/ss';

export default async function captureFrontPage(page: Puppeteer.Page, course: Course, deviceList: DeviceList) {
  const courseUrl = `${rootUrl}/courses/${course.id}`;
  deviceList.screenshot.subPath = 'Front Page';

  await goto(page, courseUrl);

  for (const device of deviceList.devices) {
    const content: Puppeteer.ElementHandle = await emulateElement(page, device.device, frontPageSelectors.content);
    await ss(content, deviceList.screenshot, device.name);
  }
}