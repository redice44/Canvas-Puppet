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
const selectors_1 = require("./selectors");
function createQuestion(page, question) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.click(selectors_1.createQuestion.addBtn);
        if (question.title) {
            yield page.keyboard.type(question.title);
        }
        const updateValue = (eh, value) => { eh.value = value; };
        yield page.$eval(selectors_1.createQuestion.type, updateValue, question.type);
        // Navigate to the question area in tiny mc.
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('\r');
        yield page.keyboard.type(question.text);
        let answerInputs = yield page.$$eval(selectors_1.createQuestion.answers, eh => eh.length);
        while (answerInputs < question.answers.length) {
            yield page.click(selectors_1.createQuestion.anotherA);
            answerInputs++;
        }
        while (answerInputs > question.answers.length) {
            yield page.click(`${selectors_1.createQuestion.answers}:nth-child(${answerInputs})`);
            yield page.click(selectors_1.createQuestion.deleteA.replace('INDEX', answerInputs));
            answerInputs--;
        }
        for (let i = 1; i <= question.answers.length; i++) {
            yield page.click(selectors_1.createQuestion.answerInput.replace('INDEX', '' + i));
            yield page.keyboard.type(question.answers[i - 1].text);
            if (question.answers[i - 1].correct) {
                yield page.click(selectors_1.createQuestion.correctA.replace('INDEX', '' + i));
            }
            if (question.answers[i - 1].feedback) {
                yield page.click(selectors_1.createQuestion.feedback.replace('INDEX', '' + i));
                yield page.keyboard.type(question.answers[i - 1].feedback);
                yield page.keyboard.press('Tab');
                yield page.keyboard.press('Enter');
            }
        }
        yield page.click(selectors_1.createQuestion.submitBtn);
        yield page.waitFor(100);
    });
}
exports.default = createQuestion;
//# sourceMappingURL=create.js.map