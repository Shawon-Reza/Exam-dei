"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FiArrowDown,
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiClock,
  FiLayers,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import ExamCard from "./ExamCard";
import ExamSessionDialog from "./ExamSessionDialog";
import {
  examCategories,
  exams,
  examSubjects,
  type Exam,
  type ExamStatus,
} from "./exam-data";
import { useDemoAuth } from "../../lib/demo-auth";

type BrowseMode = "subject" | "category";
type StatusFilter = "all" | "live" | "upcoming" | "practice";

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "সব পরীক্ষা" },
  { id: "live", label: "লাইভ / চলমান" },
  { id: "upcoming", label: "নির্ধারিত" },
  { id: "practice", label: "Practice set" },
];

const statusMatchesFilter = (status: ExamStatus, filter: StatusFilter) => {
  if (filter === "all") return true;
  if (filter === "live") return status === "live" || status === "running";
  return status === filter;
};

function ExamDashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useDemoAuth();
  const [browseMode, setBrowseMode] = useState<BrowseMode>("subject");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [examToStart, setExamToStart] = useState<Exam | null>(null);
  const requestedExamId = searchParams.get("start");
  const requestedExam =
    isAuthenticated && requestedExamId
      ? exams.find(
          (exam) => exam.id === requestedExamId && exam.status !== "upcoming",
        ) ?? null
      : null;
  const activeDialogExam = examToStart ?? requestedExam;

  const selectedSubject = examSubjects.find(
    (subject) => subject.id === selectedSubjectId,
  );

  const filteredExams = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

    return exams.filter((exam) => {
      const matchesSubject =
        browseMode !== "subject" ||
        !selectedSubjectId ||
        (exam.subjectId === selectedSubjectId &&
          (!selectedTopicId || exam.topicId === selectedTopicId));
      const matchesCategory =
        browseMode !== "category" ||
        !selectedCategoryId ||
        exam.categoryId === selectedCategoryId;
      const matchesStatus = statusMatchesFilter(exam.status, statusFilter);
      const matchesSearch =
        !normalizedSearch ||
        `${exam.title} ${exam.subtitle}`
          .toLocaleLowerCase()
          .includes(normalizedSearch);

      return matchesSubject && matchesCategory && matchesStatus && matchesSearch;
    });
  }, [
    browseMode,
    searchTerm,
    selectedCategoryId,
    selectedSubjectId,
    selectedTopicId,
    statusFilter,
  ]);

  const activeExams = exams.filter(
    (exam) => exam.status === "live" || exam.status === "running",
  );
  const scheduledExams = exams.filter((exam) => exam.status === "upcoming");

  function selectMode(mode: BrowseMode) {
    setBrowseMode(mode);
    setSelectedSubjectId(null);
    setSelectedTopicId(null);
    setSelectedCategoryId(null);
  }

  function selectSubject(subjectId: string) {
    setSelectedSubjectId((current) =>
      current === subjectId ? null : subjectId,
    );
    setSelectedTopicId(null);
  }

  function clearFilters() {
    setSelectedSubjectId(null);
    setSelectedTopicId(null);
    setSelectedCategoryId(null);
    setStatusFilter("all");
    setSearchTerm("");
  }

  function startOrInspectExam(exam: Exam) {
    if (exam.status !== "upcoming" && !isAuthenticated) {
      const returnPath = `${pathname}?start=${encodeURIComponent(exam.id)}`;
      router.push(`/login?next=${encodeURIComponent(returnPath)}`);
      return;
    }

    setExamToStart(exam);
  }

  function closeExamDialog() {
    setExamToStart(null);
    if (requestedExamId) {
      router.replace(pathname, { scroll: false });
    }
  }

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <section className="relative isolate overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.12),transparent_45%),radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.10),transparent_40%)]"
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
              <FiZap aria-hidden="true" />
              প্রস্তুতি হোক লক্ষ্যভিত্তিক
            </p>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl">
              আপনার পরের পরীক্ষাটি
              <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                এখান থেকেই শুরু।
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Subject-wise পড়ুন, নির্দিষ্ট topic-এ practice করুন, অথবা BCS,
              NTRCA ও Primary-এর মতো চাকরির পরীক্ষার জন্য প্রস্তুতি নিন।
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#find-exam"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
              >
                পরীক্ষা খুঁজুন
                <FiArrowDown aria-hidden="true" />
              </a>
              <a
                href="#live-exams"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200"
              >
                <span className="size-2 animate-pulse rounded-full bg-rose-500" />
                Live exam দেখুন
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[390px]">
            {[
              { value: "০২", label: "বাছাইয়ের ধরন", icon: FiLayers },
              { value: "০৪", label: "পরীক্ষার অবস্থা", icon: FiClock },
              { value: "∞", label: "নিজের গতিতে", icon: FiTrendingUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white bg-white/80 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80 sm:p-4"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-emerald-600 dark:text-emerald-400"
                  />
                  <p className="mt-3 text-xl font-extrabold text-zinc-950 dark:text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="find-exam" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Find your next test · পরীক্ষা বেছে নিন
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              কীভাবে প্রস্তুতি নিতে চান?
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              বিষয় ধরে practice করুন, অথবা আপনার লক্ষ্য চাকরির category অনুযায়ী
              exam খুঁজুন।
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div
              aria-label="পরীক্ষা খোঁজার ধরন"
              className="mx-auto mb-7 grid max-w-md grid-cols-2 rounded-2xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-zinc-900"
              role="tablist"
            >
              {[
                { id: "subject" as const, label: "বিষয়ভিত্তিক", icon: FiBookOpen },
                { id: "category" as const, label: "চাকরির category", icon: FiTarget },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = browseMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => selectMode(tab.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition sm:text-sm ${
                      isSelected
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {browseMode === "subject" ? (
              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                      Subject নির্বাচন করুন
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      পুরো subject অথবা subject-এর নির্দিষ্ট topic বেছে নিন।
                    </p>
                  </div>
                  {selectedSubject && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedSubject.label} নির্বাচিত
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {examSubjects.map((subject) => {
                    const Icon = subject.icon;
                    const isSelected = subject.id === selectedSubjectId;
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => selectSubject(subject.id)}
                        className={`relative flex min-h-36 flex-col items-start rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-950/5 dark:bg-emerald-950/30"
                            : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-emerald-500 text-white">
                            <FiCheck aria-hidden="true" className="size-3" />
                          </span>
                        )}
                        <span
                          className={`grid size-10 place-items-center rounded-xl ${subject.color}`}
                        >
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">
                          {subject.label}
                        </span>
                        <span className="mt-1 line-clamp-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                          {subject.englishLabel} · {subject.questionCount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedSubject && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/20 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">
                          কোন অংশে পরীক্ষা দিতে চান?
                        </p>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          পুরো {selectedSubject.label} অথবা নির্দিষ্ট topic
                          বেছে নিন।
                        </p>
                      </div>
                      {selectedTopicId && (
                        <button
                          type="button"
                          onClick={() => setSelectedTopicId(null)}
                          className="self-start text-xs font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300 sm:self-auto"
                        >
                          পুরো subject দেখুন
                        </button>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        aria-pressed={!selectedTopicId}
                        onClick={() => setSelectedTopicId(null)}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                          !selectedTopicId
                            ? "bg-emerald-600 text-white"
                            : "border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                        }`}
                      >
                        পুরো subject
                      </button>
                      {selectedSubject.topics.map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          aria-pressed={selectedTopicId === topic.id}
                          onClick={() => setSelectedTopicId(topic.id)}
                          className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                            selectedTopicId === topic.id
                              ? "bg-emerald-600 text-white"
                              : "border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                          }`}
                        >
                          {topic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    চাকরির category নির্বাচন করুন
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    আপনার কাঙ্ক্ষিত নিয়োগ পরীক্ষার জন্য সাজানো exam দেখুন।
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {examCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategoryId === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelectedCategoryId((current) =>
                            current === category.id ? null : category.id,
                          )
                        }
                        className={`flex items-center gap-4 rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 ${
                          isSelected
                            ? "border-emerald-500 ring-2 ring-emerald-500/10"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        <span
                          className={`grid size-12 shrink-0 place-items-center rounded-2xl ${category.color}`}
                        >
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-zinc-950 dark:text-white">
                            {category.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] font-medium text-zinc-400">
                            {category.englishLabel}
                          </span>
                          <span className="mt-2 block text-xs text-zinc-500 dark:text-zinc-400">
                            {category.description}
                          </span>
                        </span>
                        {isSelected && (
                          <FiCheck
                            aria-hidden="true"
                            className="shrink-0 text-emerald-600 dark:text-emerald-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-9 border-t border-zinc-200 pt-7 dark:border-zinc-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    Explore tests · practice smarter
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-zinc-950 dark:text-white">
                    আপনার জন্য পরীক্ষা
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Demo data preview · backend যুক্ত হলে live exam ও schedule
                    এখানে আপডেট হবে।
                  </p>
                </div>
                <label className="relative block sm:w-72">
                  <span className="sr-only">পরীক্ষা খুঁজুন</span>
                  <FiSearch
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="পরীক্ষার নাম লিখে খুঁজুন"
                    className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={statusFilter === filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                      statusFilter === filter.id
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
                {(selectedSubjectId || selectedCategoryId || searchTerm) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="shrink-0 px-2 text-xs font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300"
                  >
                    সব filter মুছুন
                  </button>
                )}
              </div>

              <p className="mb-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                {filteredExams.length}টি exam পাওয়া গেছে
                {selectedSubject && ` · ${selectedSubject.label}`}
                {selectedTopicId &&
                  ` · ${selectedSubject?.topics.find((topic) => topic.id === selectedTopicId)?.label}`}
                {selectedCategoryId &&
                  ` · ${examCategories.find((category) => category.id === selectedCategoryId)?.label}`}
              </p>

              {filteredExams.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredExams.map((exam) => (
                    <ExamCard
                      key={exam.id}
                      exam={exam}
                      onStart={startOrInspectExam}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
                  <FiSearch
                    aria-hidden="true"
                    className="mx-auto size-7 text-zinc-400"
                  />
                  <h4 className="mt-4 font-bold text-zinc-900 dark:text-white">
                    এই filter-এ কোনো exam পাওয়া যায়নি
                  </h4>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    অন্য subject, category বা keyword দিয়ে খুঁজে দেখুন।
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    সব পরীক্ষা দেখুন
                    <FiArrowRight aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="live-exams"
        className="scroll-mt-24 border-y border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
                Live now · এখনই পরীক্ষা দিন
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
                চলমান পরীক্ষা
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="size-2 animate-pulse rounded-full bg-rose-500" />
              {activeExams.length}টি exam চলছে
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {activeExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                compact
                onStart={startOrInspectExam}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Plan ahead · সময় ধরে প্রস্তুতি নিন
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
                আসন্ন schedule
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <FiCalendar aria-hidden="true" className="text-blue-500" />
              {scheduledExams.length}টি নির্ধারিত exam
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {scheduledExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                compact
                onStart={startOrInspectExam}
              />
            ))}
          </div>
        </div>
      </section>

      {activeDialogExam && (
        <ExamSessionDialog
          key={activeDialogExam.id}
          exam={activeDialogExam}
          onClose={closeExamDialog}
        />
      )}
    </main>
  );
}

export default function ExamDashboard() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] flex-1 bg-zinc-50 dark:bg-zinc-950" />
      }
    >
      <ExamDashboardContent />
    </Suspense>
  );
}
