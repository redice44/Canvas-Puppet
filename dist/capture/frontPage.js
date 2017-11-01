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
const frontPage_1 = require("../config/selectors/frontPage");
const page_1 = require("./page");
function captureFrontPage(page, rootUrl, course, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseUrl = `${rootUrl}/courses/${course.id}`;
        deviceList.screenshot.subPostPath = 'Front Page';
        yield page_1.default(page, courseUrl, frontPage_1.default.content, deviceList);
    });
}
exports.default = captureFrontPage;
//# sourceMappingURL=frontPage.js.map