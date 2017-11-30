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
const create_1 = require("./create");
const delete_1 = require("./delete");
const list_1 = require("./list");
const nav_1 = require("./nav");
const update_1 = require("./update");
exports.default = {
    create: _create_,
    delete: _delete_,
    list: _list_,
    update: _update_
};
function _list_(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course, qBank);
        return yield list_1.default(page);
    });
}
function _create_(page, rootUrl, course, qBank, question) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course, qBank);
        yield create_1.default(page, question);
    });
}
function _delete_(page, rootUrl, course, qBank, question) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course, qBank);
        yield delete_1.default(page, question);
    });
}
function _update_(page, rootUrl, course, qBank, question) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course, qBank);
        yield update_1.default(page, question);
    });
}
//# sourceMappingURL=index.js.map