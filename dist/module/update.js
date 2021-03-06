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
function updateModule(page, contentModule) {
    return __awaiter(this, void 0, void 0, function* () {
        const clearInputText = inputEH => { inputEH.value = ''; };
        // The button's event listener isn't attached for some unknown amount of time. ¯\_(ツ)_/¯
        yield page.waitFor(1000);
        const moduleElement = yield page.$(`#context_module_${contentModule.id}`);
        yield (yield moduleElement.$(selectors_1.updateSelectors.triggerBtn)).click();
        yield (yield moduleElement.$(selectors_1.updateSelectors.editBtn)).click();
        const modal = yield page.$(selectors_1.updateSelectors.form);
        const titleElement = yield page.$(selectors_1.updateSelectors.titleInput);
        yield page.evaluate(clearInputText, titleElement);
        yield titleElement.click();
        yield page.keyboard.type(contentModule.title);
        yield (yield modal.$(selectors_1.updateSelectors.submitBtn)).click();
    });
}
exports.default = updateModule;
//# sourceMappingURL=update.js.map