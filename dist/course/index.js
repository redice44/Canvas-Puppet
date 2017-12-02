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
const list_1 = require("./list");
const nav_1 = require("./nav");
exports.default = {
    list: _list_
};
function _list_(page, rootUrl, excludeRoles, includeTerms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl);
        return yield list_1.default(page, excludeRoles, includeTerms);
    });
}
//# sourceMappingURL=index.js.map