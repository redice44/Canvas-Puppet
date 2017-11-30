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
function getPages(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractPages = (pages, selector) => {
            let formatedPages = [];
            for (let i = 0; i < pages.length; i++) {
                let title = pages[i].querySelector(selector).innerHTML.trim();
                let id = pages[i].querySelector(selector).id.split('_');
                formatedPages.push({
                    title: title,
                    id: parseInt(id[id.length - 1])
                });
            }
            return formatedPages;
        };
        // @ts-ignore
        return yield page.$$eval(selectors_1.allPages.pageList, extractPages, selectors_1.allPages.pageLink);
    });
}
exports.default = getPages;
//# sourceMappingURL=list.js.map