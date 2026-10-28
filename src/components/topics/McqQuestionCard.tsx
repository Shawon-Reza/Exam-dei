"use client";

import { FiCheckCircle, FiXCircle, FiLock } from "react-icons/fi";

type QuestionOption = {
  text: string;
  isCorrect: boolean;
};

type McqQuestion = {
  id: string;
  question: string;
  type: string;
  difficulty: number;
  explanation: string;
  options: QuestionOption[];
};

type SubmittedAnswer = {
  selectedIndex: number | null;
  isCorrect: boolean;
} | null;

type McqQuestionCardProps = {
  question: McqQuestion;
  questionNumber: number;
  onAnswerSelect: (
    questionId: string,
    optionIndex: number,
  ) => void;
  selectedOptionIndex: number | null;
  disabled?: boolean;
  isPracticeMode?: boolean;
  isSubmitted?: boolean;
  submittedAnswer?: SubmittedAnswer;
  isAuthenticated?: boolean;
};

export default function McqQuestionCard({
  question,
  questionNumber,
  onAnswerSelect,
  selectedOptionIndex,
  disabled = false,
  isPracticeMode = false,
  isSubmitted = false,
  submittedAnswer = null,
  isAuthenticated = true,
}: McqQuestionCardProps) {
  const correctOption = question.options.find(
    (option) => option.isCorrect
  );
  const correctOptionIndex = question.options.findIndex(
    (option) => option.isCorrect
  );

  const isReviewMode = (isSubmitted || isPracticeMode) && isAuthenticated;
  const userSelectedIndex = isSubmitted ? submittedAnswer?.selectedIndex : selectedOptionIndex;
  const userIsCorrect = isSubmitted ? submittedAnswer?.isCorrect : false;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      {/* Question header */}
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
          {String(questionNumber).padStart(2, "0")}
        </span>

        <h2 className="pt-1 text-sm font-bold leading-6 text-zinc-950 dark:text-white">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <fieldset className="mt-4 flex-1">
        <legend className="sr-only">
          প্রশ্ন {questionNumber}-এর উত্তর নির্বাচন করুন
        </legend>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const isSelected = userSelectedIndex === index;
            const isCorrectOption = index === correctOptionIndex;
            const showAsCorrect = isReviewMode && isCorrectOption;
            const showAsUserWrong = isReviewMode && isSelected && !isCorrectOption;

            return (
              <label
                key={`${question.id}-${index}`}
                className={`flex min-w-0 items-start gap-2 rounded-xl border px-2 py-2.5 text-xs leading-5 transition sm:gap-2.5 sm:px-3 ${disabled || isReviewMode
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
                  } ${showAsCorrect
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                    : showAsUserWrong
                    ? "border-rose-400 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
                    : isSelected
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                    : "border-zinc-100 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-950/50"
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={isSelected}
                  disabled={disabled || isReviewMode}
                  onChange={() =>
                    onAnswerSelect(question.id, index)
                  }
                  className="sr-only"
                />

                <span
                  aria-hidden="true"
                  className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${showAsCorrect
                      ? "bg-emerald-600 text-white"
                      : showAsUserWrong
                      ? "bg-rose-600 text-white"
                      : isSelected
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="min-w-0 flex-1 break-words">
                  {option.text}
                </span>

                {(showAsCorrect || (isSelected && isReviewMode)) && (
                  <FiCheckCircle
                    aria-hidden="true"
                    className={`mt-0.5 size-4 shrink-0 ${showAsCorrect
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                      }`}
                  />
                )}

                {showAsUserWrong && (
                  <FiXCircle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                  />
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Result review section (shown after submission or in practice mode, only for authenticated users) */}
      {isReviewMode && correctOption && (
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {/* User's answer */}
          {isSubmitted && (
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium">
              <span className={`inline-flex items-center gap-1 ${userIsCorrect
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-rose-700 dark:text-rose-300"
                }`}>
                {userIsCorrect ? (
                  <FiCheckCircle className="size-3" />
                ) : (
                  <FiXCircle className="size-3" />
                )}
                আপনার উত্তর:{" "}
                <span className="font-mono">
                  {userSelectedIndex != null
                    ? String.fromCharCode(65 + userSelectedIndex)
                    : "উত্তর দেয়া হয়নি"}
                </span>
              </span>
            </p>
          )}

          {/* Correct answer */}
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <FiCheckCircle aria-hidden="true" className="size-3" />
            সঠিক উত্তর:
            <span className="font-mono font-semibold text-sm">
              {String.fromCharCode(65 + correctOptionIndex)}
            </span>
            {correctOption.text}
          </p>

          {/* Explanation */}
          {question.explanation && (
            <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-white">ব্যাখ্যা: </span>
              {question.explanation}
            </p>
          )}
        </div>
      )}

      {/* Login prompt for unauthenticated users */}
      {!isAuthenticated && (isSubmitted || isPracticeMode) && (
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <FiLock className="size-4" />
            <span>উত্তর ও ব্যাখ্যা দেখতে <a href="/login" className="text-emerald-600 hover:underline font-medium">লগইন করুন</a></span>
          </div>
        </div>
      )}
    </article>
  );
}