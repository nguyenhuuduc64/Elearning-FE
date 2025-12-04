export type CourseType = {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
}

export type TestType = {
  id: number;
  title: string;
  create_at: string,
  course_id: number;
}

export type Itest = {
    id: number,
    title: string,
    create_at: string,
    course_id: number
}

export type IQuesttion = {
  id: string,
  test_id: string,
  content: string,
  answers: IAnswer[]
}

export type IAnswer = {
  id: string,
  question_id: string,
  content: string,
  is_correct: boolean
}