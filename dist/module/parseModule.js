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
const parseModuleItem_1 = require("./parseModuleItem");
const selectors_1 = require("./selectors");
function parseModule(page, moduleElement) {
    return __awaiter(this, void 0, void 0, function* () {
        const evalId = element => parseInt(element.getAttribute('data-id'));
        const evalTitle = element => element.getAttribute('data-publish-title');
        const adminElement = yield moduleElement.$(selectors_1.moduleSelectors.admin);
        const itemsElement = yield moduleElement.$$(selectors_1.moduleSelectors.moduleItems);
        const items = [];
        for (let i = 0; i < itemsElement.length; i++) {
            const item = yield parseModuleItem_1.default(page, itemsElement[i]);
            if (item) {
                items.push(item);
            }
        }
        return {
            id: yield page.evaluate(evalId, adminElement),
            title: yield page.evaluate(evalTitle, adminElement),
            items: items
        };
    });
}
exports.default = parseModule;
//# sourceMappingURL=parseModule.js.map