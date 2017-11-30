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
const update_1 = require("./update");
const nav_1 = require("./nav");
exports.default = {
    create: _create_,
    delete: _delete_,
    list: _list_,
    update: _update_
};
function _create_(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        yield create_1.default(page, qBank);
    });
}
function _delete_(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        yield delete_1.default(page, qBank);
    });
}
function _list_(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        return yield list_1.default(page);
    });
}
function _update_(page, rootUrl, course, qBank) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        yield update_1.default(page, qBank);
    });
}
//# sourceMappingURL=index.js.map