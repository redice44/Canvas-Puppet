import * as Puppeteer from 'puppeteer';

import { DeviceList } from '../devices/interfaces';
import { captureSelector } from './selectors';

import emulateElement from '../utility/emulateElement';
import ss from '../utility/ss';

export default async function captureModuleItem( page: Puppeteer.Page, deviceList: DeviceList ) {

  for ( const device of deviceList.devices ) {

    const content = await emulateElement( page, device.device, captureSelector );
    await ss( content, deviceList.screenshot, device.name );

  }

}
