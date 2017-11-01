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
const navigation_1 = require("../errors/navigation");
function goto(page, url, retry = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`  Navigating to: ${url}`);
        try {
            yield page.goto(url);
        }
        catch (e) {
            if (e.message === `Failed to navigate: ${url}`) {
                console.log(`    Failed to navigate: ${url}`);
                if (retry > 0) {
                    console.log(`    Retrying...\n`);
                    yield goto(page, url, retry - 1);
                }
                else {
                    console.log();
                    throw new navigation_1.NavigationError(e.message, navigation_1.NavigationErrorCodes.FAILED, url);
                }
            }
            else if (e.message.includes('Navigation Timeout Exceeded')) {
                console.log(`    Timed out navigating to: ${url}`);
                if (retry > 0) {
                    console.log(`    Retrying...\n`);
                    yield goto(page, url, retry - 1);
                }
                else {
                    console.log();
                    throw new navigation_1.NavigationError(e.message, navigation_1.NavigationErrorCodes.TIMEOUT, url);
                }
            }
            else {
                throw e;
            }
        }
    });
}
exports.default = goto;
//# sourceMappingURL=goto.js.map