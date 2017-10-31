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
const Puppeteer = require("puppeteer");
const CanvasPuppet = require("../src");
const loginInfo_1 = require("../private/loginInfo");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield Puppeteer.launch({});
        const page = yield browser.newPage();
        try {
            yield CanvasPuppet.login(page, loginInfo_1.loginInfo);
        }
        catch (e) {
            console.log('Login Failed');
            console.log(e);
        }
        yield page.close();
        yield browser.close();
    });
}
//# sourceMappingURL=login.js.map