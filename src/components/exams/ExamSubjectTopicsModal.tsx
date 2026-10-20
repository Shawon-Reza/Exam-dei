"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiBookOpen, FiSearch, FiX } from "react-icons/fi";
import type { ExamSubject } from "./exam-data";

type ExamSubjectTopicsModalProps = {
  subject: ExamSubject | null;
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string | null) => void;
  onClose: () => void;
};

export default function ExamSubjectTopicsModal({
  subject,
  selectedTopicId,
  onSelectTopic,
  onClose,
}: ExamSubjectTopicsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!subject) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, subject]);

  if (!subject) return null;

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const topics = subject.topics.filter((topic) =>
    topic.label.toLocaleLowerCase().includes(normalizedSearch),
  );
  const Icon = subject.icon;

  function selectTopic(topicId: string | null) {
    onSelectTopic(topicId);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/40 p-3 backdrop-blur-sm sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-topics-modal-title"
        className="flex max-h-[min(86dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <header className="border-b border-zinc-200 p-4 dark:border-zinc-800 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${subject.color}`}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {subject.englishLabel} · Exam topics
                </p>
                <h2
                  id="exam-topics-modal-title"
                  className="truncate text-xl font-extrabold text-zinc-950 dark:text-white"
                >
                  {subject.label} এর সব topic
                </h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {subject.topics.length}টি topic · exam-এর অংশ বেছে নিন
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Topic modal বন্ধ করুন"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <label className="relative mt-4 block">
            <span className="sr-only">Topic খুঁজুন</span>
            <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Topic খুঁজুন · Search topics"
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
        </header>

        <div className="min-h-0 overflow-y-auto p-4 sm:p-5">
          <button
            type="button"
            onClick={() => selectTopic(null)}
            className={`mb-3 flex min-h-11 w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
              !selectedTopicId
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300"
            }`}
          >
            পুরো {subject.label} · All subject
            <FiArrowRight aria-hidden="true" />
          </button>

          {topics.length > 0 ? (
            <ul className="grid gap-2 min-[480px]:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <button
                    type="button"
                    onClick={() => selectTopic(topic.id)}
                    className={`group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                      selectedTopicId === topic.id
                        ? "border-emerald-500 bg-emerald-600 text-white"
                        : "border-zinc-200 bg-zinc-50/70 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/70 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-300"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FiBookOpen aria-hidden="true" className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="truncate">{topic.label}</span>
                    </span>
                    <FiArrowRight aria-hidden="true" className="size-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              কোনো topic পাওয়া যায়নি · No topic found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
