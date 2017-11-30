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
function getBanks(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractQuestionBanks = (banks, selector) => {
            const questionBanks = [];
            for (let i = 0; i < banks.length; i++) {
                questionBanks.push({
                    id: banks[i].id.substr(14),
                    title: banks[i].querySelector(selector).innerText
                });
            }
            return questionBanks;
        };
        return yield page.$$eval(selectors_1.listSelectors.list, extractQuestionBanks, selectors_1.listSelectors.title);
    });
}
exports.default = getBanks;
//# sourceMappingURL=list.js.map