"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

type GenerateTestDialogProps = {
  subjectId: string;
  topicId: string;
  topicLabel: string;
};

const difficultyValues = {
  easy: 1,
  medium: 3,
  hard: 4,
} as const;
type Difficulty = keyof typeof difficultyValues;

const difficultyOptions = [
  {
    value: "easy",
    label: "সহজ · Easy",
    description: "মৌলিক ধারণা যাচাই · Basic concepts",
  },
  {
    value: "medium",
    label: "মাঝারি · Medium",
    description: "ধারণা ও প্রয়োগভিত্তিক · Concept and application",
  },
  {
    value: "hard",
    label: "কঠিন · Hard",
    description: "চ্যালেঞ্জিং প্রশ্ন · Advanced questions",
  },
] as const;

export default function GenerateTestDialog({
  subjectId,
  topicId,
  topicLabel,
}: GenerateTestDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState("20");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<{
    limit: number;
    difficulty: number;
  } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const limit = Number.parseInt(questionCount, 10);

    if (!Number.isInteger(limit) || limit < 5 || limit > 100) {
      return;
    }

    setIsGenerating(true);

    window.setTimeout(() => {
      setIsGenerating(false);
      setGeneratedTest({
        limit,
        difficulty: difficultyValues[difficulty],
      });
      setIsOpen(false);
    }, 700);
  }

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    if (!isGenerating) setIsOpen(false);
  }

  return (
    <>
      {generatedTest ? (
        <div className="mt-2 space-y-2">
          <Link
            href={`/topics/${encodeURIComponent(topicId)}/practice?subject=${encodeURIComponent(
              subjectId
            )}&topicID=${encodeURIComponent(topicId)}&difficulty=${generatedTest.difficulty}&limit=${generatedTest.limit}&type=RANDOM`}
            className="flex w-full items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-3 text-left transition hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/25"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                <FiCheckCircle aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-zinc-900 dark:text-white">
                  Test ready · টেস্ট প্রস্তুত
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                  {generatedTest.limit}টি MCQ · Start quiz / কুইজ শুরু করুন
                </span>
              </span>
            </span>
            <FiClock
              aria-hidden="true"
              className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
          </Link>
          <button
            type="button"
            onClick={openDialog}
            className="flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-bold text-zinc-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
          >
            <FiRefreshCw aria-hidden="true" />
            আবার তৈরি করুন · Regenerate
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openDialog}
          className="mt-2 flex w-full items-center justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50/70 px-3 py-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              {generatedTest ? (
                <FiCheckCircle aria-hidden="true" />
              ) : (
                <FiEdit3 aria-hidden="true" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-zinc-900 dark:text-white">
                নিজের test তৈরি করুন · Create your test
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                {generatedTest
                  ? `${questionCount}টি MCQ · আবার customize করতে ক্লিক করুন`
                  : "প্রশ্ন সংখ্যা ও level বেছে নিন · Choose your preferences"}
              </span>
            </span>
          </span>
          <FiClock
            aria-hidden="true"
            className="size-4 shrink-0 text-zinc-400"
          />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/35 p-4 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="generate-test-title"
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  Customize test · টেস্ট কাস্টমাইজ করুন
                </p>
                <h2
                  id="generate-test-title"
                  className="mt-1 text-lg font-extrabold text-zinc-950 dark:text-white"
                >
                  {topicLabel} test তৈরি করুন · Build your test
                </h2>
                <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  আপনার প্রস্তুতি অনুযায়ী practice test তৈরি করুন ·
                  Build a practice test for your preparation.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close popup · Popup বন্ধ করুন"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  মোট কতটি MCQ? · Number of MCQs
                </span>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="5"
                  value={questionCount}
                  onChange={(event) => setQuestionCount(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </label>

              <fieldset>
                <legend className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  প্রশ্নের level নির্বাচন করুন · Select difficulty
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {difficultyOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-xl border p-3 transition ${difficulty === option.value
                        ? "border-emerald-500 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                        : "border-zinc-200 bg-zinc-50 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-950/40"
                        }`}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={option.value}
                        checked={difficulty === option.value}
                        onChange={() => setDifficulty(option.value)}
                        className="sr-only"
                      />
                      <span className="block text-xs font-bold text-zinc-900 dark:text-white">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[10px] leading-4 text-zinc-500 dark:text-zinc-400">
                        {option.description}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="min-h-10 rounded-xl border border-zinc-200 px-4 text-xs font-bold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  বাতিল · Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70"
                >
                  {isGenerating
                    ? "Test তৈরি হচ্ছে... · Generating..."
                    : "Test তৈরি করুন · Generate test"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
