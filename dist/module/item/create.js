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
const parseModuleItem_1 = require("../parseModuleItem");
const selectors_1 = require("../selectors");
function createModuleItem(page, moduleId, contentItem) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitFor(1000);
        const moduleElement = yield page.$(`#context_module_${moduleId}`);
        yield (yield moduleElement.$(selectors_1.moduleSelectors.addModuleItemBtn)).click();
        yield page.waitFor(1000);
        let modalElement = yield (yield page.$(selectors_1.moduleItemSelectors.modalContent)).asElement();
        modalElement = yield (yield page.evaluateHandle(element => element.parentElement, modalElement)).asElement();
        yield page.select(selectors_1.moduleItemSelectors.modalSelect, contentItem.type);
        switch (contentItem.type) {
            case 'assignment':
            case 'quiz':
            case 'attachment':
            case 'discussion_topic':
            case 'context_module_sub_header':
            case 'external_url':
            case 'context_external_tool':
                break;
            case 'wiki_page':
                yield page.select(selectors_1.moduleItemSelectors.pageSelect, '' + contentItem.itemId);
                break;
        }
        const itemCount = (yield moduleElement.$$(selectors_1.moduleSelectors.moduleItems)).length;
        yield (yield modalElement.$(selectors_1.moduleItemSelectors.addBtn)).click();
        yield page.waitForFunction((selector, count) => {
            return count < document.querySelectorAll(selector).length;
        }, { polling: 'mutation' }, `#context_module_${moduleId} ${selectors_1.moduleSelectors.moduleItems}`, itemCount);
        const itemElements = yield moduleElement.$$(selectors_1.moduleSelectors.moduleItems);
        return yield parseModuleItem_1.default(page, itemElements[itemElements.length - 1]);
    });
}
exports.default = createModuleItem;
//# sourceMappingURL=create.js.map