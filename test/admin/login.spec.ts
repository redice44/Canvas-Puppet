import * as Puppeteer from 'puppeteer';
import * as CanvasPuppet from '../../src';

import { LoginInfo } from '../../src/admin/interfaces';
import { loginInfo } from '../../private/loginInfo';
import { NavigationErrorCodes } from '../../src/errors/navigation';
import { DOMErrorCodes } from '../../src/errors/DOM';

import defaultArgs from '../util/defaultArgs';

test();

async function test() {

  const argOpts = defaultArgs();

  let customLoginInfo;

  customLoginInfo = copyInfo( loginInfo );

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Pass' );

  } catch ( e ) {

    console.log( 'Fail' );
    throw e;

  }

  customLoginInfo = copyInfo( loginInfo );
  customLoginInfo.url = 'http://blargjs.sji';

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Fail' );
    throw new Error( 'Should have thrown error' );

  } catch ( e ) {

    if ( e.code && e.code === NavigationErrorCodes.FAILED ) {

      console.log( 'Pass' );

    } else {

      console.log( 'Fail' );
      throw e;

    }

  }

  customLoginInfo = copyInfo( loginInfo );
  customLoginInfo.selectors.username = '';

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Fail' );
    throw new Error( 'Should have thrown error' );

  } catch ( e ) {

    if ( e.code && e.code === DOMErrorCodes.EMPTY_SELECTOR ) {

      console.log( 'Pass' );

    } else {

      console.log( 'Fail' );
      throw e;

    }

  }

  customLoginInfo = copyInfo( loginInfo );
  customLoginInfo.selectors.username = '#foo';

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Fail' );
    throw new Error( 'Should have thrown error' );

  } catch ( e ) {

    if ( e.code && e.code === DOMErrorCodes.SELECTOR_NOT_FOUND ) {

      console.log( 'Pass' );

    } else {

      console.log( 'Fail' );
      throw e;

    }

  }

  customLoginInfo = copyInfo( loginInfo );
  customLoginInfo.credentials.username = 'foo';

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Fail' );
    throw new Error('Should have thrown error');

  } catch ( e ) {

    if ( e.code && e.code === NavigationErrorCodes.UNEXPECTED_DESTINATION ) {

      console.log( 'Pass' );

    } else {

      console.log( 'Fail' );
      throw e;

    }

  }

  customLoginInfo = copyInfo( loginInfo );
  customLoginInfo.selectors.loginButton = loginInfo.selectors.username;

  try {

    await login( customLoginInfo, argOpts );
    console.log( 'Fail' );
    throw new Error( 'Should have thrown error' );

  } catch ( e ) {

    if ( e.code && e.code === NavigationErrorCodes.TIMEOUT ) {

      console.log( 'Pass' );

    } else {

      console.log( 'Fail' );
      throw e;

    }

  }

}

function copyInfo( loginInfo: LoginInfo ): LoginInfo {

  let customLoginInfo = Object.assign( {}, loginInfo );

  customLoginInfo.selectors = Object.assign( {}, loginInfo.selectors );
  customLoginInfo.credentials = Object.assign( {}, loginInfo.credentials );

  return customLoginInfo;

}

async function login( loginInfo: LoginInfo, opts ) {

  const browser: Puppeteer.Browser = await Puppeteer.launch( { headless: opts.headless } );
  const page: Puppeteer.Page = await browser.newPage();

  try {

    await CanvasPuppet.admin.login( page, loginInfo );
    await page.close();
    await browser.close();

  } catch ( e ) {

    await page.close();
    await browser.close();
    throw e;

  }

}
