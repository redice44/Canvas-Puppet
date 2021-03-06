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
function deleteQuestion(page, question) {
    return __awaiter(this, void 0, void 0, function* () {
        page.on('dialog', (dialog) => __awaiter(this, void 0, void 0, function* () { return yield dialog.accept(); }));
        const questionEH = yield page.$(`#question_${question.id}`);
        yield questionEH.hover();
        const deleteEH = yield questionEH.$(selectors_1.deleteQuestion.link);
        yield deleteEH.click();
    });
}
exports.default = deleteQuestion;
//# sourceMappingURL=delete.js.map