import * as Puppeteer from 'puppeteer';

import { LoginInfo } from './interfaces';

import goto from '../utility/goto';

export default {

  login: loginPage

}

async function loginPage( page: Puppeteer.Page, loginInfo: LoginInfo ) {

  await goto( page, loginInfo.url );

}
