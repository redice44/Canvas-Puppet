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
const create_1 = require("./item/create");
const selectors_1 = require("./selectors");
function createModule(page, contentModule) {
    return __awaiter(this, void 0, void 0, function* () {
        // The button's event listener isn't attached for some unknown amount of time. ¯\_(ツ)_/¯
        // await page.waitForSelector( selectors.addBtn, { visible: true } );
        yield page.waitFor(1000);
        yield page.click(selectors_1.createSelectors.addBtn);
        const modal = yield page.$(selectors_1.createSelectors.form);
        yield page.click(selectors_1.createSelectors.nameInput);
        yield page.keyboard.type(contentModule.title);
        yield (yield modal.$(selectors_1.createSelectors.submitBtn)).click();
        // Another unknown wait time for canvas to update the new dom
        yield page.waitFor(1000);
        const evalId = element => parseInt(element.id.substr(15));
        const moduleList = yield page.$$(selectors_1.createSelectors.list);
        const newModule = moduleList[moduleList.length - 1];
        contentModule.id = yield page.evaluate(evalId, newModule);
        for (let i = 0; i < contentModule.items.length; i++) {
            yield create_1.default(page, contentModule.id, contentModule.items[i]);
        }
        return contentModule;
    });
}
exports.default = createModule;
//# sourceMappingURL=create.js.map