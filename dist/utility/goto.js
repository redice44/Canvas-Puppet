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
function goto(page, url, opts = {}, retry = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.RUN_SILENT) {
            console.log(`  Navigating to: ${url}`);
        }
        try {
            yield page.goto(url, opts);
        }
        catch (e) {
            if (e.message === `Failed to navigate: ${url}`) {
                if (!process.env.RUN_SILENT) {
                    console.log(`    Failed to navigate: ${url}`);
                }
                if (retry > 0) {
                    if (!process.env.RUN_SILENT) {
                        console.log(`    Retrying...\n`);
                    }
                    yield goto(page, url, opts, retry - 1);
                }
                else {
                    if (!process.env.RUN_SILENT) {
                        console.log();
                    }
                    let error = new Error(e.message);
                    error.code = navigation_1.NavigationErrorCodes.FAILED;
                    error.url = url;
                    throw error;
                }
            }
            else if (e.message.includes('Navigation Timeout Exceeded')) {
                if (!process.env.RUN_SILENT) {
                    console.log(`    Timed out navigating to: ${url}`);
                }
                if (retry > 0) {
                    if (!process.env.RUN_SILENT) {
                        console.log(`    Retrying...\n`);
                    }
                    yield goto(page, url, opts, retry - 1);
                }
                else {
                    if (!process.env.RUN_SILENT) {
                        console.log();
                    }
                    let error = new Error(e.messsage);
                    error.code = navigation_1.NavigationErrorCodes.TIMEOUT;
                    error.url = url;
                    throw error;
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