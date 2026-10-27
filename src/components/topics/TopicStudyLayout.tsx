"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBookOpen,
  FiClock,
  FiHelpCircle,
  FiSidebar,
} from "react-icons/fi";
import type { ExamSubject, ExamTopic } from "../exams/exam-data";
import type { TopicNote } from "./topic-notes";
import TopicOverviewSidebar from "./TopicOverviewSidebar";
import { useSearchParams } from "next/navigation";
import { useTopicDeepDetails } from "@/src/apis/topics/topics.hooks";

type TopicStudyLayoutProps = {
  subject: Pick<ExamSubject, "id" | "slug" | "label" | "englishLabel">;
  topic: ExamTopic;
  mcqCount: number;
  note: TopicNote;
};

export default function TopicStudyLayout({
  subject,
  topic,
  mcqCount,
  note,
}: TopicStudyLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const searchParams = useSearchParams()
  const topicID = searchParams.get('topicID')
  console.log("==============", topic.id, topicID)

  const topicDeepDetails = useTopicDeepDetails(topic.id)
  console.log("topicDeepDetails", topicDeepDetails?.data)




  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const syncSidebarState = () => setIsSidebarCollapsed(!desktopQuery.matches);

    syncSidebarState();
    desktopQuery.addEventListener("change", syncSidebarState);

    return () => desktopQuery.removeEventListener("change", syncSidebarState);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 lg:h-[calc(100dvh-72px)] lg:min-h-0 lg:overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:hidden">
        <Link
          href="/topics"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-300"
        >
          <FiArrowLeft aria-hidden="true" />
          সব বিষয়
        </Link>
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          aria-label={isSidebarCollapsed ? "সাইডবার খুলুন" : "সাইডবার বন্ধ করুন"}
          title={isSidebarCollapsed ? "সাইডবার খুলুন" : "সাইডবার বন্ধ করুন"}
          className="grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
        >
          <FiSidebar aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div
        className={`mx-auto grid min-h-screen max-w-[1600px] lg:h-full lg:min-h-0 ${isSidebarCollapsed
          ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_56px]"
          : "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(280px,32%)] lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]"
          }`}
      >
        <article
          className={`min-w-0 px-4 pb-8 sm:px-6 sm:pb-10 lg:h-full lg:overflow-y-auto lg:px-8 lg:pb-12 ${!isSidebarCollapsed ? "max-md:hidden" : ""
            }`}
        >
          <div className="hidden items-center justify-between gap-3 lg:flex">
            <Link
              href="/topics"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-300"
            >
              <FiArrowLeft aria-hidden="true" />
              সব বিষয়
            </Link>
          </div>

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

          <section
            aria-labelledby="notes-heading"
            id="notes-content"
            className="py-2 sm:py-4"
          >

            <article className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white px-4 py-6 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800 dark:bg-zinc-900 sm:px-9 sm:py-10 lg:px-12">
              <header className="border-b border-zinc-100 pb-5 text-center dark:border-zinc-800 sm:pb-7">
                <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
                  {subject.label} · {subject.englishLabel}
                </p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                  {topic.label}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {note.subtitle}
                </p>
              </header>

              <div className="mx-auto max-w-3xl pt-6 font-serif text-[15px] leading-8 text-zinc-700 dark:text-zinc-300 sm:pt-8 sm:text-base sm:leading-9">
                <p className="first-letter:float-left first-letter:mr-2 first-letter:text-4xl first-letter:font-bold first-letter:leading-none first-letter:text-emerald-700 dark:first-letter:text-emerald-400">
                  {note.introduction}
                </p>

                {note.chapters.map((chapter, index) => (
                  <section key={chapter.title} className="mt-7 sm:mt-9">
                    <h4 className="mb-2 font-sans text-lg font-bold leading-7 text-zinc-950 dark:text-white sm:text-xl">
                      <span className="mr-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {chapter.title}
                    </h4>
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-3">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}

                <p className="mt-8 border-t border-zinc-100 pt-5 text-sm italic text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  {note.conclusion}
                </p>
              </div>
            </article>
          </section>

        </article>

        <TopicOverviewSidebar
          subject={{ id: subject.id, slug: subject.slug, label: subject.label }}
          topic={{ id: topic.id, slug: topic.slug, label: topic.label }}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          className={`border-t lg:border-l lg:border-t-0 ${isSidebarCollapsed
            ? "hidden lg:block"
            : "block max-md:min-h-screen md:max-lg:min-h-full"
            }`}
        />
      </div>
    </main>
  );
}
