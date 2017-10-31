import * as Puppeteer from 'puppeteer';

import loginModule from './admin/login';
import courseListModule from './admin/courseList';

import { LoginInfo } from './interfaces/credentials';

export async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
  await loginModule(page, loginInfo);
}

export async function courseList(page: Puppeteer.Page, rootUrl: string, includeTerms?: string[]) {
  return await courseListModule(page, rootUrl, includeTerms);
}