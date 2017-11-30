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
const goto_1 = require("../utility/goto");
exports.default = {
    list: navToModuleList,
    moduleItem: navToModuleItem
};
function navToModuleList(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/modules`);
    });
}
function navToModuleItem(page, rootUrl, course, moduleItem) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, `${rootUrl}/courses/${course.id}/modules/items/${moduleItem.id}`);
    });
}
//# sourceMappingURL=nav.js.map