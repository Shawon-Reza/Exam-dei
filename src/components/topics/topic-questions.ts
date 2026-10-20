import {
  exams,
  type ExamQuestion,
  type ExamSubject,
  type ExamTopic,
} from "../exams/exam-data";

export type TopicQuestionSet = {
  questions: ExamQuestion[];
  isTopicSpecific: boolean;
};

export function getTopicQuestions(
  subject: ExamSubject,
  topic: ExamTopic,
): TopicQuestionSet {
  const topicQuestions = exams
    .filter(
      (exam) =>
        exam.subjectId === subject.id &&
        exam.topicId === topic.id,
    )
    .flatMap((exam) => exam.questions);

  if (topicQuestions.length > 0) {
    return {
      questions: deduplicateQuestions(topicQuestions),
      isTopicSpecific: true,
    };
  }

  const subjectQuestions = exams
    .filter((exam) => exam.subjectId === subject.id && !exam.topicId)
    .flatMap((exam) => exam.questions);

  return {
    questions: deduplicateQuestions(subjectQuestions),
    isTopicSpecific: false,
  };
}

function deduplicateQuestions(questions: ExamQuestion[]) {
  const uniqueQuestions = new Map<string, ExamQuestion>();

  for (const question of questions) {
    const key = `${question.prompt}|${question.options.join("|")}`;
    if (!uniqueQuestions.has(key)) uniqueQuestions.set(key, question);
  }

  return [...uniqueQuestions.values()];
}
