"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExamBrowseModeTabs from "./ExamBrowseModeTabs";
import ExamCategoryBrowser from "./ExamCategoryBrowser";
import ExamHighlights from "./ExamHighlights";
import ExamResultsSection from "./ExamResultsSection";
import ExamSessionDialog from "./ExamSessionDialog";
import ExamSubjectBrowser from "./ExamSubjectBrowser";
import {
  examCategories,
  exams,
  examSubjects,
  type Exam,
  type ExamStatus,
} from "./exam-data";
import { useDemoAuth } from "../../lib/demo-auth";

import type { BrowseMode } from "./ExamBrowseModeTabs";
import type { StatusFilter } from "./ExamResultsSection";

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
  const requestedSubjectId = searchParams.get("subject");
  const requestedSubject = examSubjects.find(
    (subject) => subject.id === requestedSubjectId,
  );
  const requestedTopicId = searchParams.get("topic");
  const [browseMode, setBrowseMode] = useState<BrowseMode>("subject");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    requestedSubject?.id ?? null,
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    requestedSubject?.topics.some((topic) => topic.id === requestedTopicId)
      ? requestedTopicId
      : null,
  );
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
    scrollToResults();
  }

  function scrollToResults() {
    window.requestAnimationFrame(() => {
      document.getElementById("exam-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function selectTopic(topicId: string | null) {
    setSelectedTopicId(topicId);
    scrollToResults();
  }

  function selectCategory(categoryId: string) {
    setSelectedCategoryId((current) =>
      current === categoryId ? null : categoryId,
    );
    scrollToResults();
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
     

      <section id="find-exam" className="scroll-mt-24 py-12 sm:py-16">

        <div className="mx-auto px-4 sm:px-6 lg:px-8">

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

          <div className="mx-auto max-w-7xl">
            <ExamBrowseModeTabs mode={browseMode} onChange={selectMode} />

            {browseMode === "subject" ? (
              <ExamSubjectBrowser
                subjects={examSubjects}
                selectedSubjectId={selectedSubjectId}
                selectedTopicId={selectedTopicId}
                selectedSubject={selectedSubject}
                onSelectSubject={selectSubject}
                onSelectTopic={selectTopic}
                onClose={() => {
                  setSelectedSubjectId(null);
                  setSelectedTopicId(null);
                }}
              />
            ) : (
              <ExamCategoryBrowser
                categories={examCategories}
                selectedCategoryId={selectedCategoryId}
                onSelect={selectCategory}
              />
            )}

            <ExamResultsSection
              exams={filteredExams}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              statusFilters={statusFilters}
              selectedSubjectLabel={selectedSubject?.label}
              selectedTopicLabel={selectedSubject?.topics.find(
                (topic) => topic.id === selectedTopicId,
              )?.label}
              selectedCategoryLabel={examCategories.find(
                (category) => category.id === selectedCategoryId,
              )?.label}
              onSearchChange={setSearchTerm}
              onStatusChange={setStatusFilter}
              onClearFilters={clearFilters}
              onStart={startOrInspectExam}
            />
          </div>
        </div>
      </section>

      <ExamHighlights
        activeExams={activeExams}
        scheduledExams={scheduledExams}
        onStart={startOrInspectExam}
      />

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
