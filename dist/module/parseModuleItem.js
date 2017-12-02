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
function parseModuleItem(page, modItemElement) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = element => element.classList.contains('context_module_sub_header');
        const evalId = element => parseInt(element.getAttribute('data-content-id'));
        const evalModId = element => parseInt(element.getAttribute('data-module-item-id'));
        const evalTitle = (element) => element.getAttribute('data-module-item-name');
        const evalType = (element) => element.getAttribute('data-module-type');
        if (yield page.evaluate(isValid, modItemElement)) {
            return null;
        }
        const adminElement = yield modItemElement.$(selectors_1.moduleItemSelectors.admin);
        return {
            itemId: yield page.evaluate(evalId, adminElement),
            moduleId: yield page.evaluate(evalModId, adminElement),
            title: yield page.evaluate(evalTitle, adminElement),
            type: yield page.evaluate(evalType, adminElement)
        };
    });
}
exports.default = parseModuleItem;
//# sourceMappingURL=parseModuleItem.js.map