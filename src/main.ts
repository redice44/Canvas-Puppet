import * as Puppeteer from 'puppeteer';

import captureCourses from './capture/courses';
import { DeviceList } from './interfaces/device';
import getDesktop720p from './devices/desktop-720p';
import getDesktop1080p from './devices/desktop-1080p';

run();

async function run() {
  const today = new Date();
  const browser: Puppeteer.Browser  = await Puppeteer.launch({
    // headless: false
  });
  const deviceList: DeviceList = {
    screenshot: {
      rootPath: '',
      subPath: '',
      date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    },
    devices: []
  }

  deviceList.devices.push(await getDesktop720p(browser));
  deviceList.devices.push(await getDesktop1080p(browser));

  await captureCourses(browser, deviceList);

  browser.close();
}
