"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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