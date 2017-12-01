import * as Puppeteer from 'puppeteer';

import captureModuleItem from './capture';
import createModule from './create';
import deleteModule from './delete';
import getModuleList from './list';
import navigation from './nav';
import updateModule from './update';

import { Course } from '../course/interfaces';
import { DeviceList } from '../devices/interfaces';
import { Module } from './interfaces';

export default {

  capture: _capture_,
  create: _create_,
  delete: _delete_,
  list: _list_,
  update: _update_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course ): Promise < Module[] > {

  await navigation.list( page, rootUrl, course );
  return await getModuleList( page );

}

async function _capture_( page: Puppeteer.Page, rootUrl: string, course: Course, contentModule: Module, deviceList: DeviceList ) {

  deviceList.screenshot.sectionPath = `module/${ contentModule.title }`;
  const digits = Math.floor( contentModule.items.length / 10 );

  for ( let i = 0; i < contentModule.items.length; i++ ) {

    deviceList.screenshot.uniquePath = `${ '0'.repeat( digits - Math.floor( ( i + 1 ) / 10 ) ) }${ i+1 }_${ contentModule.items[ i ].title }/date`;

    await navigation.moduleItem( page, rootUrl, course, contentModule.items[ i ] );
    await captureModuleItem( page, deviceList );

  }

}

async function _create_( page: Puppeteer.Page, rootUrl: string, course: Course, contentModule: Module ) {

  await navigation.list( page, rootUrl, course );
  return await createModule( page, contentModule );

}

async function _delete_( page: Puppeteer.Page, rootUrl: string, course: Course, contentModule: Module ) {

  await navigation.list( page, rootUrl, course );
  return await deleteModule( page, contentModule );

}

async function _update_( page: Puppeteer.Page, rootUrl: string, course: Course, contentModule: Module ) {

  await navigation.list( page, rootUrl, course );
  return await updateModule( page, contentModule );

}
