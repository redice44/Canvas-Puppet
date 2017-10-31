import * as Puppeteer from 'puppeteer';

import loginModule from './admin/login';
import courseListModule from './admin/courseList';
import frontPageModule from './capture/frontPage';

import { Course } from './interfaces/course';
import { DeviceList } from './interfaces/device';
import { LoginInfo } from './interfaces/credentials';


export async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
  await loginModule(page, loginInfo);
}

export async function courseList(page: Puppeteer.Page, rootUrl: string, includeTerms?: string[]): Promise<Course[]> {
  return await courseListModule(page, rootUrl, includeTerms);
}

export async function captureFrontPage(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList) {
  await frontPageModule(page, rootUrl, course, deviceList);
}
