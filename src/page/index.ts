import * as Puppeteer from 'puppeteer';

import getPages from './list';
import navigation from './nav';
import crud from './crud';

import { Course } from '../course/interfaces';
import { Page } from './interfaces';

export default {

  create: _create_,
  get: _get_,
  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < Page[] > {

  await navigation.list( page, rootUrl, course );
  return await getPages( page );

}

async function _get_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ): Promise < Page > {

  await navigation.page( page, rootUrl, course, contentPage );
  return await crud.get( page );

}

async function _create_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ): Promise < Page > {

  await navigation.create( page, rootUrl, course, contentPage );
  await crud.create( page, contentPage );
  return await crud.get( page );

}
