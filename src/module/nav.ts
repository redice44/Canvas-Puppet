import * as Puppeteer from 'puppeteer';

import { Course } from '../course/interfaces';
import { ModuleItem } from './interfaces';

import goto from '../utility/goto';

export default {

  list: navToModuleList,
  moduleItem: navToModuleItem

}

async function navToModuleList( page: Puppeteer.Page, rootUrl: string, course: Course ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/modules` );

}

async function navToModuleItem( page: Puppeteer.Page, rootUrl: string, course: Course, moduleItem: ModuleItem ) {

  await goto( page, `${ rootUrl }/courses/${ course.id }/modules/items/${ moduleItem.moduleId }` );

}
