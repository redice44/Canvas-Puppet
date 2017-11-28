import * as Puppeteer from 'puppeteer';

import { DeviceList } from '../devices/interfaces';

import emulateElement from '../utility/emulateElement';
import ss from '../utility/ss';

export default async function capturePage( page: Puppeteer.Page, selector: string, deviceList: DeviceList ) {

  for (const device of deviceList.devices) {

    const content: Puppeteer.ElementHandle = await emulateElement(page, device.device, selector);
    await ss(content, deviceList.screenshot, device.name);

  }

}
