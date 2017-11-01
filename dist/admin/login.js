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
const DOM_1 = require("../errors/DOM");
const navigation_1 = require("../errors/navigation");
function login(page, loginInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Logging In');
        yield goto_1.default(page, loginInfo.url);
        try {
            yield page.click(loginInfo.selectors.username);
            yield page.keyboard.type(loginInfo.credentials.username);
            yield page.click(loginInfo.selectors.password);
            yield page.keyboard.type(loginInfo.credentials.password);
            yield page.click(loginInfo.selectors.loginButton);
            yield page.waitForNavigation();
        }
        catch (e) {
            if (e.code && e.code === 'ERR_ASSERTION') {
                console.log(`    DOMError: ${e.message}`);
                throw new DOM_1.DOMError(e.message, DOM_1.DOMErrorCodes.SELECTOR_NOT_FOUND, e.message.substr(28));
            }
            else if (e.message.includes('Evaluation failed: DOMException') && e.message.includes('The provided selector is empty.')) {
                console.log(`    DOMError: Empty Selector`);
                throw new DOM_1.DOMError(e.message.split('\n')[0], DOM_1.DOMErrorCodes.EMPTY_SELECTOR);
            }
            else if (e.message.includes('Navigation Timeout Exceeded')) {
                console.log(`    Navigation Error: Timed out`);
                throw new navigation_1.NavigationError(e.message, navigation_1.NavigationErrorCodes.TIMEOUT, page.url());
            }
            throw e;
        }
        if (page.url() !== loginInfo.expectedLanding) {
            console.log(`    Navigation Error: Unexpected Landing Page`);
            throw new navigation_1.NavigationError(`Unexpected Landing Page`, navigation_1.NavigationErrorCodes.UNEXPECTED_DESTINATION, page.url());
        }
        console.log('Logged In\n');
    });
}
exports.default = login;
//# sourceMappingURL=login.js.map