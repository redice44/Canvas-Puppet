export interface QuestionBank {
  id: string
}

interface Answers {
  text: string,
  correct: boolean,
  feedback?: string
}

export interface Question {
  id?: string,
  type: string,
  title?: string,
  text: string,
  answers: Answers[]
}