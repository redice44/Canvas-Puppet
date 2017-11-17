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
const emulateElement_1 = require("../utility/emulateElement");
const ss_1 = require("../utility/ss");
function capturePage(page, pageUrl, selector, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        yield goto_1.default(page, pageUrl);
        for (const device of deviceList.devices) {
            const content = yield emulateElement_1.default(page, device.device, selector);
            yield ss_1.default(content, deviceList.screenshot, device.name);
        }
    });
}
exports.default = capturePage;
//# sourceMappingURL=page.js.map