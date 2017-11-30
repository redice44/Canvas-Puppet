import * as Puppeteer from 'puppeteer';

import createBank from './create';
import deleteBank from './delete';
import getBanks from './list';
import navigation from './nav';

import { Course } from '../course/interfaces';
import { QuestionBank } from './interfaces';


export default {

  create: _create_,
  delete: _delete_,
  list: _list_

};


async function _create_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank ) {

  await navigation.list( page, rootUrl, course );
  await createBank( page, qBank );

}

async function _delete_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank ) {

  await navigation.list( page, rootUrl, course );
  await deleteBank( page, qBank );

}

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < QuestionBank[] > {

  await navigation.list( page, rootUrl, course );
  return await getBanks( page );

}
