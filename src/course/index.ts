import * as Puppeteer from 'puppeteer';

import getCourseList from './list';
import navigation from './nav';

import { Course } from './interfaces';

export default {

  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, includeTerms?: string[] ): Promise < Course[] > {

  await navigation.list( page, rootUrl );
  return await getCourseList( page, includeTerms );

}
