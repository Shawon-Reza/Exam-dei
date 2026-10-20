import Link from "next/link";
import { FiArrowLeft, FiBookOpen, FiHelpCircle } from "react-icons/fi";
import type { ExamSubject, ExamTopic } from "../exams/exam-data";
import McqQuestionCard from "./McqQuestionCard";
import type { TopicQuestionSet } from "./topic-questions";

type TopicMcqPracticeProps = {
  subject: ExamSubject;
  topic: ExamTopic;
  questionSet: TopicQuestionSet;
};

export default function TopicMcqPractice({
  subject,
  topic,
  questionSet,
}: TopicMcqPracticeProps) {
  const { questions, isTopicSpecific } = questionSet;

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1600px] px-4  sm:px-6 mb-10 mt-2 lg:px-8">
        <Link
          href={`/topics/${encodeURIComponent(topic.id)}?subject=${encodeURIComponent(subject.id)}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-300"
        >
          <FiArrowLeft aria-hidden="true" />
          {topic.label} নোটে ফিরে যান
        </Link>

       

        {questions.length > 0 ? (
          <section
            aria-label={`${topic.label} MCQ প্রশ্ন`}
            className="mx-auto grid min-h-72 max-w-7xl grid-cols-1 items-stretch gap-4 overflow-y-auto pr-1  sm:grid-cols-2  xl:grid-cols-3"
          >
            {questions.map((question, index) => (
              <McqQuestionCard
                key={`${question.prompt}-${index}`}
                question={question}
                questionNumber={index + 1}
              />
            ))}
          </section>
        ) : (
          <section className="mt-5 rounded-2xl border border-dashed border-zinc-300 bg-white px-5 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              এখনো কোনো প্রশ্ন যোগ করা হয়নি
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Admin এই topic-এর প্রশ্ন যোগ করলে এখানে দেখা যাবে।
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
