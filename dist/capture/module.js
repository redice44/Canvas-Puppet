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
const page_1 = require("./page");
function captureModule(page, rootUrl, moduleItems, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < moduleItems.items.length; i++) {
            deviceList.screenshot.subPostPath = `Modules/${moduleItems.title}/${i + 1}_${moduleItems.items[i].title}`;
            switch (moduleItems.items[i].type) {
                case 'page':
                    yield page_1.default(page, `${rootUrl}${moduleItems.items[i].link}`, '#wiki_page_show > div.show-content.user_content', deviceList);
                    break;
                case 'link':
                    break;
                case 'file':
                    break;
                case 'discussion':
                    break;
                case 'assignment':
                    break;
                case 'quiz':
                    break;
                case 'header':
                    break;
                case 'tool':
                    break;
                default:
            }
        }
    });
}
exports.default = captureModule;
//# sourceMappingURL=module.js.map