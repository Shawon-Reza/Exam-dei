"use client";

import { useState } from "react";
import { examSubjects } from "../exams/exam-data";
import TopicsCard from "./TopicsCard";

export default function TopicsBrowser() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null,
  );
  function toggleSubject(subjectId: string) {
    setSelectedSubjectId((currentId) =>
      currentId === subjectId ? null : subjectId,
    );
  }

  return (
    <section
      aria-label="সকল বিষয়"
      className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {examSubjects.map((subject) => (
        <TopicsCard
          key={subject.id}
          subject={subject}
          isSelected={subject.id === selectedSubjectId}
          onSelect={toggleSubject}
        />
      ))}
    </section>
  );
}
