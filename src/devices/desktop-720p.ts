import * as Puppeteer from 'puppeteer';

import { Device } from '../interfaces/device';

export default async function getDevice(browser: Puppeteer.Browser): Promise<Device> {
  const browserUserAgent = await browser.version();

  return {
    name: 'Desktop-720p',
    device: {
      viewport: {
        width: 1280,
        height: 720
      },
      userAgent: browserUserAgent.replace('Headless', '')
    }
  };
}
