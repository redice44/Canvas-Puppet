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
const goto_1 = require("../utility/goto");
exports.default = {
    list: navToQuestionBank
};
function navToQuestionBank(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/question_banks/${qBank.id}`);
        while (yield hasMore(page)) {
            if (!process.env.RUN_SILENT) {
                console.log(`    Loading more questions`);
            }
            const count = yield page.$$eval('#questions > div', q => q.length);
            yield page.click('#more_questions > a.more_questions_link');
            yield page.waitForFunction(c => c < document.querySelectorAll('#questions > div').length, { polling: 'mutation' }, count);
        }
    });
}
function hasMore(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isHidden = eh => eh.style.display !== 'none';
            return yield page.$eval('#more_questions', isHidden);
        }
        catch (e) {
            return false;
        }
    });
}
//# sourceMappingURL=nav.js.map