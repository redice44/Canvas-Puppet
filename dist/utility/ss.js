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
const mkdirp = require("mkdirp");
function ss(el, ss, deviceName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.RUN_SILENT) {
            console.log(`    Generating Screenshot: ${ss.rootPath}/${ss.subPrePath}/${ss.subPostPath}/${ss.date}/${deviceName}.png`);
        }
        try {
            yield el.screenshot({
                path: `${ss.rootPath}/${ss.subPrePath}/${ss.subPostPath}/${ss.date}/${deviceName}.png`
            });
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                mkdirp.sync(`${ss.rootPath}/${ss.subPrePath}/${ss.subPostPath}/${ss.date}`);
                yield el.screenshot({
                    path: `${ss.rootPath}/${ss.subPrePath}/${ss.subPostPath}/${ss.date}/${deviceName}.png`
                });
            }
            else {
                throw e;
            }
        }
    });
}
exports.default = ss;
//# sourceMappingURL=ss.js.map