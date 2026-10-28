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
import TopicOverviewSidebar from "./TopicOverviewSidebar";
import { useSearchParams } from "next/navigation";
import { useTopicDeepDetails } from "@/src/apis/topics/topics.hooks";
import { TopicArticle } from "./TopicArticle";
import type { TopicDeepDetailsData } from "./topic-deep-details";

type TopicStudyLayoutProps = {
  subject: Pick<ExamSubject, "id" | "slug" | "label" | "englishLabel">;
  topic: ExamTopic;
  mcqCount: number;
};

export default function TopicStudyLayout({
  subject,
  topic,
  mcqCount,
}: TopicStudyLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const searchParams = useSearchParams();
  const topicID = searchParams.get("topicID");


  const { data: topicDeepDetails, isLoading } = useTopicDeepDetails(topic.id);


  const note = topicDeepDetails?.data?.notes[0] || {};
  const tests = topicDeepDetails?.data?.tests || [];
  const pdfs = topicDeepDetails?.data?.pdfs || [];





  // console.log("Notes------------", note)
  // console.log("test------------", tests)
  // console.log("pdf------------", pdfs)
  // console.log("topicDeepDetails", topicDeepDetails?.data);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const syncSidebarState = () => setIsSidebarCollapsed(!desktopQuery.matches);

    syncSidebarState();
    desktopQuery.addEventListener("change", syncSidebarState);

    return () => desktopQuery.removeEventListener("change", syncSidebarState);
  }, []);

  const deepDetailsData = topicDeepDetails?.data?.data as TopicDeepDetailsData | undefined;

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
        <TopicArticle
          subject={subject}
          topic={topic}
          topicDeepDetails={deepDetailsData}
          note={note}
        />

        <TopicOverviewSidebar
          subject={{ id: subject.id, slug: subject.slug, label: subject.label }}
          topic={{ id: topic.id, slug: topic.slug, label: topic.label }}
          tests={tests}
          pdfs={pdfs}

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