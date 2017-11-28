import * as Puppeteer from 'puppeteer';

import { Device } from './interfaces';

export default async function getDevice(browser: Puppeteer.Browser): Promise<Device> {
  const browserUserAgent = await browser.version();

  return {
    name: 'Desktop-1080p',
    device: {
      viewport: {
        width: 1920,
        height: 1080
      },
      userAgent: browserUserAgent.replace('Headless', '')
    }
  };
}
