// import * as Puppeteer from 'puppeteer';

import _admin_ from './admin';
import _course_ from './course';
import _module_ from './module';
import _page_ from './page';


// import _login_ from './admin/login';
// import _moduleList_ from './admin/moduleList';
// import _frontPage_ from './capture/frontPage';
// import _captureModule_ from './capture/module';
// import * as _QuestionBank_ from './quiz/questionBank';

// import {
//   navToNewPage as _pageNavNew_,
//   navToPage as _pageNav_,
//   navToPages as _pagesNav_
// } from './page/nav';
// import _createPage_ from'./page/createPage';
// import _getPage_ from './page/getPage';
// import _getPages_ from './page/getPages';

// import { Course } from './interfaces/course';
// import { DeviceList } from './interfaces/device';
// import { LoginInfo } from './interfaces/credentials';
// import { ModuleItems } from './interfaces/module';
// import { Page } from './interfaces/page';

export const admin = _admin_;
export const course = _course_;
export const module = _module_;
export const page = _page_;

// export const QuestionBank = {
//   goto: _QuestionBank_.goto,
//   gotoQuestionBank: _QuestionBank_.gotoQuestionBank,
//   gotoQuestionBankMain: _QuestionBank_.gotoQuestionBankMain,
//   getBanks: _QuestionBank_.getBanks,
//   getQuestions: _QuestionBank_.getQuestions,
//   createBank: _QuestionBank_.createBank,
//   createQuestion: _QuestionBank_.createQuestion
// };

// export async function login(page: Puppeteer.Page, loginInfo: LoginInfo) {
//   await _login_(page, loginInfo);
// }

// export async function captureFrontPage(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList) {
//   await _frontPage_(page, rootUrl, course, deviceList);
// }

// export async function createPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

//   await _pageNavNew_( page, rootUrl, course, contentPage );
//   await _createPage_( page, contentPage );

// }

// export async function createPages( page: Puppeteer.Page, rootUrl: string, course: Course, contentPages: Page[] ) {

//   for ( let i = 0; i < contentPages.length; i++ ) {

//     await _pageNavNew_( page, rootUrl, course, contentPages[ i ] );
//     await _createPage_( page, contentPages[ i ] );

//   }

// }

// export async function pageList( page: Puppeteer.Page, rootUrl: string, course: Course ) {

//   await _pagesNav_( page, rootUrl, course );
//   return await _getPages_( page );

// }

// export async function getPage( page: Puppeteer.Page, rootUrl: string, course: Course, contentPage: Page ) {

//   await _pageNav_( page, rootUrl, course, contentPage );
//   return await _getPage_( page );

// }

// export async function getAllPages( page: Puppeteer.Page, rootUrl: string, course: Course ) {

//   const pList = await pageList( page, rootUrl, course );
//   const pages = [];

//   for ( let i = 0; i < pList.length; i++ ) {

//     pages.push( await getPage( page, rootUrl, course, pList[ i ] ) );

//   }

//   return pages;

// }

// export async function moduleList(page: Puppeteer.Page, rootUrl: string, course: Course): Promise<ModuleItems[]> {
//   return await _moduleList_(page, rootUrl, course);
// }

// export async function captureModule(page: Puppeteer.Page, rootUrl: string, module: ModuleItems, deviceList: DeviceList) {
//   await _captureModule_(page, rootUrl, module, deviceList);
// }

// export async function captureAllModules(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList, enumerate: boolean = true) {
//   const modules = await moduleList(page, rootUrl, course);

//   for (let i = 0; i < modules.length; i++) {
//     if (enumerate) {
//       modules[i].title = `${i}_${modules[i].title}`;
//     }
//     await captureModule(page, rootUrl, modules[i], deviceList);
//   }
// }

// export async function captureCourse(page: Puppeteer.Page, rootUrl: string, course: Course, deviceList: DeviceList, enumerate: boolean = true) {
//   deviceList.screenshot.subPrePath = `${course.term}/${course.title}`;
//   await captureFrontPage(page, rootUrl, course, deviceList);
//   await captureAllModules(page, rootUrl, course, deviceList, enumerate);
// }

// export async function captureCourseList(page: Puppeteer.Page, rootUrl: string, courses: Course[], deviceList: DeviceList, enumerate: boolean = true) {
//   for (let i = 0; i < courses.length; i++) {
//     await captureCourse(page, rootUrl, courses[i], deviceList, enumerate);
//   }
// }

// export async function captureAllCourses(page: Puppeteer.Page, rootUrl: string, deviceList: DeviceList, enumerate: boolean = true) {
//   const courses = await courseList(page, rootUrl);
//   await captureCourseList(page, rootUrl, courses, deviceList, enumerate);
// }