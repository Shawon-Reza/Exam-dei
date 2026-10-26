"use client";

import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { useSubjects } from "../../apis/subjects/subjects.hooks";
import { topicsApi } from "../../apis/topics/topics.api";
import type { ExamSubject } from "../exams/exam-data";
import TopicTopicsModal from "./TopicTopicsModal";
import TopicsCard from "./TopicsCard";

export default function TopicsBrowser() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const subjectsQuery = useSubjects();
  const subjects = subjectsQuery.data ?? [];
  const topicQueries = useQueries({
    queries: subjects.map((subject) => ({
      queryKey: ["topics", subject.id, ""] as const,
      queryFn: () => topicsApi.getTopics(subject.id),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    })),
  });
  const apiSubjects: ExamSubject[] = subjects.map((subject, index) => ({
    id: subject.id,
    slug: subject.slug,
    label: subject.banglaName,
    englishLabel: subject.name,
    description: subject.description ?? "",
    iconUrl: subject.icon,
    sortOrder: subject.sortOrder,
    isActive: subject.isActive,
    questionCount: "—",
    icon: FiBookOpen,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    topics: (topicQueries[index]?.data ?? []).map((topic) => ({
      id: topic.id,
      label: topic.banglaName?.trim() || topic.name,
      slug: topic.slug,
      description: topic.description ?? "",
      searchName: topic.searchName ?? "",
      sortOrder: topic.sortOrder,
      isActive: topic.isActive,
      iconUrl: topic.icon,
      subjectId: topic.subjectId,
    })),
  }));
  const selectedSubject =
    apiSubjects.find((subject) => subject.id === selectedSubjectId) ?? null;

  if (subjectsQuery.isLoading) {
    return <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 px-4 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700">বিষয় লোড হচ্ছে...</div>;
  }

  if (subjectsQuery.error) {
    return <div className="mt-6 rounded-2xl border border-dashed border-rose-300 px-4 py-16 text-center text-sm text-rose-600 dark:border-rose-800 dark:text-rose-300">বিষয় লোড করা যায়নি। পরে আবার চেষ্টা করুন।</div>;
  }

  if (apiSubjects.length === 0) {
    return <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 px-4 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700">এখনো কোনো বিষয় পাওয়া যায়নি।</div>;
  }

  return (
    <section
      aria-label="সকল বিষয়"
      className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {apiSubjects.map((subject, index) => (
        <TopicsCard
          key={subject.id}
          subject={subject}
          isLoading={topicQueries[index]?.isLoading}
          onSelect={setSelectedSubjectId}
        />
      ))}
      <TopicTopicsModal
        key={selectedSubject?.id ?? "closed"}
        subject={selectedSubject}
        onClose={() => setSelectedSubjectId(null)}
      />
    </section>
  );
}
