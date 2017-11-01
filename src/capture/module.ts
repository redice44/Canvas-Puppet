import * as Puppeteer from 'puppeteer';

import { DeviceList } from '../interfaces/device';
import { ModuleItems } from '../interfaces/module';

import capturePage from './page';

export default async function captureModule(page: Puppeteer.Page, rootUrl: string, moduleItems: ModuleItems, deviceList: DeviceList) {
  for (let i = 0; i < moduleItems.items.length; i++) {
    deviceList.screenshot.subPath = `Modules/${moduleItems.title}/${i+1}_${moduleItems.items[i].title}`;
    switch(moduleItems.items[i].type) {
      case 'page':
        await capturePage(page, `${rootUrl}/${moduleItems.items[i].link}`, '#wiki_page_show > div.show-content.user_content', deviceList);
        break;
      case 'link':
        break;
      case 'file':
        break;
      case 'discussion':
        break;
      case 'assignment':
        break;
      case 'quiz':
        break;
      case 'header':
        break;
      case 'tool':
        break;
      default:
    }
  }
}