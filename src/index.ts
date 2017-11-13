import * as Puppeteer from 'puppeteer';

import _login_ from './admin/login';
import _courseList_ from './admin/courseList';
import _moduleList_ from './admin/moduleList';
import _frontPage_ from './capture/frontPage';
import _captureModule_ from './capture/module';
import * as _QuestionBank_ from './quiz/questionBank';

import { Course } from './interfaces/course';
import { DeviceList } from './interfaces/device';
import { LoginInfo } from './interfaces/credentials';
import { ModuleItems } from './interfaces/module';

export const QuestionBank = {
  goto: _QuestionBank_.goto,
  gotoQuestionBank: _QuestionBank_.gotoQuestionBank,
  gotoQuestionBankMain: _QuestionBank_.gotoQuestionBankMain,
  getBanks: _QuestionBank_.getBanks,
  getQuestions: _QuestionBank_.getQuestions,
  createBank: _QuestionBank_.createBank,
  createQuestion: _QuestionBank_.createQuestion
};

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

export async function captureAllModules(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList, enumerate: boolean = true) {
  const modules = await moduleList(page, rootUrl, course);

  for (let i = 0; i < modules.length; i++) {
    if (enumerate) {
      modules[i].title = `${i}_${modules[i].title}`;
    }
    await captureModule(page, rootUrl, modules[i], deviceList);
  }
}

export async function captureCourse(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList, enumerate: boolean = true) {
  deviceList.screenshot.subPrePath = `${course.term}/${course.title}`;
  await captureFrontPage(page, rootUrl, course, deviceList);
  await captureAllModules(page, rootUrl, course, deviceList, enumerate);
}

export async function captureCourseList(page: Puppeteer.Page, rootUrl: string, courses: Course[], deviceList: DeviceList, enumerate: boolean = true) {
  for (let i = 0; i < courses.length; i++) {
    await captureCourse(page, rootUrl, courses[i], deviceList, enumerate);
  }
}

export async function captureAllCourses(page: Puppeteer.Page, rootUrl: string, deviceList: DeviceList, enumerate: boolean = true) {
  const courses = await courseList(page, rootUrl);
  await captureCourseList(page, rootUrl, courses, deviceList, enumerate);
}