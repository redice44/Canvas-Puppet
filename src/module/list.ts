import * as Puppeteer from 'puppeteer';

import parseModule from './parseModule';

import { Module } from './interfaces';
import { listSelectors as selectors } from './selectors';

export default async function getModuleList( page: Puppeteer.Page ): Promise < Module[] > {

  const modulesElement = await page.$$( selectors.list );
  const modules = [];

  for ( let i = 0;  i < modulesElement.length; i++ ) {

    modules.push( await parseModule( page, modulesElement[ i ] ) );

  }

  return modules;

}
