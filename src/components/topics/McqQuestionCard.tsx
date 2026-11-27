"use client";

import { useState } from "react";
import {
  FiBookOpen,
  FiCheckCircle,
  FiXCircle,
  FiLock,
  FiArrowLeft,
  FiGlobe,
} from "react-icons/fi";

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
  banglaQuestion: string;
};

type SubmittedAnswer = {
  selectedIndex: number | null;
  isCorrect: boolean;
} | null;

type McqQuestionCardProps = {
  question: McqQuestion;
  questionNumber: number;
  onAnswerSelect: (questionId: string, optionIndex: number) => void;
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
  const [flipped, setFlipped] = useState(false);
  const [showEnglishExplanation, setShowEnglishExplanation] = useState(false);

  const correctOption = question.options.find(
    (option) =>
      option.id.toLowerCase() === question.correctAnswer.toLowerCase(),
  );
  const correctOptionIndex = question.options.findIndex(
    (option) =>
      option.id.toLowerCase() === question.correctAnswer.toLowerCase(),
  );

  const userSelectedIndex = isSubmitted
    ? submittedAnswer?.selectedIndex
    : selectedOptionIndex;
  const userIsCorrect = isSubmitted ? submittedAnswer?.isCorrect : false;

  // ─────────────────────────────────────────────────────────────────────────────
  // PRACTICE MODE — 3-D flashcard flip
  // ─────────────────────────────────────────────────────────────────────────────
  if (isPracticeMode) {
    return (
      <div
        style={{ perspective: "1200px" }}
        className="relative h-full w-full"
      >
        {/* Inner flip container */}
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          className="h-full w-full [transform-style:preserve-3d]"
        >
          {/* ── FRONT FACE ── */}
          <article
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="min-h-0 xl:flex-1 xl:overflow-y-auto mcq-explanation-scrollbar">
              {/* Question header */}
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                  {String(questionNumber).padStart(2, "0")}
                </span>
                <h2 className="pt-1 text-sm font-bold leading-6 text-zinc-950 dark:text-white">
                  {question?.banglaQuestion}
                </h2>
              </div>

              {/* Options — read-only, without revealing the correct choice */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-1">
                {question.options.map((option, index) => (
                  <div
                    key={`${question.id}-${index}`}
                    className="flex min-w-0 items-start gap-2 rounded-xl border border-zinc-100 bg-zinc-50/70 px-2 py-2.5 text-xs leading-5 sm:gap-2.5 sm:px-3 dark:border-zinc-800 dark:bg-zinc-950/50"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="min-w-0 flex-1 break-words">
                      {option.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 sm:flex-nowrap">
              {correctOption && (
                <div className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/20">
                  <FiCheckCircle
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    সঠিক উত্তর:&nbsp;
                    <span className="font-mono text-sm">
                      {String.fromCharCode(65 + correctOptionIndex)}
                    </span>
                  </p>
                </div>
              )}

              {!isAuthenticated ? (
                <div className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <FiLock className="size-3.5" />
                  <a
                    href="/login"
                    className="font-medium whitespace-nowrap text-emerald-600 hover:underline"
                  >
                    ব্যাখ্যা দেখতে লগইন করুন
                  </a>
                </div>
              ) : question.explanation || question.banglaExplanation ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowEnglishExplanation(false);
                    setFlipped(true);
                  }}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                >
                  <FiBookOpen aria-hidden="true" />
                  ব্যাখ্যা দেখুন
                </button>
              ) : null}
            </div>
          </article>

          {/* ── BACK FACE ── */}
          <article
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              inset: 0,
            }}
            className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50 p-3 shadow-sm shadow-zinc-950/[0.03] dark:border-emerald-800 dark:bg-emerald-950/30 sm:gap-4 sm:p-3.5"
          >
            {/* Back header */}
            <div className="flex shrink-0 items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                ব্যাখ্যা
              </p>
              {question.banglaExplanation && question.explanation && (
                <button
                  type="button"
                  onClick={() =>
                    setShowEnglishExplanation((showEnglish) => !showEnglish)
                  }
                  aria-label={
                    showEnglishExplanation
                      ? "বাংলা ব্যাখ্যা দেখুন"
                      : "ইংরেজি ব্যাখ্যা দেখুন"
                  }
                  title={
                    showEnglishExplanation
                      ? "বাংলা ব্যাখ্যা দেখুন"
                      : "ইংরেজি ব্যাখ্যা দেখুন"
                  }
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-emerald-200 bg-white/70 text-emerald-700 transition hover:bg-white dark:border-emerald-800 dark:bg-zinc-900/60 dark:text-emerald-300 dark:hover:bg-zinc-900"
                >
                  <FiGlobe aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="shrink-0 border-t border-emerald-200 dark:border-emerald-800" />

            {/* Explanation body */}
            <div className="mcq-explanation-scrollbar min-h-0 flex-1 overflow-y-auto text-sm leading-7 text-zinc-700 dark:text-zinc-200">
              <p>
                {showEnglishExplanation
                  ? question.explanation
                  : question.banglaExplanation || question.explanation}
              </p>
            </div>

            {/* Flip back button */}
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-zinc-900 dark:text-emerald-300 dark:hover:bg-zinc-800"
            >
              <FiArrowLeft aria-hidden="true" />
              প্রশ্নে ফিরে যান
            </button>
          </article>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST MODE (testID route) — interactive quiz, unchanged
  // ─────────────────────────────────────────────────────────────────────────────
  const isReviewMode = isSubmitted && isAuthenticated;

  return (
    <article className="h-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
      <div className="flex flex-col">
        {/* Question header */}
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
            {String(questionNumber).padStart(2, "0")}
          </span>
          <h2 className="pt-1 text-sm font-bold leading-6 text-zinc-950 dark:text-white">
            {question?.banglaQuestion}
          </h2>
        </div>

        {/* Options */}
        <fieldset className="mt-4 flex-1">
          <legend className="sr-only">
            প্রশ্ন {questionNumber}-এর উত্তর নির্বাচন করুন
          </legend>

          <div className="grid grid-cols-1 gap-2">
            {question.options.map((option, index) => {
              const isSelected = userSelectedIndex === index;
              const isCorrectOption = index === correctOptionIndex;
              const showAsCorrect = isReviewMode && isCorrectOption;
              const showAsUserWrong =
                isReviewMode && isSelected && !isCorrectOption;

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
                    onChange={() => onAnswerSelect(question.id, index)}
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

        {/* Post-submission review */}
        {isReviewMode && correctOption && (
          <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium">
              <span
                className={`inline-flex items-center gap-1 ${userIsCorrect
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-rose-700 dark:text-rose-300"
                  }`}
              >
                {userIsCorrect ? (
                  <FiCheckCircle className="size-3" />
                ) : (
                  <FiXCircle className="size-3" />
                )}
                আপনার উত্তর:{" "}
                <span className="font-mono">
                  {userSelectedIndex != null
                    ? String.fromCharCode(65 + userSelectedIndex)
                    : "উত্তর দেয়া হয়নি"}
                </span>
              </span>
            </p>

            <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <FiCheckCircle aria-hidden="true" className="size-3" />
              সঠিক উত্তর:
              <span className="font-mono font-semibold text-sm">
                {String.fromCharCode(65 + correctOptionIndex)}
              </span>
              {correctOption.text}
            </p>

            {question.explanation && (
              <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-900 dark:text-white">
                  ব্যাখ্যা:{" "}
                </span>
                {question.explanation}
              </p>
            )}
          </div>
        )}

        {/* Login prompt for unauthenticated users after test submit */}
        {!isAuthenticated && isSubmitted && (
          <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div className="flex items-center gap-2 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <FiLock className="size-4" />
              <span>
                উত্তর ও ব্যাখ্যা দেখতে{" "}
                <a
                  href="/login"
                  className="font-medium text-emerald-600 hover:underline"
                >
                  লগইন করুন
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
