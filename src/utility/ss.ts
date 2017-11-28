import * as mkdirp from 'mkdirp';
import * as Puppeteer from 'puppeteer';

import { Screenshot } from '../devices/interfaces';

export default async function ss( el: Puppeteer.ElementHandle, ss: Screenshot, deviceName: string ) {

  if ( !process.env.RUN_SILENT ) {

    console.log( `    Generating Screenshot: ${ ss.coursePath }/${ ss.sectionPath }/${ ss.uniquePath }/${ deviceName }.png` );

  }

  try {

    await el.screenshot( { path: `${ ss.coursePath }/${ ss.sectionPath }/${ ss.uniquePath }/${ deviceName }.png` } );

  } catch ( e ) {

    if ( e.code === 'ENOENT' ) {

      mkdirp.sync( `${ ss.coursePath }/${ ss.sectionPath }/${ ss.uniquePath }` );
      await el.screenshot( { path: `${ ss.coursePath }/${ ss.sectionPath }/${ ss.uniquePath }/${ deviceName }.png` } );

    } else {

      throw e;

    }

  }

}
