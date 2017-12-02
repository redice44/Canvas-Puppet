"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    list: '#questions > div',
    questionDetails: '#show_question_details',
    question: {
        root: '.question',
        isLink: '.header > a',
        isLinkParent: '#questions > div:nth-child(INDEX)',
        text: '.question > .text > .question_text',
        title: '.question > .header > .name',
        answers: '.question > .text > .answers .answer',
        answerText: '.answer_text',
        correct: 'correct_answer'
    },
    questionTypes: [
        'multiple_choice_question',
        'true_false_question',
        'short_answer_question',
        'fill_in_multiple_blanks_question',
        'multiple_answers_question',
        'multiple_dropdowns_question',
        'matching_question',
        'numerical_question',
        'calculated_question',
        'essay_question',
        'file_upload_question',
        'text_only_question'
    ]
};
exports.deleteQuestion = {
    link: '.links > a.delete_question_link'
};
exports.updateQuestion = {
    body: 'textarea.question_content',
    link: '.links a.edit_question_link',
    form: 'form.question_form',
    questionTitle: '.header > input[name="question_name"]',
    type: 'div > div.header > select',
    answers: 'div.form_answers > div',
    anotherA: 'div.add_answer > a',
    deleteA: 'div.question_actions > a.delete_answer_link',
    correctA: 'a.select_answer_link',
    feedback: 'a.comment_focus',
    feedbackBody: 'answer_comments textarea.editor-toggle',
    htmlView: '.switch-views a.switch-views__link__html',
    submitBtn: 'div.button-container > button.btn.btn-small.submit_button.btn-primary'
};
exports.createQuestion = {
    addBtn: '#right-side .add_question_link',
    type: 'form.question_form > div > div.header > select',
    answers: 'form.question_form div.form_answers > div',
    anotherA: 'form.question_form div.add_answer > a',
    deleteA: 'form.question_form div.form_answers > div:nth-child(INDEX) div.question_actions > a.delete_answer_link',
    answerInput: 'form.question_form div.form_answers > div:nth-child(INDEX) div.select_answer > input.disabled_answer',
    submitBtn: 'form.question_form div.button-container > button.btn.btn-small.submit_button.btn-primary',
    correctA: 'form.question_form div.form_answers > div:nth-child(INDEX) a.select_answer_link',
    feedback: 'form.question_form div.form_answers > div:nth-child(INDEX) a.comment_focus'
};
//# sourceMappingURL=selectors.js.map