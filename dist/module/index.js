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
const capture_1 = require("./capture");
const list_1 = require("./list");
const nav_1 = require("./nav");
exports.default = {
    capture: _capture_,
    list: _list_
};
function _list_(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        return yield list_1.default(page);
    });
}
function _capture_(page, rootUrl, course, contentModule, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        deviceList.screenshot.sectionPath = `module/${contentModule.title}`;
        const digits = Math.floor(contentModule.items.length / 10);
        for (let i = 0; i < contentModule.items.length; i++) {
            deviceList.screenshot.uniquePath = `${'0'.repeat(digits - Math.floor((i + 1) / 10))}${i + 1}_${contentModule.items[i].title}/date`;
            yield nav_1.default.moduleItem(page, rootUrl, course, contentModule.items[i]);
            yield capture_1.default(page, deviceList);
        }
    });
}
//# sourceMappingURL=index.js.map