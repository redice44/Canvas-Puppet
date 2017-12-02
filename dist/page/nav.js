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
const goto_1 = require("../utility/goto");
exports.default = {
    edit: navToEditPage,
    list: navToPageList,
    page: navToPage,
    create: navToNewPage
};
function navToPageList(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/pages`);
        while (yield loadMore(page)) {
            if (!process.env.RUN_SILENT) {
                console.log(`    Loading more pages`);
            }
            const count = yield page.$$eval(selectors_1.allPages.pageList, p => p.length);
            yield page.click('#content > div > div.index-content-container > div.index-content > div.loading.loading-more');
            yield page.waitForFunction((c, s) => c < document.querySelectorAll(s).length, { polling: 'mutation', }, count, selectors_1.allPages.pageList);
        }
    });
}
function navToPage(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!contentPage.id) {
            throw new Error('Page missing ID');
        }
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/pages/${contentPage.id}`);
    });
}
function navToNewPage(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/pages/${contentPage.title.split(' ').join('-')}/edit`);
    });
}
function navToEditPage(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!contentPage.id) {
            throw new Error('Page missing ID');
        }
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/pages/${contentPage.id}/edit`);
    });
}
function loadMore(page) {
    return __awaiter(this, void 0, void 0, function* () {
        return !!(yield page.$('#content > div > div.index-content-container > div.index-content > div.loading.loading-more'));
    });
}
//# sourceMappingURL=nav.js.map