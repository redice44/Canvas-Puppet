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
const login_1 = require("./admin/login");
const courseList_1 = require("./admin/courseList");
const moduleList_1 = require("./admin/moduleList");
const frontPage_1 = require("./capture/frontPage");
const module_1 = require("./capture/module");
const _QuestionBank_ = require("./quiz/questionBank");
exports.QuestionBank = {
    goto: _QuestionBank_.goto,
    gotoQuestionBank: _QuestionBank_.gotoQuestionBank,
    gotoQuestionBankMain: _QuestionBank_.gotoQuestionBankMain,
    getBanks: _QuestionBank_.getBanks,
    getQuestions: _QuestionBank_.getQuestions,
    createBank: _QuestionBank_.createBank,
    createQuestion: _QuestionBank_.createQuestion
};
function login(page, loginInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield login_1.default(page, loginInfo);
    });
}
exports.login = login;
function courseList(page, rootUrl, includeTerms) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield courseList_1.default(page, rootUrl, includeTerms);
    });
}
exports.courseList = courseList;
function captureFrontPage(page, rootUrl, course, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        yield frontPage_1.default(page, rootUrl, course, deviceList);
    });
}
exports.captureFrontPage = captureFrontPage;
function moduleList(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield moduleList_1.default(page, rootUrl, course);
    });
}
exports.moduleList = moduleList;
function captureModule(page, rootUrl, module, deviceList) {
    return __awaiter(this, void 0, void 0, function* () {
        yield module_1.default(page, rootUrl, module, deviceList);
    });
}
exports.captureModule = captureModule;
function captureAllModules(page, rootUrl, course, deviceList, enumerate = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const modules = yield moduleList(page, rootUrl, course);
        for (let i = 0; i < modules.length; i++) {
            if (enumerate) {
                modules[i].title = `${i}_${modules[i].title}`;
            }
            yield captureModule(page, rootUrl, modules[i], deviceList);
        }
    });
}
exports.captureAllModules = captureAllModules;
function captureCourse(page, rootUrl, course, deviceList, enumerate = true) {
    return __awaiter(this, void 0, void 0, function* () {
        deviceList.screenshot.subPrePath = `${course.term}/${course.title}`;
        yield captureFrontPage(page, rootUrl, course, deviceList);
        yield captureAllModules(page, rootUrl, course, deviceList, enumerate);
    });
}
exports.captureCourse = captureCourse;
function captureCourseList(page, rootUrl, courses, deviceList, enumerate = true) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < courses.length; i++) {
            yield captureCourse(page, rootUrl, courses[i], deviceList, enumerate);
        }
    });
}
exports.captureCourseList = captureCourseList;
function captureAllCourses(page, rootUrl, deviceList, enumerate = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield courseList(page, rootUrl);
        yield captureCourseList(page, rootUrl, courses, deviceList, enumerate);
    });
}
exports.captureAllCourses = captureAllCourses;
//# sourceMappingURL=index.js.map