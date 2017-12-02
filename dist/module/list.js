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
const parseModule_1 = require("./parseModule");
const selectors_1 = require("./selectors");
function getModuleList(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const modulesElement = yield page.$$(selectors_1.listSelectors.list);
        const modules = [];
        for (let i = 0; i < modulesElement.length; i++) {
            modules.push(yield parseModule_1.default(page, modulesElement[i]));
        }
        return modules;
    });
}
exports.default = getModuleList;
//# sourceMappingURL=list.js.map