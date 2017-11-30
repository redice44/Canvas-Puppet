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
function updateQuestion(page, question) {
    return __awaiter(this, void 0, void 0, function* () {
        const questionRootEH = (yield page.evaluateHandle((id) => {
            const questionEl = document.querySelector(id).parentElement;
            return Promise.resolve(questionEl);
        }, `#question_${question.id}`)).asElement();
        const questionEH = yield questionRootEH.$(`#question_${question.id}`);
        yield questionEH.hover();
        const editEH = yield questionEH.$(selectors_1.updateQuestion.link);
        yield editEH.click();
        const questionFormEH = yield questionRootEH.$(selectors_1.updateQuestion.form);
        const clearInputText = inputEH => { inputEH.value = ''; };
        const clearTextArea = textEH => { textEH.innerHTML = ''; textEH.value = ''; };
        const updateValue = (eh, value) => { eh.value = value; };
        if (question.title) {
            const titleEH = yield questionFormEH.$(selectors_1.updateQuestion.questionTitle);
            yield page.evaluate(clearInputText, titleEH);
            yield page.keyboard.type(question.title);
        }
        const questionTypeEH = yield questionFormEH.$(selectors_1.updateQuestion.type);
        yield page.evaluate(updateValue, questionTypeEH, question.type);
        // Navigate to the question area in tiny mc.
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('\r');
        const bodyEH = yield questionFormEH.$(selectors_1.updateQuestion.body);
        yield page.evaluate(clearTextArea, bodyEH);
        yield page.keyboard.type(question.text);
        const answersEH = yield questionFormEH.$$(selectors_1.updateQuestion.answers);
        const addAnswer = yield questionFormEH.$(selectors_1.updateQuestion.anotherA);
        let answerInputs = answersEH.length;
        while (answerInputs < question.answers.length) {
            yield addAnswer.click();
            answerInputs++;
        }
        while (answerInputs > question.answers.length) {
            const lastAnswer = yield questionFormEH.$(`${selectors_1.updateQuestion.answers}:nth-child(${answerInputs})`);
            yield lastAnswer.hover();
            yield (yield lastAnswer.$(selectors_1.updateQuestion.deleteA)).click();
            answerInputs--;
        }
        for (let i = 0; i < question.answers.length; i++) {
            yield answersEH[i].hover();
            yield page.evaluate(clearInputText, answersEH[i]);
            yield answersEH[i].click();
            yield page.keyboard.type(question.answers[i].text);
            if (question.answers[i].correct) {
                yield (yield answersEH[i].$(selectors_1.updateQuestion.correctA)).click();
            }
            if (question.answers[i].feedback) {
                yield (yield answersEH[i].$(selectors_1.updateQuestion.feedback)).click();
                yield (yield answersEH[i].$(selectors_1.updateQuestion.htmlView)).click();
                const feedbackBody = yield answersEH[i].$(selectors_1.updateQuestion.feedbackBody);
                yield page.evaluate(clearTextArea, feedbackBody);
                yield page.keyboard.type(question.answers[i].feedback);
                yield page.keyboard.press('Tab');
                yield page.keyboard.press('Enter');
            }
        }
        yield (yield questionFormEH.$(selectors_1.updateQuestion.submitBtn)).click();
        yield page.waitFor(100);
    });
}
exports.default = updateQuestion;
//# sourceMappingURL=update.js.map