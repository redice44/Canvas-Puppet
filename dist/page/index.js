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
const create_1 = require("./create");
const capture_1 = require("./capture");
const get_1 = require("./get");
const del_1 = require("./del");
const update_1 = require("./update");
exports.default = {
    capture: _capture_,
    create: _create_,
    delete: _delete_,
    get: _get_,
    list: _list_,
    update: _update_
};
function _list_(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.list(page, rootUrl, course);
        return yield list_1.default(page);
    });
}
function _get_(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.page(page, rootUrl, course, contentPage);
        return yield get_1.default(page);
    });
}
function _capture_(page, rootUrl, course, contentPage, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        deviceList.screenshot.sectionPath = 'path';
        deviceList.screenshot.uniquePath = `${contentPage.title}/date`;
        yield nav_1.default.page(page, rootUrl, course, contentPage);
        yield capture_1.default(page, deviceList);
    });
}
function _create_(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.create(page, rootUrl, course, contentPage);
        yield create_1.default(page, contentPage);
        return yield get_1.default(page);
    });
}
function _delete_(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.page(page, rootUrl, course, contentPage);
        yield del_1.default(page);
    });
}
function _update_(page, rootUrl, course, contentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.default.edit(page, rootUrl, course, contentPage);
        yield update_1.default(page, contentPage);
        return yield get_1.default(page);
    });
}
//# sourceMappingURL=index.js.map