import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FiBookOpen } from "react-icons/fi";
import TopicStudyLayout from "@/src/components/topics/TopicStudyLayout";
import TopicRouteFallback from "@/src/components/topics/TopicRouteFallback";
import type { ExamSubject } from "@/src/components/exams/exam-data";
import { subjectsApi } from "@/src/apis/subjects/subjects.api";
import { topicsApi } from "@/src/apis/topics/topics.api";
import { exams } from "@/src/components/exams/exam-data";
import { getTopicNote } from "@/src/components/topics/topic-notes";

type TopicRouteProps = {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ subject?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "বিষয়ভিত্তিক প্রস্তুতি",
  description:
    "বিষয়ভিত্তিক নোট, গুরুত্বপূর্ণ ধারণা এবং MCQ অনুশীলনের মাধ্যমে চাকরির প্রস্তুতি নিন।",
};

async function findTopic(topicId: string, subjectId?: string) {
  try {
    const cookie = (await cookies()).toString();
    const subjects = await subjectsApi.getSubjects(cookie);
    const matchingSubjects = subjectId
      ? subjects.filter((subject) => subject.id === subjectId || subject.slug === subjectId)
      : subjects;

    for (const subject of matchingSubjects) {
      const topics = await topicsApi.getTopics(subject.id, undefined, cookie);
      const topic = topics.find((item) => item.id === topicId || item.slug === topicId);
      if (topic) {
      const mappedTopic = {
        id: topic.id,
        label: topic.banglaName?.trim() || topic.name,
        slug: topic.slug,
        description: topic.description ?? "",
        searchName: topic.searchName ?? "",
        sortOrder: topic.sortOrder,
        isActive: topic.isActive,
        iconUrl: topic.icon,
        subjectId: topic.subjectId,
      };
      const mappedSubject: ExamSubject = {
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
        topics: [mappedTopic],
      };
        return {
          subject: mappedSubject,
          topic: mappedTopic,
        };
      }
    }
  } catch (error) {
    console.error("Unable to load topic details:", error);
  }
  return null;
}

export default function TopicPage({
  params,
  searchParams,
}: TopicRouteProps) {
  return (
    <Suspense fallback={<TopicRouteFallback />}>
      <TopicPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function TopicPageContent({
  params,
  searchParams,
}: TopicRouteProps) {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = await findTopic(topicId, subjectId);

  if (!topicDetails) notFound();

  const mcqCount = exams
    .filter(
      (exam) =>
        exam.subjectId === topicDetails.subject.id &&
        exam.topicId === topicDetails.topic.id,
    )
    .reduce((total, exam) => total + exam.questionCount, 0);

  return (
    <TopicStudyLayout
      subject={{
        id: topicDetails.subject.id,
        slug: topicDetails.subject.slug,
        label: topicDetails.subject.label,
        englishLabel: topicDetails.subject.englishLabel,
      }}
      topic={topicDetails.topic}
      mcqCount={mcqCount}
      note={getTopicNote()}
    />
  );
}
