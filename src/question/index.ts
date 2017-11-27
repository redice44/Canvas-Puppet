import * as Puppeteer from 'puppeteer';

import getQuestions from './list';
import navigation from './nav';

import { Course } from '../course/interfaces';
import { QuestionBank } from '../questionBank/interfaces';
import { Question } from './interfaces';


export default {

  list: _list_

};

async function _list_( page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank ): Promise < Question[] > {

  await navigation.list( page, rootUrl, course, qBank );
  return await getQuestions( page );

}
