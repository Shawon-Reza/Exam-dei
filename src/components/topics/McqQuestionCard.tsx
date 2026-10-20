import { FiCheckCircle, FiHelpCircle } from "react-icons/fi";
import type { ExamQuestion } from "../exams/exam-data";

type McqQuestionCardProps = {
  question: ExamQuestion;
  questionNumber: number;
};

export default function McqQuestionCard({
  question,
  questionNumber,
}: McqQuestionCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
          {String(questionNumber).padStart(2, "0")}
        </span>
        <h2 className="pt-1 text-sm font-bold leading-6 text-zinc-950 dark:text-white">
          {question.prompt}
        </h2>
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2">
        {question.options.map((option, index) => {
          const isAnswer = index === question.answerIndex;

          return (
            <li
              key={`${index}-${option}`}
              className={`flex min-w-0 items-start gap-2 rounded-xl border px-2 py-2.5 text-xs leading-5 sm:gap-2.5 sm:px-3 ${
                isAnswer
                  ? "border-emerald-300 bg-emerald-50 font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "border-zinc-100 bg-zinc-50/70 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300"
              }`}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                  isAnswer
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="min-w-0 flex-1 break-words">{option}</span>
              {isAnswer && (
                <FiCheckCircle
                  aria-label="সঠিক উত্তর"
                  className="mt-0.5 size-4 shrink-0"
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-auto max-h-36 overflow-y-auto overscroll-contain rounded-xl bg-emerald-50/70 p-3 dark:bg-emerald-950/20 sm:max-h-40">
        <p className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
          <FiHelpCircle aria-hidden="true" />
          সঠিক উত্তর
        </p>
        <p className="mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          {question.options[question.answerIndex]}
        </p>
        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          {question.explanation}
        </p>
      </div>
    </article>
  );
}
