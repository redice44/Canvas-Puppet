import * as mkdirp from 'mkdirp';
import * as Puppeteer from 'puppeteer';

import { Screenshot } from '../interfaces/device';

export default async function ss(el: Puppeteer.ElementHandle, ss: Screenshot, deviceName: string) {
  console.log(`    Generating Screenshot: ${ss.rootPath}/${ss.subPath}/${ss.date}/${deviceName}.png`);

  try {
    await el.screenshot({
      path: `${ss.rootPath}/${ss.subPath}/${ss.date}/${deviceName}.png`
    });
  } catch (e) {
    if (e.code === 'ENOENT') {
      mkdirp.sync(`${ss.rootPath}/${ss.subPath}/${ss.date}`);
      await el.screenshot({
        path: `${ss.rootPath}/${ss.subPath}/${ss.date}/${deviceName}.png`
      });
    } else {
      console.log(e);
      throw e;
    }
  }
}