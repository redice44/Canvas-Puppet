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
const login_1 = require("./login");
const nav_1 = require("./nav");
exports.default = {
    login: login
};
function login(page, loginInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.login(page, loginInfo);
        yield login_1.default(page, loginInfo);
    });
}
//# sourceMappingURL=index.js.map