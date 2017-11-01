import * as Puppeteer from 'puppeteer';

import _login_ from './admin/login';
import _courseList_ from './admin/courseList';
import _moduleList_ from './admin/moduleList';
import _frontPage_ from './capture/frontPage';
import _captureModule_ from './capture/module';

import { Course } from './interfaces/course';
import { DeviceList } from './interfaces/device';
import { LoginInfo } from './interfaces/credentials';
import { ModuleItems } from './interfaces/module';

export async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
  await _login_(page, loginInfo);
}

export async function courseList(page: Puppeteer.Page, rootUrl: string, includeTerms?: string[]): Promise<Course[]> {
  return await _courseList_(page, rootUrl, includeTerms);
}

export async function captureFrontPage(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList) {
  await _frontPage_(page, rootUrl, course, deviceList);
}

export async function moduleList(page: Puppeteer.Page, rootUrl: string, course: Course): Promise<ModuleItems[]> {
  return await _moduleList_(page, rootUrl, course);
}

export async function captureModule(page: Puppeteer.Page, rootUrl: string, module: ModuleItems, deviceList: DeviceList) {
  await _captureModule_(page, rootUrl, module, deviceList);
}
