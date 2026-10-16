"use client";

import { useState } from "react";
import { FiCheckCircle, FiClock, FiX } from "react-icons/fi";
import type { Exam } from "./exam-data";

const optionLabels = ["ক", "খ", "গ", "ঘ"];

type ExamSessionDialogProps = {
  exam: Exam;
  onClose: () => void;
};

export default function ExamSessionDialog({ exam, onClose }: ExamSessionDialogProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const currentQuestion = exam.questions[questionIndex];
  const finalAnswers = isComplete
    ? answers
    : selectedAnswer === null
      ? answers
      : [...answers, selectedAnswer];
  const score = finalAnswers.reduce(
    (total, answer, index) =>
      total + (answer === exam.questions[index]?.answerIndex ? 1 : 0),
    0,
  );

  function moveToNextQuestion() {
    if (selectedAnswer === null) return;

    const nextAnswers = [...answers, selectedAnswer];
    setAnswers(nextAnswers);

    if (questionIndex === exam.questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setAnswerChecked(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="exam-dialog-title"
        aria-modal="true"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:rounded-3xl sm:p-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {exam.subtitle}
            </p>
            <h2
              id="exam-dialog-title"
              className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-white sm:text-2xl"
            >
              {isComplete ? "আপনার demo result" : exam.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="পরীক্ষার dialog বন্ধ করুন"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        {!hasStarted ? (
          <div className="mt-7">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              এই frontend preview-তে পরীক্ষার অভিজ্ঞতা দেখানোর জন্য কয়েকটি sample
              MCQ দেওয়া আছে। Backend যুক্ত হলে আসল প্রশ্ন, সময় ও result এখানে
              দেখানো যাবে।
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Demo প্রশ্ন", value: `${exam.questions.length}টি` },
                { label: "পরীক্ষার সময়", value: `${exam.durationMinutes} মিনিট` },
                { label: "পরীক্ষার ধরন", value: "MCQ" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
                  <p className="mt-1 font-bold text-zinc-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
            {exam.status === "upcoming" ? (
              <p className="mt-5 rounded-2xl bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-300">
                এই পরীক্ষা {exam.startsAt} শুরু হবে। নির্ধারিত সময়ের আগে demo
                session শুরু করা যাবে না।
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setHasStarted(true)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                Demo পরীক্ষা শুরু করুন
                <FiClock aria-hidden="true" />
              </button>
            )}
          </div>
        ) : isComplete ? (
          <div className="mt-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <FiCheckCircle aria-hidden="true" className="size-8" />
            </span>
            <p className="mt-5 text-4xl font-black text-zinc-950 dark:text-white">
              {score}/{exam.questions.length}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Demo পরীক্ষা সম্পন্ন হয়েছে। Backend যুক্ত হলে এখানে আপনার পূর্ণাঙ্গ
              ফলাফল ও performance analysis দেখা যাবে।
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-zinc-950"
            >
              বন্ধ করুন
            </button>
          </div>
        ) : (
          <div className="mt-7">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <span>প্রশ্ন {questionIndex + 1} / {exam.questions.length}</span>
              <span>Demo mode</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${((questionIndex + 1) / exam.questions.length) * 100}%`,
                }}
              />
            </div>
            <h3 className="mt-7 text-lg font-bold leading-8 text-zinc-950 dark:text-white">
              {currentQuestion.prompt}
            </h3>
            <div className="mt-5 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected = selectedAnswer === index;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    disabled={answerChecked}
                    onClick={() => setSelectedAnswer(index)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm transition ${
                      selected
                        ? "border-emerald-500 bg-emerald-500/5 text-zinc-950 dark:text-white"
                        : "border-zinc-200 text-zinc-700 hover:border-emerald-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-900"
                    }`}
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${selected ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                      {optionLabels[index] ?? index + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={() => {
                if (answerChecked) {
                  moveToNextQuestion();
                } else {
                  setAnswerChecked(true);
                }
              }}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {!answerChecked
                ? "উত্তর যাচাই করুন"
                : questionIndex === exam.questions.length - 1
                  ? "পরীক্ষার ফলাফল দেখুন"
                  : "পরের প্রশ্ন"}
            </button>
            {answerChecked && (
              <p
                aria-live="polite"
                className={`mt-4 rounded-xl p-4 text-sm leading-6 ${
                  selectedAnswer === currentQuestion.answerIndex
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                }`}
              >
                <span className="font-bold">
                  {selectedAnswer === currentQuestion.answerIndex
                    ? "সঠিক উত্তর!"
                    : `সঠিক উত্তর: ${optionLabels[currentQuestion.answerIndex]}`}
                </span>{" "}
                {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
