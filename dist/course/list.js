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
function getCourseList(page, excludeRoles, includeTerms) {
    return __awaiter(this, void 0, void 0, function* () {
        const evalInnerHTML = element => element ? element.innerHTML.trim() : null;
        const evalHref = element => element ? element.getAttribute('href') : null;
        const coursesElement = yield page.$$(selectors_1.listSelectors.courses);
        let courses = [];
        for (let i = 0; i < coursesElement.length; i++) {
            const linkElement = yield coursesElement[i].$(selectors_1.listSelectors.link);
            let id = yield page.evaluate(evalHref, linkElement);
            if (id) {
                const titleElement = yield coursesElement[i].$(selectors_1.listSelectors.title);
                const roleElement = yield coursesElement[i].$(selectors_1.listSelectors.role);
                const termElement = yield coursesElement[i].$(selectors_1.listSelectors.term);
                id = id.split('/');
                id = id[id.length - 1];
                courses.push({
                    id: id,
                    role: yield page.evaluate(evalInnerHTML, roleElement),
                    title: yield page.evaluate(evalInnerHTML, titleElement),
                    term: yield page.evaluate(evalInnerHTML, termElement)
                });
            }
        }
        if (excludeRoles) {
            courses = courses.filter(course => !excludeRoles.includes(course.role));
        }
        if (includeTerms) {
            courses = courses.filter(course => includeTerms.includes(course.term));
        }
        return courses;
    });
}
exports.default = getCourseList;
//# sourceMappingURL=list.js.map