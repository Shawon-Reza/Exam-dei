import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicStudyLayout from "@/src/components/topics/TopicStudyLayout";
import { examSubjects, exams } from "@/src/components/exams/exam-data";
import { getTopicNote } from "@/src/components/topics/topic-notes";

type TopicRouteProps = {
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
}: TopicRouteProps): Promise<Metadata> {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = findTopic(topicId, subjectId);

  if (!topicDetails) {
    return { title: "বিষয় পাওয়া যায়নি" };
  }

  return {
    title: `${topicDetails.topic.label} — ${topicDetails.subject.label}`,
    description: `${topicDetails.subject.label} বিষয়ের ${topicDetails.topic.label} topic-এর নোট ও MCQ অনুশীলন।`,
  };
}

export default async function TopicPage({
  params,
  searchParams,
}: TopicRouteProps) {
  const [{ topic: topicId }, query] = await Promise.all([params, searchParams]);
  const subjectId = Array.isArray(query.subject) ? query.subject[0] : query.subject;
  const topicDetails = findTopic(topicId, subjectId);

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
        label: topicDetails.subject.label,
        englishLabel: topicDetails.subject.englishLabel,
      }}
      topic={topicDetails.topic}
      mcqCount={mcqCount}
      note={getTopicNote()}
    />
  );
}
