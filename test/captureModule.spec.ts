import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../src';

import { loginInfo } from '../private/loginInfo';
import { lmsInfo } from '../private/lmsInfo';

import { DeviceList } from '../src/interfaces/device';

import Desktop1080p from '../src/devices/desktop-1080p';

test();

async function test() {
  const browser: Puppeteer.Browser = await Puppeteer.launch();
  const page: Puppeteer.Page = await browser.newPage();
  const deviceList: DeviceList = {
    screenshot: {
      rootPath: 'screenshots/test',
      subPath: '',
      date: 'date'
    },
    devices: []
  };

  deviceList.devices.push(await Desktop1080p(browser));

  await CanvasPuppet.login(page, loginInfo);
  const courseList = await CanvasPuppet.courseList(page, lmsInfo.url);
  const moduleList = await CanvasPuppet.moduleList(page, lmsInfo.url, courseList[0]);
  await CanvasPuppet.captureModule(page, lmsInfo.url, moduleList[3], deviceList);

  await page.close();
  await browser.close();
}
