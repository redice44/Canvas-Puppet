import * as Puppeteer from 'puppeteer';

import createQuestion from './create';
import deleteQuestion from './delete';
import getQuestions from './list';
import navigation from './nav';
import updateQuestion from './update';

import { Course } from '../course/interfaces';
import { QuestionBank } from '../questionBank/interfaces';
import { Question } from './interfaces';


export default {

  create: _create_,
  delete: _delete_,
  list: _list_,
  update: _update_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank ): Promise < Question[] > {

  await navigation.list( page, rootUrl, course, qBank );
  return await getQuestions( page );

}

async function _create_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank, question: Question ) {

  await navigation.list( page, rootUrl, course, qBank );
  await createQuestion( page, question );

}

async function _delete_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank, question: Question ) {

  await navigation.list( page, rootUrl, course, qBank );
  await deleteQuestion( page, question );

}

async function _update_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank, question: Question ) {

  await navigation.list( page, rootUrl, course, qBank );
  await updateQuestion( page, question );

}
