"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const goto_1 = require("../../utility/goto");
function goto(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        if (qBank) {
            yield gotoQuestionBank(page, rootUrl, course, qBank);
        }
        else {
            yield gotoQuestionBankMain(page, rootUrl, course);
        }
    });
}
exports.goto = goto;
function gotoQuestionBank(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${rootUrl}/courses/${course.id}/question_banks/${qBank.id}`;
        console.log(qBank);
        yield goto_1.default(page, url);
    });
}
exports.gotoQuestionBank = gotoQuestionBank;
function gotoQuestionBankMain(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${rootUrl}/courses/${course.id}/question_banks`;
        yield goto_1.default(page, url);
    });
}
exports.gotoQuestionBankMain = gotoQuestionBankMain;
function getBanks(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = {
            banks: '#questions > .question_bank'
        };
        return yield page.evaluate(selectors => {
            let bankEls = document.querySelectorAll(selectors.banks);
            let banks = [];
            for (let i = 0; i < bankEls.length; i++) {
                banks.push({ id: bankEls[i].id.substr(14) });
            }
            return banks;
        }, s);
    });
}
exports.getBanks = getBanks;
function getQuestions(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = {
            more: '#more_questions',
            questions: '#questions > .question_holder',
            type: '.question span.question_type',
            id: '.question'
        };
        return yield page.evaluate(selectors => {
            if (document.querySelector(selectors.more)) {
                return [];
            }
            let questionEls = document.querySelectorAll(selectors.questions);
            let questions /*: Question[]*/ = [];
            for (let i = 0; i < questionEls.length; i++) {
                let typeEl = questionEls[i].querySelector(selectors.type);
                questions.push({
                    id: questionEls[i].querySelector(selectors.id).id.substr(9),
                    type: typeEl.innerHTML
                });
            }
            return questions;
        }, s);
    });
}
exports.getQuestions = getQuestions;
function createBank(page, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let s = {
            addBtn: '#right-side > .add_bank_link',
            bankId: '#question_bank_adding .header_content > a.title'
        };
        yield page.click(s.addBtn);
        yield page.keyboard.type(name);
        yield page.keyboard.press('Enter');
        yield page.waitForNavigation({
            waitUntil: 'networkidle'
        });
        return yield page.evaluate(selectors => {
            let id = document.querySelector(selectors.bankId).href.split('/');
            return {
                id: id[id.length - 1]
            };
        }, s);
    });
}
exports.createBank = createBank;
function createQuestion(page, question) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield page.click(s.addBtn);
        // await page.waitForNavigation({
        //   waitUntil: 'networkidle'
        // });
        if (question.title) {
            yield page.keyboard.type(question.title);
        }
        yield page.evaluate((selector, type) => {
            document.querySelector(selector).value = type;
        }, s.type, question.type);
        // Navigate to the question area in tiny mc.
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.type(question.text);
        let answerInputs = yield page.evaluate(selector => {
            return document.querySelectorAll(selector).length;
        }, s.answers);
        while (answerInputs < question.answers.length) {
            yield page.click(s.anotherA);
            answerInputs++;
            console.log('adding answer');
        }
        while (answerInputs > question.answers.length) {
            yield page.click(`${s.answers}:nth-child(${answerInputs})`);
            yield page.click(s.deleteA.replace('INDEX', answerInputs));
            answerInputs--;
            console.log('removing answer');
        }
        for (let i = 1; i <= question.answers.length; i++) {
            yield page.click(s.answerInput.replace('INDEX', '' + i));
            yield page.keyboard.type(question.answers[i - 1].text);
            if (question.answers[i - 1].correct) {
                yield page.click(s.correctA.replace('INDEX', '' + i));
            }
            if (question.answers[i - 1].feedback) {
                yield page.click(s.feedback.replace('INDEX', '' + i));
                yield page.keyboard.type(question.answers[i - 1].feedback);
                yield page.keyboard.press('Tab');
                yield page.keyboard.press('Enter');
            }
        }
        yield page.click(s.submitBtn);
        yield page.waitForNavigation({
            waitUntil: 'networkidle'
        });
    });
}
exports.createQuestion = createQuestion;
//# sourceMappingURL=index.js.map