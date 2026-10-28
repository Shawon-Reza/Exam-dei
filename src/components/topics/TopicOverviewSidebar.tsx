"use client";

import Link from "next/link";
import {
  FiArrowUpRight,
  FiClock,
  FiDownload,
  FiHelpCircle,
  FiLayers,
  FiSidebar,
} from "react-icons/fi";
import type { ExamSubject, ExamTopic } from "../exams/exam-data";
import GenerateTestDialog from "./GenerateTestDialog";

type TopicOverviewSidebarProps = {
  subject: Pick<ExamSubject, "id" | "slug" | "label">;
  topic: Pick<ExamTopic, "id" | "slug" | "label">;
  tests: any;
  pdfs: any;
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
};

export default function TopicOverviewSidebar({
  subject,
  topic,
  tests,
  pdfs,
  className = "",
  isCollapsed,
  onToggle,
}: TopicOverviewSidebarProps) {
  console.log("From sidebar :", tests, pdfs);

  return (
    <aside
      className={`min-w-0 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 lg:h-full lg:min-h-0 lg:overflow-hidden lg:border-l lg:border-t-0 ${isCollapsed ? "px-2 py-4" : "px-4 py-5 sm:px-6 lg:px-5 lg:py-7"} ${className}`}
    >
      <div className={isCollapsed ? "flex h-full items-start justify-center" : "flex flex-col h-full"}>
        <div className={isCollapsed ? "" : "flex items-center justify-end"}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={isCollapsed ? "সাইডবার খুলুন" : "সাইডবার বন্ধ করুন"}
            title={isCollapsed ? "সাইডবার খুলুন" : "সাইডবার বন্ধ করুন"}
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
          >
            <FiSidebar aria-hidden="true" className="size-4" />
          </button>
        </div>

        {isCollapsed ? null : (
          <div className="flex flex-1 flex-col min-h-0 pt-4 lg:pt-5">
            {/* Scrollable content area */}
            <div className="flex flex-1 flex-col min-h-0 overflow-y-auto">
              {/* ---------- Test Section (Top) ---------- */}
              <section className="flex-shrink-0">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Available Test Exams
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {tests?.length ?? 0}টি test
                  </span>
                </div>

                <div className="space-y-2">
                  {tests?.length > 0 ? (
                    tests.map((test: any, index: number) => (
                      <Link
                        key={test.id}
                        href={`/topics/${encodeURIComponent(
                          topic.slug ?? topic.id
                        )}/practice?subject=${encodeURIComponent(
                          subject.slug ?? subject.id
                        )}&testID=${encodeURIComponent(test.id)}&type=PREDEFINED`}
                        className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2.5 transition hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-zinc-700 dark:bg-zinc-950/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300">
                            {index + 1}
                          </span>

                          <span className="truncate text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {test.name}
                          </span>
                        </span>

                        <span className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                          <span className="hidden items-center gap-1 sm:inline-flex">
                            <FiLayers aria-hidden="true" />
                            {test.totalQuestions} MCQ
                          </span>

                          <span className="hidden items-center gap-1 sm:inline-flex">
                            <FiClock aria-hidden="true" />
                            {test.duration} মিনিট
                          </span>

                          <FiArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                          />
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
                      <p className="text-sm font-medium">কোনো টেস্ট উপলব্ধ নেই</p>
                      <p className="text-[11px] mt-1">Admin প্যানেল থেকে টেস্ট যোগ করুন</p>
                    </div>
                  )}
                </div>
              </section>

              {/* ---------- Generate Test Section (Middle) ---------- */}
              <section className="flex-shrink-0 py-4 border-y border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Generate test
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    customize
                  </span>
                </div>

                <GenerateTestDialog
                  subjectId={subject.id}
                  topicId={topic.id}
                  topicLabel={topic.label}
                />
              </section>

              {/* ---------- PDF/Link Section (Bottom Scrollable) ---------- */}
              <section className="flex-shrink-0">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    PDF নোট
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {pdfs?.length ?? 0}টি PDF
                  </span>
                </div>

                <div className="space-y-2 grid lg:grid-cols-2">
                  {pdfs?.length > 0 ? (
                    pdfs.map((pdf: any) => (
                      <a
                        key={pdf.id}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2.5 text-left transition hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-[10px] font-extrabold text-rose-600 dark:text-rose-300">
                            PDF
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate text-xs font-bold text-zinc-800 dark:text-zinc-200">
                              {pdf.banglaName || pdf.name}
                            </span>

                            <span className="mt-0.5 block truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                              {pdf.description || "নোট"}
                            </span>
                          </span>
                        </span>

                        <FiDownload
                          aria-hidden="true"
                          className="size-4 shrink-0 text-zinc-400 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                        />
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
                      <p className="text-sm font-medium">কোনো PDF উপলব্ধ নেই</p>
                      <p className="text-[11px] mt-1">Admin প্যানেল থেকে PDF যোগ করুন</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* ---------- MCQ Practice Button (Fixed at Bottom) ---------- */}
            <div className="flex-shrink-0 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {/* /topics/${encodeURIComponent(topic.slug ?? topic.id ) */}
              <Link
                href={`/topics/${encodeURIComponent(
                  topic.slug ?? topic.id
                )}/practice?subject=${encodeURIComponent(
                  subject.slug ?? subject.id
                )}&topicID=${encodeURIComponent(topic.id)}&type=practice`}

                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <FiHelpCircle aria-hidden="true" />
                MCQ অনুশীলন করুন
              </Link>

              <p className="mt-3 text-center text-[11px] leading-5 text-zinc-500 dark:text-zinc-400">
                নোট ও PDF-এর প্রকৃত কনটেন্ট যুক্ত হলে এই অংশ আপডেট হবে।
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}