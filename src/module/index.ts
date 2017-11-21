import * as Puppeteer from 'puppeteer';

import getModuleList from './list';
import navigation from './nav';

import { Course } from '../course/interfaces';
import { ModuleItems } from './interfaces';

export default {

  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < ModuleItems[] > {

  await navigation.list( page, rootUrl, course );
  return await getModuleList( page, course );

}
