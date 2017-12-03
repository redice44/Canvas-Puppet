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
function getQuestions(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractQuestions = (questions, selectors, questionTypes) => {
            const getQuestionType = (questionEl, questionTypes) => {
                for (let i = 0; i < questionTypes.length; i++) {
                    if (questionEl.classList.contains(questionTypes[i])) {
                        return questionTypes[i];
                    }
                }
                return null;
            };
            const formattedQuestions = [];
            for (let i = 0; i < questions.length; i++) {
                const title = questions[i].querySelector(selectors.title).innerHTML.trim();
                const id = questions[i].querySelector(selectors.root).id.split('_')[1];
                const text = questions[i].querySelector(selectors.text).innerHTML.trim();
                const answersEl = questions[i].querySelectorAll(selectors.answers);
                const answers = [];
                const type = getQuestionType(questions[i].querySelector(selectors.root), questionTypes);
                for (let j = 0; j < answersEl.length; j++) {
                    const ansText = answersEl[j].querySelector(selectors.answerText).innerHTML.trim();
                    const correct = answersEl[j].classList.contains(selectors.correct);
                    answers.push({
                        text: ansText,
                        correct: correct
                    });
                }
                formattedQuestions.push({
                    id: id,
                    title: title,
                    text: text,
                    type: type,
                    answers: answers
                });
            }
            return formattedQuestions;
        };
        const showDetails = (checkboxEl) => {
            if (!checkboxEl.checked) {
                checkboxEl.click();
                return false;
            }
            return true;
        };
        const needsExpanding = yield page.$eval(selectors_1.default.questionDetails, showDetails);
        if (needsExpanding) {
            let numQuestions = yield page.$$(`${selectors_1.default.list} ${selectors_1.default.question.isLink}`);
            while (numQuestions.length > 0) {
                for (let i = 0; i < numQuestions.length; i++) {
                    // await page.click( `${ selectors.question.isLinkParent.replace( 'INDEX', ''+i ) } > ${ selectors.question.isLink }`);
                    yield numQuestions[i].click();
                }
                numQuestions = yield page.$$(`${selectors_1.default.list} ${selectors_1.default.question.isLink}`);
            }
        }
        return yield page.$$eval(selectors_1.default.list, extractQuestions, selectors_1.default.question, selectors_1.default.questionTypes);
    });
}
exports.default = getQuestions;
//# sourceMappingURL=list.js.map