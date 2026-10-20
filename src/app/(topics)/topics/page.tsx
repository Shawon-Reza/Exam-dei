import type { Metadata } from "next";
import { FiBookOpen } from "react-icons/fi";
import { examSubjects } from "@/src/components/exams/exam-data";
import TopicsBrowser from "@/src/components/topics/TopicsBrowser";

export const metadata: Metadata = {
  title: "বিষয়সমূহ",
  description:
    "বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান, বিজ্ঞান ও ICT-সহ সব বিষয়ের topic দেখে প্রস্তুতি নিন।",
};

export default function TopicsPage() {
  const topicCount = examSubjects.reduce(
    (count, subject) => count + subject.topics.length,
    0,
  );

  return (
    <main className="min-h-screen bg-zinc-50 py-3 dark:bg-zinc-950 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <FiBookOpen aria-hidden="true" />
            বিষয়ভিত্তিক প্রস্তুতি
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            আপনার পছন্দের বিষয় বেছে নিন
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            প্রতিটি বিষয়ের গুরুত্বপূর্ণ topic এক জায়গায় সাজানো। নিজের প্রস্তুতি
            অনুযায়ী বিষয় বেছে নিয়ে অনুশীলন শুরু করুন।
          </p>
          <p className="mt-5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {examSubjects.length}টি বিষয় <span aria-hidden="true">·</span>{" "}
            {topicCount}টি topic
          </p>
        </header>

        <TopicsBrowser />
      </div>
    </main>
  );
}
