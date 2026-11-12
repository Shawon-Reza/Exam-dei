"use client";

import { useState } from "react";
import { FiBookOpen, FiCheckCircle, FiXCircle, FiLock, FiArrowLeft } from "react-icons/fi";

type QuestionOption = {
  id: string;
  text: string;
};

type McqQuestion = {
  id: string;
  question: string;
  type: string;
  difficulty: number;
  correctAnswer: string;
  explanation: string;
  banglaExplanation?: string;
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
  canViewExplanation?: boolean;
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
  canViewExplanation = false,
}: McqQuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const correctOption = question.options.find(
    (option) => option.id.toLowerCase() === question.correctAnswer.toLowerCase(),
  );
  const correctOptionIndex = question.options.findIndex(
    (option) => option.id.toLowerCase() === question.correctAnswer.toLowerCase(),
  );

  const isReviewMode = (isSubmitted || isPracticeMode) && isAuthenticated;
  const userSelectedIndex = isSubmitted ? submittedAnswer?.selectedIndex : selectedOptionIndex;
  const userIsCorrect = isSubmitted ? submittedAnswer?.isCorrect : false;

  return (
    <article className="h-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
      <div className="relative max-h-[560px] overflow-hidden">
        <div
          className={`relative flex max-h-[560px] flex-col overflow-y-auto transition-all duration-500 ease-in-out ${showExplanation ? "-translate-x-8 opacity-0" : "translate-x-0 opacity-100"
            }`}
          aria-hidden={showExplanation}
        >
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

          {canViewExplanation && question.explanation && (
            <button
              type="button"
              onClick={() => setShowExplanation(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
            >
              <FiBookOpen aria-hidden="true" />
              ব্যাখ্যা দেখুন
            </button>
          )}

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
        </div>

        {canViewExplanation && question.explanation && (
          <div
            className={`absolute inset-0 flex flex-col rounded-xl bg-emerald-50/90 p-4 transition-all duration-500 ease-in-out dark:bg-emerald-950/40 ${showExplanation
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0 pointer-events-none"
              }`}
            aria-hidden={!showExplanation}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Explanation
                </p>
                <h3 className="mt-1 text-base font-extrabold text-zinc-900 dark:text-white">
                  প্রশ্নের ব্যাখ্যা
                </h3>
              </div>
              <FiBookOpen className="size-5 text-emerald-600 dark:text-emerald-300" />
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              <p>{question.explanation}</p>
              {question.banglaExplanation && (
                <p className="mt-3 border-t border-emerald-200 pt-3 dark:border-emerald-900">
                  {question.banglaExplanation}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="mt-4 inline-flex items-center gap-2 self-start rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300"
            >
              <FiArrowLeft aria-hidden="true" />
              প্রশ্নে ফিরে যান
            </button>
          </div>
        )}
      </div>
    </article>
  );
}