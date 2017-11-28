import * as Puppeteer from 'puppeteer';

import getModuleList from './list';
import navigation from './nav';

import { Course } from '../course/interfaces';
import { DeviceList } from '../devices/interfaces';
import { Module } from './interfaces';

export default {

  capture: _capture_,
  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < Module[] > {

  await navigation.list( page, rootUrl, course );
  return await getModuleList( page );

}

async function _capture_( page: Puppeteer.Page, rootUrl: string, course: Course, moduleItems: Module, deviceList: DeviceList ) {



}