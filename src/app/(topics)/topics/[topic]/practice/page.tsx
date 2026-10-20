import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicMcqPractice from "@/src/components/topics/TopicMcqPractice";
import { examSubjects } from "@/src/components/exams/exam-data";
import { getTopicQuestions } from "@/src/components/topics/topic-questions";

type TopicPracticePageProps = {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ subject?: string | string[] }>;
};

function findTopic(topicId: string, subjectId?: string) {
  for (const subject of examSubjects) {
    if (subjectId && subject.id !== subjectId) continue;
    const topic = subject.topics.find((item) => item.id === topicId);
    if (topic) return { subject, topic };
  }
  return null;
}

export async function generateMetadata({
  params,
  searchParams,
}: TopicPracticePageProps): Promise<Metadata> {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = findTopic(topicId, subjectId);

  if (!topicDetails) return { title: "বিষয় পাওয়া যায়নি" };

  return {
    title: `${topicDetails.topic.label} MCQ অনুশীলন`,
    description: `${topicDetails.subject.label} বিষয়ের ${topicDetails.topic.label} MCQ প্রশ্ন, সঠিক উত্তর ও ব্যাখ্যা।`,
  };
}

export default async function TopicPracticePage({
  params,
  searchParams,
}: TopicPracticePageProps) {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = findTopic(topicId, subjectId);

  if (!topicDetails) notFound();

  return (
    <TopicMcqPractice
      subject={topicDetails.subject}
      topic={topicDetails.topic}
      questionSet={getTopicQuestions(topicDetails.subject, topicDetails.topic)}
    />
  );
}
