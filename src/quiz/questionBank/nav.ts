import * as Puppeteer from 'puppeteer';

import { Course } from '../../interfaces/course';
import goto from '../../utility/goto';

export default async function navToQuestionBanks(page: Puppeteer.Page, rootUrl: string, course: Course) {
  const url = `${rootUrl}/courses/${course.id}/question_banks`;

  await goto(page, url);
}
