import * as Puppeteer from 'puppeteer';

export default async function goto(page: Puppeteer.Page, url: string) {
  console.log(`  Navigating to: ${url}`);
  await page.goto(url);
}