import * as Puppeteer from 'puppeteer';

import { Course } from '../../interfaces/course';
import { QuestionBank, Question } from '../../interfaces/questionBank';
import _goto_ from '../../utility/goto';

export async function goto(page: Puppeteer.Page, rootUrl: string, course: Course, qBank?: QuestionBank) {
  if (qBank) {
    await gotoQuestionBank(page, rootUrl, course, qBank);
  } else {
    await gotoQuestionBankMain(page, rootUrl, course);
  }
}

export async function gotoQuestionBank(page: Puppeteer.Page, rootUrl: string, course: Course, qBank: QuestionBank) {
  const url = `${rootUrl}/courses/${course.id}/question_banks/${qBank.id}`;
  console.log(qBank);
  await _goto_(page, url);
}

export async function gotoQuestionBankMain(page: Puppeteer.Page, rootUrl: string, course: Course) {
  const url = `${rootUrl}/courses/${course.id}/question_banks`;

  await _goto_(page, url);
}

export async function getBanks(page: Puppeteer.Page): Promise<QuestionBank[]> {
  const s = {
    banks: '#questions > .question_bank'
  };
  return await page.evaluate(selectors => {
    let bankEls: NodeListOf<Element> = document.querySelectorAll(selectors.banks);
    let banks: QuestionBank[] = [];
    for (let i = 0; i < bankEls.length; i++) {
      banks.push({id: bankEls[i].id.substr(14)});
    }
    return banks;
  }, s);
}

export async function getQuestions(page: Puppeteer.Page)/*: Promise<Question[]>*/ {
  const s = {
    more: '#more_questions',
    questions: '#questions > .question_holder',
    type: '.question span.question_type',
    id: '.question'
  }
  return await page.evaluate(selectors => {
    if (document.querySelector(selectors.more)) {
      return [];
    }
    let questionEls: NodeListOf<Element> = document.querySelectorAll(selectors.questions);
    let questions/*: Question[]*/ = [];
    for (let i = 0; i < questionEls.length; i++) {
      let typeEl: Element = questionEls[i].querySelector(selectors.type);
      questions.push({
        id: questionEls[i].querySelector(selectors.id).id.substr(9),
        type: typeEl.innerHTML
      });
    }
    return questions;
  }, s);
}

export async function createBank(page: Puppeteer.Page, name: string): Promise<QuestionBank> {
  let s = {
    addBtn: '#right-side > .add_bank_link',
    bankId: '#question_bank_adding .header_content > a.title'
  };

  await page.click(s.addBtn);
  await page.keyboard.type(name);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({
    waitUntil: 'networkidle'
  });

  return await page.evaluate(selectors => {
    let id = document.querySelector(selectors.bankId).href.split('/');
    return {
      id: id[id.length-1]
    }
  }, s);
}

export async function createQuestion(page: Puppeteer.Page, question: Question) {
  let s = {
    addBtn: '#right-side .add_question_link',
    type: 'form.question_form > div > div.header > select',
    answers: 'form.question_form div.form_answers > div',
    anotherA: 'form.question_form div.add_answer > a',
    deleteA: 'form.question_form div.form_answers > div:nth-child(INDEX) div.question_actions > a.delete_answer_link',
    answerInput: 'form.question_form div.form_answers > div:nth-child(INDEX) div.select_answer > input.disabled_answer',
    submitBtn: 'form.question_form div.button-container > button.btn.btn-small.submit_button.btn-primary',
    correctA: 'form.question_form div.form_answers > div:nth-child(INDEX) a.select_answer_link',
    feedback: 'form.question_form div.form_answers > div:nth-child(INDEX) a.comment_focus'

  };

  await page.click(s.addBtn);
  // await page.waitForNavigation({
  //   waitUntil: 'networkidle'
  // });
  if (question.title) {
    await page.keyboard.type(question.title);
  }

  await page.evaluate((selector, type) => {
    document.querySelector(selector).value = type;
  }, s.type, question.type);

  // Navigate to the question area in tiny mc.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  await page.keyboard.type(question.text);

  let answerInputs = await page.evaluate(selector => {
    return document.querySelectorAll(selector).length;
  }, s.answers);

  while (answerInputs < question.answers.length) {
    await page.click(s.anotherA);
    answerInputs++;
    console.log('adding answer');
  }

  while (answerInputs > question.answers.length) {
    await page.click(`${s.answers}:nth-child(${answerInputs})`);
    await page.click(s.deleteA.replace('INDEX', answerInputs));
    answerInputs--;
    console.log('removing answer');
  }

  for (let i = 1; i <= question.answers.length; i++) {
    await page.click(s.answerInput.replace('INDEX', ''+i));
    await page.keyboard.type(question.answers[i-1].text);
    if (question.answers[i-1].correct) {
      await page.click(s.correctA.replace('INDEX', ''+i));
    }
    if (question.answers[i-1].feedback) {
      await page.click(s.feedback.replace('INDEX', ''+i));
      await page.keyboard.type(question.answers[i-1].feedback);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
    }
  }

  await page.click(s.submitBtn);
  await page.waitForNavigation({
    waitUntil: 'networkidle'
  });
}
