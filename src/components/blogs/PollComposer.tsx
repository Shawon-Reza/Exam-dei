"use client";

import { useState } from "react";
import { FiArrowRight, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import type { PollOption } from "./types";

type DraftOption = {
  id: string;
  text: string;
};

const createOption = (): DraftOption => ({
  id: `option-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  text: "",
});

export function PollComposer({
  onPublish,
  onCancel,
}: {
  onPublish: (question: string, description: string, options: PollOption[]) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<DraftOption[]>([
    { id: "option-1", text: "" },
    { id: "option-2", text: "" },
  ]);
  const [correctOptionId, setCorrectOptionId] = useState("option-1");

  function updateOption(id: string, text: string) {
    setOptions((current) =>
      current.map((option) => (option.id === id ? { ...option, text } : option)),
    );
  }

  function removeOption(id: string) {
    if (options.length <= 2) return;
    setOptions((current) => current.filter((option) => option.id !== id));
    if (correctOptionId === id) {
      setCorrectOptionId(options.find((option) => option.id !== id)?.id ?? "");
    }
  }

  const canPublish =
    question.trim().length > 0 &&
    options.length >= 2 &&
    options.every((option) => option.text.trim().length > 0) &&
    options.some((option) => option.id === correctOptionId);

  function publish() {
    if (!canPublish) return;
    onPublish(
      question.trim(),
      description.trim(),
      options.map((option) => ({
        ...option,
        text: option.text.trim(),
        isCorrect: option.id === correctOptionId,
      })),
    );
  }

  return (
    <section
      aria-labelledby="poll-compose-title"
      className="mb-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl shadow-emerald-950/5 dark:border-emerald-900 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-5 dark:border-zinc-800 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            কমিউনিটি MCQ
          </p>
          <h2
            id="poll-compose-title"
            className="mt-1 text-xl font-extrabold text-zinc-900 dark:text-white"
          >
            নতুন poll তৈরি করুন
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Poll তৈরি বন্ধ করুন"
          className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-7">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            প্রশ্ন
          </span>
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={180}
            placeholder="আপনার MCQ প্রশ্নটি লিখুন"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-900 outline-none transition placeholder:font-normal placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            ব্যাখ্যা <span className="font-normal text-zinc-400">(ঐচ্ছিক)</span>
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            maxLength={300}
            placeholder="উত্তরের পেছনের তথ্য বা ব্যাখ্যা লিখুন"
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            উত্তরগুলো লিখে সঠিক উত্তরটি নির্বাচন করুন
          </legend>
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                name="correct-poll-answer"
                aria-label={`${index + 1} নম্বর উত্তরকে সঠিক হিসেবে চিহ্নিত করুন`}
                checked={correctOptionId === option.id}
                onChange={() => setCorrectOptionId(option.id)}
                className="size-4 shrink-0 accent-emerald-600"
              />
              <input
                value={option.text}
                onChange={(event) => updateOption(option.id, event.target.value)}
                maxLength={140}
                aria-label={`উত্তর ${index + 1}`}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  aria-label={`উত্তর ${index + 1} মুছুন`}
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
          {options.length < 6 && (
            <button
              type="button"
              onClick={() => setOptions((current) => [...current, createOption()])}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950"
            >
              <FiPlus aria-hidden="true" />
              আরেকটি option যোগ করুন
            </button>
          )}
        </fieldset>

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-zinc-400">
            ভোট দেওয়ার পর সবাই সঠিক উত্তর ও poll result দেখতে পারবে।
          </p>
          <button
            type="button"
            disabled={!canPublish}
            onClick={publish}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Poll প্রকাশ করুন
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
