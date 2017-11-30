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
const selectors_1 = require("./selectors");
function getCourseList(page, includeTerms) {
    return __awaiter(this, void 0, void 0, function* () {
        const current = yield page.evaluate(getCourse, selectors_1.default.tables.current, selectors_1.default.course);
        const past = yield page.evaluate(getCourse, selectors_1.default.tables.past, selectors_1.default.course);
        const future = yield page.evaluate(getCourse, selectors_1.default.tables.future, selectors_1.default.course);
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
//# sourceMappingURL=list.js.map