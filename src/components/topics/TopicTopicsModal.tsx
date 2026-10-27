"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTopics } from "../../apis/topics/topics.hooks";
import { FiArrowRight, FiBookOpen, FiSearch, FiX } from "react-icons/fi";
import type { ExamSubject } from "../exams/exam-data";

type TopicTopicsModalProps = {
  subject: ExamSubject | null;
  onClose: () => void;
};

export default function TopicTopicsModal({
  subject,
  onClose,
}: TopicTopicsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const topicsQuery = useTopics(subject?.id ?? "", searchTerm.trim());

  useEffect(() => {
    if (!subject) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, subject]);

  if (!subject) return null;

  const filteredTopics = topicsQuery.data?.map((topic) => ({
    id: topic.id,
    label: topic.banglaName?.trim() || topic.name,
    slug: topic.slug,
  })) ?? [];
  const Icon = subject.icon;

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
        aria-labelledby="topics-modal-title"
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
                  {subject.englishLabel}
                </p>
                <h2
                  id="topics-modal-title"
                  className="truncate text-xl font-extrabold text-zinc-950 dark:text-white"
                >
                  {subject.label} এর সব topic
                </h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {subject.topics.length}টি topic · আপনার পছন্দের topic নির্বাচন করুন
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
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
            />
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
          {topicsQuery.isLoading ? (
            <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700">Topic লোড হচ্ছে...</div>
          ) : topicsQuery.error ? (
            <div className="rounded-xl border border-dashed border-rose-300 px-4 py-10 text-center text-sm text-rose-600 dark:border-rose-800 dark:text-rose-300">Topic লোড করা যায়নি। পরে আবার চেষ্টা করুন।</div>
          ) : filteredTopics.length > 0 ? (
            <ul className="grid gap-2 min-[480px]:grid-cols-2">
              {filteredTopics.map((topic, index) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${encodeURIComponent(topic.slug)}?subject=${encodeURIComponent(subject.slug ?? subject.id)}&topicID=${encodeURIComponent(topic.id)}`}
                    onClick={onClose}
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2.5 text-xs font-semibold text-zinc-700 transition hover:border-emerald-300 hover:bg-emerald-50/70 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-300"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{topic.label}</span>
                    </span>
                    <FiArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center dark:border-zinc-700">
              <FiBookOpen className="mx-auto size-6 text-zinc-400" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                কোনো topic পাওয়া যায়নি
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                অন্য শব্দ দিয়ে আবার খুঁজুন · Try another search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
