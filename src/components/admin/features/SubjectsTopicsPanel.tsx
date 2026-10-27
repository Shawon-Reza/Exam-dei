"use client";

import { Panel } from "../ui/AdminPrimitives";
import { SubjectList } from "./SubjectList";
import { TopicsPanel } from "./TopicsPanel";
import type { AdminSubject } from "../types";
import type { ExamTopic } from "../../exams/exam-data";

type SubjectsTopicsPanelProps = {
  subjects: AdminSubject[];
  isLoading: boolean;
  selectedSubjectId: string;
  selectedSubject?: AdminSubject;
  search: string;
  onSelect: (subject: AdminSubject) => void;
  onSearch: (value: string) => void;
  onEditSubject: (subject: AdminSubject) => void;
  onDeleteSubject: (subject: AdminSubject) => void;
  onAddTopic: () => void;
  onEditTopic: (topic: ExamTopic) => void;
  onDeleteTopic: (topic: ExamTopic) => void;
  onAddQuestions: (topic: ExamTopic) => void;
  onAddPdf: (topic: ExamTopic) => void;
};

export function SubjectsTopicsPanel({
  subjects,
  isLoading,
  selectedSubjectId,
  selectedSubject,
  search,
  onSelect,
  onSearch,
  onEditSubject,
  onDeleteSubject,
  onAddTopic,
  onEditTopic,
  onDeleteTopic,
  onAddQuestions,
  onAddPdf,
}: SubjectsTopicsPanelProps) {
  return (
    <Panel>
      <div className="grid lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.7fr)]">
        <SubjectList subjects={subjects} isLoading={isLoading} selectedSubjectId={selectedSubjectId} onSelect={onSelect} onEdit={onEditSubject} onDelete={onDeleteSubject} />
        <div className="min-w-0">
          <TopicsPanel subject={selectedSubject} isLoading={isLoading} search={search} onSearch={onSearch} onAdd={onAddTopic} onEdit={onEditTopic} onDelete={onDeleteTopic} onAddQuestions={onAddQuestions} onAddPdf={onAddPdf} />
        </div>
      </div>
    </Panel>
  );
}