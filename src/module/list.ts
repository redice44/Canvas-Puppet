import * as Puppeteer from 'puppeteer';

import { Course } from '../interfaces/course';
import { subModuleItem, ModuleItems } from '../interfaces/module';
import { selectors as moduleSelectors, itemTypes } from '../config/selectors/modules';

import goto from '../utility/goto';

export default async function getModuleList(page: Puppeteer.Page, rootUrl: string, course: Course): Promise<ModuleItems[]> {
  const modulesUrl = `${rootUrl}/courses/${course.id}/modules`;
  await goto(page, modulesUrl);
  const numModules: number = await page.$$eval(moduleSelectors.primaryModules, modules => modules.length);
  const modules: ModuleItems[] = [];

  for (let i = 1; i <= numModules; i++) {
    modules.push(await getModule(page, i));
  }

  return modules;
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
