import * as Puppeteer from 'puppeteer';

import getList from './list';
import navigation from './nav';
import createPage from './create';
import capturePage from './capture';
import getPage from './get';
import delPage from './del';
import updatePage from './update';

import { Course } from '../course/interfaces';
import { DeviceList } from '../devices/interfaces';
import { Page } from './interfaces';

export default {

  capture: _capture_,
  create: _create_,
  delete: _delete_,
  get: _get_,
  list: _list_,
  update: _update_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < Page[] > {

  await navigation.list( page, rootUrl, course );
  return await getList( page );

}

async function _get_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ): Promise < Page > {

  await navigation.page( page, rootUrl, course, contentPage );
  return await getPage( page );

}

async function _capture_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page, deviceList: DeviceList ) {

  deviceList.screenshot.sectionPath = 'path';
  deviceList.screenshot.uniquePath = `${ contentPage.title }/date`;

  await navigation.page( page, rootUrl, course, contentPage );
  await capturePage( page , deviceList );

}

async function _create_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ): Promise < Page > {

  await navigation.create( page, rootUrl, course, contentPage );
  await createPage( page, contentPage );
  return await getPage( page );

}

async function _delete_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

  await navigation.page( page, rootUrl, course, contentPage );
  await delPage( page );

}

async function _update_( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ): Promise < Page > {

  await navigation.edit( page, rootUrl, course, contentPage );
  await updatePage( page, contentPage );
  return await getPage( page );

}
