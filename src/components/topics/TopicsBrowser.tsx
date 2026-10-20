"use client";

import { useState } from "react";
import { examSubjects } from "../exams/exam-data";
import TopicTopicsModal from "./TopicTopicsModal";
import TopicsCard from "./TopicsCard";

export default function TopicsBrowser() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const selectedSubject =
    examSubjects.find((subject) => subject.id === selectedSubjectId) ?? null;

  return (
    <section
      aria-label="সকল বিষয়"
      className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {examSubjects.map((subject) => (
        <TopicsCard
          key={subject.id}
          subject={subject}
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
