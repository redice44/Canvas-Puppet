import * as Puppeteer from 'puppeteer';

export default async function setupPage(browser: Puppeteer.Browser, width: number = 1280, height: number = 800): Promise<Puppeteer.Page> {
  const userAgent = await browser.version();
  const page: Puppeteer.Page = await browser.newPage();
  page.setViewport({ width: width, height: height });

  // Changes headless user agent to avoid browser minimum requirements of Canvas
  page.setUserAgent(userAgent.replace('Headless', ''));

  return page;
}