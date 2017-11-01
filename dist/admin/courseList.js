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
const courseList_1 = require("../config/selectors/courseList");
const goto_1 = require("../utility/goto");
function getCourseList(page, rootUrl, includeTerms) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseUrl = `${rootUrl}/courses`;
        yield goto_1.default(page, courseUrl);
        const current = yield page.evaluate(getCourse, courseList_1.selectors.tables.current, courseList_1.selectors.course);
        const past = yield page.evaluate(getCourse, courseList_1.selectors.tables.past, courseList_1.selectors.course);
        const future = yield page.evaluate(getCourse, courseList_1.selectors.tables.future, courseList_1.selectors.course);
        let courses = current.concat(past, future);
        if (includeTerms) {
            courses = courses.filter(course => includeTerms.includes(course.term));
        }
        return courses;
    });
}
exports.default = getCourseList;
function getCourse(table, selector) {
    let numCourses = document.querySelectorAll(`${table}${selector.row}`).length;
    let courses = [];
    for (let i = 1; i <= numCourses; i++) {
        const titleSelector = selector.title.replace('INDEX', i);
        const linkSelector = selector.link.replace('INDEX', i);
        const termSelector = selector.term.replace('INDEX', i);
        const titleEl = document.querySelector(`${table}${titleSelector}`);
        const linkEl = document.querySelector(`${table}${linkSelector}`);
        const termEl = document.querySelector(`${table}${termSelector}`);
        if (titleEl) {
            const id = linkEl.getAttribute('href').split('/');
            courses.push({
                title: titleEl.innerHTML.trim(),
                id: id[id.length - 1],
                term: termEl.innerHTML.trim()
            });
        }
    }
    return courses;
}
;
//# sourceMappingURL=courseList.js.map