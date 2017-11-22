import * as Puppeteer from 'puppeteer';

import _login_ from './login';
import navigation from './nav';

import { LoginInfo } from './interfaces';

export default {

  login: login

};

async function login( page: Puppeteer.Page, loginInfo: LoginInfo ) {

  await navigation.login( page, loginInfo );
  await _login_( page, loginInfo );

}
