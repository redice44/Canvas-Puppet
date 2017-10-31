import * as Puppeteer from 'puppeteer';

import loginModule from './admin/login';
import { LoginInfo } from './interfaces/credentials';

export async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
  try {
    await loginModule(page, loginInfo);
  } catch(e) {
    throw e;
  }
}
