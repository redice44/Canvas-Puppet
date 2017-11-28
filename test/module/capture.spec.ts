import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { loginInfo } from '../../private/loginInfo';
import { lmsInfo } from '../../private/lmsInfo';

import defaultArgs from '../util/defaultArgs';

import { DeviceList } from '../../src/devices/interfaces';
import Desktop1080p from '../../src/devices/desktop-1080p';

test();

async function test() {

  const rootUrl = lmsInfo.url;
  const courseIndex = 0;
  const moduleIndex = 3;

  const argOpts = defaultArgs();
  const browser: Puppeteer.Browser = await Puppeteer.launch( {

    devtools: argOpts.devTools,
    headless: argOpts.headless

  } );

  const page: Puppeteer.Page = await browser.newPage();
  const deviceList: DeviceList = {

    screenshot: {

      coursePath: 'screenshots/test',
      sectionPath: '',
      uniquePath: ''

    },

    devices: []

  };

  deviceList.devices.push( await Desktop1080p( browser ) );

  await CanvasPuppet.admin.login( page, loginInfo );
  const courseList = await CanvasPuppet.course.list( page, rootUrl );
  const moduleList = await CanvasPuppet.module.list( page, rootUrl, courseList[ courseIndex ] );
  await CanvasPuppet.module.capture( page, rootUrl, courseList[ courseIndex ], moduleList[ moduleIndex ], deviceList );

  if ( argOpts.finish ) {

    await page.close();
    await browser.close();

  }

}
