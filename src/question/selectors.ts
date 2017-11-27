export default {

  list: '#questions > div',
  questionDetails: '#show_question_details',
  question: {

    root: '.question',
    isLink: '.question > .header > a',
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

}
