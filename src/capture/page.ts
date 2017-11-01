import * as Puppeteer from 'puppeteer';

import { DeviceList } from '../interfaces/device';
import goto from '../utility/goto';
import emulateElement from '../utility/emulateElement';
import ss from '../utility/ss';

export default async function capturePage(page: Puppeteer.Page, pageUrl: string, selector: string, deviceList: DeviceList) {
  await goto(page, pageUrl);

  for (const device of deviceList.devices) {
    const content: Puppeteer.ElementHandle = await emulateElement(page, device.device, selector);
    await ss(content, deviceList.screenshot, device.name);
  }
  console.log();
}
