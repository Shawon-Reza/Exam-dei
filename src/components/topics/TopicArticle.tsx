"use client";

import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiHelpCircle,
  FiClock,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { TopicNotesContent } from "./TopicNotesContent";
import type { JSONContent } from "@tiptap/react";
import type { TopicDeepDetailNote, TopicDeepDetailsData } from "./topic-deep-details";

type TopicArticleProps = {
  subject: { label: string; englishLabel: string };
  topic: { label: string };
  topicDeepDetails: TopicDeepDetailsData | undefined;
  note: TopicDeepDetailNote | null | undefined;
};

export function TopicArticle({ subject, topic, topicDeepDetails, note }: TopicArticleProps) {
  const mcqCount = topicDeepDetails?.tests?.length ?? 0;
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <article className="min-w-0 px-4 pb-8 sm:px-6 sm:pb-10 lg:h-full lg:overflow-y-auto lg:px-8 lg:pb-12">
      <header className="mt-2 border-b border-zinc-200 pb-5 dark:border-zinc-800 sm:mt-3 sm:pb-7">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          {subject.label} <span aria-hidden="true">/</span> {subject.englishLabel}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {topic.label}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {topic.label} বিষয়ে নোট পড়ুন, গুরুত্বপূর্ণ ধারণাগুলো গুছিয়ে নিন এবং
          শেষে MCQ অনুশীলন করে প্রস্তুতি যাচাই করুন।
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <FiBookOpen aria-hidden="true" />
            স্টাডি নোট
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiHelpCircle aria-hidden="true" />
            {mcqCount}টি MCQ
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock aria-hidden="true" />
            নিজের গতিতে পড়ুন
          </span>
        </div>
      </header>

      <section aria-labelledby="notes-heading" id="notes-content" className="py-2 sm:py-4">
        <article
          role={isFullscreen ? "dialog" : undefined}
          aria-modal={isFullscreen ? true : undefined}
          aria-label={isFullscreen ? `${topic.label} নোট preview` : undefined}
          className={`mx-auto rounded-2xl border border-zinc-200 bg-white px-4 py-6 shadow-sm shadow-zinc-950/[0.03] transition-[border-radius] dark:border-zinc-800 dark:bg-zinc-900 sm:px-9 sm:py-10 lg:px-12 ${
            isFullscreen
              ? "fixed inset-0 z-[70] max-w-none overflow-y-auto rounded-none border-0 shadow-2xl"
              : "max-w-4xl"
          }`}
        >
          <header className="relative border-b border-zinc-100 pb-5 text-center dark:border-zinc-800 sm:pb-7">
            <button
              type="button"
              onClick={() => setIsFullscreen((current) => !current)}
              aria-label={isFullscreen ? "Exit fullscreen preview" : "Open fullscreen preview"}
              title={isFullscreen ? "Exit fullscreen preview" : "Open fullscreen preview"}
              className="absolute right-0 top-0 grid size-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
            >
              {isFullscreen ? <FiMinimize2 aria-hidden="true" /> : <FiMaximize2 aria-hidden="true" />}
            </button>
            <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              {subject.label} · {subject.englishLabel}
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              {topic.label}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {note ? "শেষ আপডেট: " + new Date(note.updatedAt).toLocaleDateString("bn-BD") : "নোট উপলব্ধ নেই"}
            </p>
          </header>

          <div className="mx-auto max-w-3xl pt-6 sm:pt-8 overflow-auto">
            {note ? (
              <TopicNotesContent content={note.content as JSONContent} />
            ) : (
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                <p className="text-lg font-medium mb-2">এই টপিকের জন্য এখনো কোনো নোট নেই</p>
                <p className="text-sm">Admin প্যানেল থেকে নোট যোগ করুন</p>
              </div>
            )}
          </div>


        </article>
      </section>

    </article>
  );
}