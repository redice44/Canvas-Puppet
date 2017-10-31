import * as Puppeteer from 'puppeteer';

import { rootUrl } from '../../private/lmsConfig';
import { DeviceList } from '../stats/device';
import { Course } from '../stats/course';
import { subModuleItem, ModuleItems } from '../stats/module';
import { selectors as moduleSelectors, itemTypes } from '../config/selectors/modules';
import capturePage from './page';

export default async function captureModules(page: Puppeteer.Page, course: Course, deviceList: DeviceList) {
  const modulesUrl = `${rootUrl}/courses/${course.id}/modules`;
  deviceList.screenshot.subPath = `Modules/0_Main`;
  await capturePage(page, modulesUrl, moduleSelectors.modulesContainer, deviceList);

  const numModules: number = await page.$$eval(moduleSelectors.primaryModules, modules => modules.length);
  const modules: ModuleItems[] = [];
  for (let i = 1; i <= numModules; i++) {
    modules.push(await getModule(page, i));
  }

  for (let i = 0; i < modules.length; i++)  {
    await captureModule(page, deviceList, modules[i], i+1);
  }
}

async function captureModule(page: Puppeteer.Page, deviceList: DeviceList, moduleItems: ModuleItems, moduleIndex: number) {
  for (let i = 0; i < moduleItems.items.length; i++) {
    deviceList.screenshot.subPath = `Modules/${moduleIndex}_${moduleItems.title}/${i+1}_${moduleItems.items[i].title}`;
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
      case 'quiiz':
        break;
      case 'header':
        break;
      case 'tool':
        break;
      default:
    }
  }
}

async function getModule(page: Puppeteer.Page, index: number): Promise<ModuleItems> {
  const moduleItems: ModuleItems = {
    title: '',
    items: []
  };
  moduleItems.title = await page.$eval(moduleSelectors.moduleTitle.replace('INDEX', ''+index), (el: HTMLElement) => el.innerHTML.trim());
  const numItems: number = await page.$$eval(moduleSelectors.contentItems.replace('INDEX', ''+index), items => items.length);
  // console.log(`  Module: ${moduleItems.title}`);

  for (let i = 1; i <= numItems; i++) {
    const item: subModuleItem = {
      title: '',
      link: '',
      type: ''
    }
    item.title = await page.$eval(moduleSelectors.contentLink.replace('INDEX', ''+index).replace('INDEX2', ''+i), (el: HTMLElement) => el.innerHTML.trim());
    item.link = await page.$eval(moduleSelectors.contentLink.replace('INDEX', ''+index).replace('INDEX2', ''+i) , (el: HTMLElement) => el.getAttribute('href').trim());
    const itemClasses: string[] = await page.mainFrame().$eval(moduleSelectors.contentType.replace('INDEX', ''+index).replace('INDEX2', ''+i), (item: HTMLElement) => {
      let classes = [];
      for (let i = 0; i < item.classList.length; i++) {
        classes.push(item.classList[i]);
      }
      return classes;
    });

    for (let i = 0; i < itemTypes.length; i++) {
      if (itemClasses.includes(itemTypes[i].className)) {
        item.type = itemTypes[i].type;
        break;
      }
    }

    moduleItems.items.push(item);
  }

  return moduleItems;
}
