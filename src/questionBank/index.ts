import * as Puppeteer from 'puppeteer';

import getBanks from './list';
import navigation from './nav';


import { Course } from '../course/interfaces';
import { QuestionBank } from './interfaces';


export default {

  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < QuestionBank[] > {

  await navigation.list( page, rootUrl, course );
  return await getBanks( page );

}
