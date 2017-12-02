"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSelectors = {
    courses: '#my_courses_table > tbody > tr',
    link: 'td.course-list-course-title-column > a',
    role: 'td.course-list-enrolled-as-column',
    term: 'td.course-list-term-column',
    title: 'td.course-list-course-title-column span.name'
};
exports.default = {
    tables: {
        current: '#my_courses_table',
        past: '#past_enrollments_table',
        future: '#future_enrollments_table'
    },
    course: {
        row: ' > tbody > tr',
        title: ' > tbody > tr:nth-child(INDEX) > td.course-list-course-title-column.course-list-no-left-border > a > span',
        link: ' > tbody > tr:nth-child(INDEX) > td.course-list-course-title-column.course-list-no-left-border > a',
        term: ' > tbody > tr:nth-child(INDEX) > td.course-list-no-left-border.course-list-term-column'
    }
};
//# sourceMappingURL=selectors.js.map