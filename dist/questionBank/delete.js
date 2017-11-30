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
function deleteBanks(page, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        page.once('dialog', (dialog) => __awaiter(this, void 0, void 0, function* () { return yield dialog.accept(); }));
        const bank = yield page.$(`#question_bank_${qBank.id}`);
        yield (yield bank.$(selectors_1.deleteSelectors.delBtn)).click();
    });
}
exports.default = deleteBanks;
//# sourceMappingURL=delete.js.map