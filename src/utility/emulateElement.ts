import * as Puppeteer from 'puppeteer';

export default async function emulateElement(page: Puppeteer.Page, device: Puppeteer.EmulateOptions, selector: string): Promise<Puppeteer.ElementHandle> {
  await page.emulate(device);
  return await page.$(selector);
}