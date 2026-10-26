import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FiBookOpen } from "react-icons/fi";
import TopicMcqPractice from "@/src/components/topics/TopicMcqPractice";
import TopicRouteFallback from "@/src/components/topics/TopicRouteFallback";
import type { ExamSubject } from "@/src/components/exams/exam-data";
import { subjectsApi } from "@/src/apis/subjects/subjects.api";
import { topicsApi } from "@/src/apis/topics/topics.api";
import { getTopicQuestions } from "@/src/components/topics/topic-questions";

type TopicPracticePageProps = {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ subject?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "MCQ অনুশীলন",
  description:
    "বিষয়ভিত্তিক MCQ প্রশ্ন অনুশীলন করুন এবং চাকরির পরীক্ষার প্রস্তুতি এগিয়ে নিন।",
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
    console.error("Unable to load topic practice details:", error);
  }
  return null;
}

export default function TopicPracticePage({
  params,
  searchParams,
}: TopicPracticePageProps) {
  return (
    <Suspense fallback={<TopicRouteFallback />}>
      <TopicPracticePageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function TopicPracticePageContent({
  params,
  searchParams,
}: TopicPracticePageProps) {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = await findTopic(topicId, subjectId);

  if (!topicDetails) notFound();

  return (
    <TopicMcqPractice
      subject={topicDetails.subject}
      topic={topicDetails.topic}
      questionSet={getTopicQuestions(topicDetails.subject, topicDetails.topic)}
    />
  );
}
