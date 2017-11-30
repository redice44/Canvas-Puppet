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
function create(page, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const isNewPage = yield page.evaluate(() => !!window.ENV.WIKI_PAGE.created_at);
        if (isNewPage) {
            throw new Error('Page already exists');
        }
        yield page.click('input#title');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Tab');
        yield page.keyboard.press('Enter');
        yield page.keyboard.type(contentPage.content);
        yield page.click('#content > form > div.form-actions.clearfix > div > button.btn.btn-primary.submit');
        yield page.waitForNavigation();
    });
}
exports.default = create;
//# sourceMappingURL=create.js.map