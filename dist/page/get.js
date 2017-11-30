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
function get(page) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield page.evaluate(() => {
            // @ts-ignore
            const env = window.ENV;
            return {
                id: parseInt(env.WIKI_PAGE.page_id),
                title: env.WIKI_PAGE.title,
                content: env.WIKI_PAGE.body
            };
        });
    });
}
exports.default = get;
//# sourceMappingURL=get.js.map