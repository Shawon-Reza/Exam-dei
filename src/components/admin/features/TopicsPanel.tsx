"use client";

import Image from "next/image";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiFileText } from "react-icons/fi";
import type { ExamTopic } from "../../exams/exam-data";
import type { AdminSubject } from "../types";
import { GrTask } from "react-icons/gr";
import {
  EmptyTable,
  PrimaryButton,
  SearchBox,
  TableFooter,
} from "../ui/AdminPrimitives";
import TopicTestsModal from "./TopicTestsModal";
import TopicNotesModal from "./TopicNotesModal";
import { useState } from "react";

type TopicsPanelProps = {
  subject: AdminSubject | undefined;
  isLoading: boolean;
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
  onEdit: (topic: ExamTopic) => void;
  onDelete: (topic: ExamTopic) => void;
  onAddQuestions: (topic: ExamTopic) => void;
  onAddPdf: (topic: ExamTopic) => void;
};

export function TopicsPanel({
  subject,
  isLoading,
  search,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onAddQuestions,
  onAddPdf,
}: TopicsPanelProps) {
  if (!subject) return <div className="p-10 text-center text-sm text-zinc-500">Topic দেখতে একটি বিষয় নির্বাচন করুন।</div>;
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    null
  );
  const [notesTopic, setNotesTopic] = useState<ExamTopic | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-zinc-100 p-5 sm:flex-row sm:items-start sm:justify-between dark:border-zinc-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{subject.englishLabel}</p>
          <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-white">{subject.label}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subject.description || "এই বিষয়ের topic গুলো পরিচালনা করুন।"}</p>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-64 sm:items-end">
          <SearchBox value={search} onChange={onSearch} placeholder="এই বিষয়ের topic খুঁজুন..." />
          <PrimaryButton onClick={onAdd}><FiPlus aria-hidden="true" /> Topic যোগ করুন</PrimaryButton>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60">
            <tr>
              <th className="px-5 py-3 font-bold">Topic</th>
              <th className="px-4 py-3 font-bold">ID</th>
              <th className="px-4 py-3 font-bold">questions</th>
              <th className="px-4 py-3 font-bold">pdfs</th>
              <th className="px-4 py-3 font-bold">tests</th>
              <th className="px-4 py-3 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {isLoading ? <tr><td colSpan={6} className="p-8 text-center text-sm text-zinc-500">Topic লোড হচ্ছে...</td></tr> : subject.topics.map((topic) => (
              <tr key={topic.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
                <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">
                  <span className="flex items-center gap-2">
                    <Image src={topic.iconUrl ?? "/default-subject-icon.svg"}
                      alt={`${topic.label} আইকন`}
                      width={28}
                      height={28}
                      className="size-7 rounded-lg object-cover" />
                    {topic.label}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-zinc-500">
                  {topic.id}
                </td>
                <td className="px-4 py-4 text-center text-zinc-600 dark:text-zinc-400">
                  {topic._count?.questions ?? 0}
                </td>
                <td className="px-4 py-4 text-center text-zinc-600 dark:text-zinc-400">
                  {topic._count?.pdfs ?? 0}
                </td>
                <td className="px-4 py-4 text-center text-zinc-600 dark:text-zinc-400">
                  {topic._count?.tests ?? 0}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-1">
                    <button type="button"
                      onClick={() => onAddQuestions(topic)}
                      aria-label={`${topic.label}-এ প্রশ্ন যোগ করুন`}
                      title={`প্রশ্ন যোগ করুন (${topic._count?.questions ?? 0})`}
                      className="grid size-9 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
                      <FiPlus aria-hidden="true" />
                    </button>
                    <button type="button"
                      onClick={() => onAddPdf(topic)}
                      aria-label={`${topic.label}-এ PDF যোগ করুন`}
                      title={`PDF যোগ করুন (${topic._count?.pdfs ?? 0})`}
                      className="grid size-9 place-items-center rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40">
                      <FiUpload aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTopicId(topic.id)}
                      title={`Test যোগ করুন (${topic._count?.tests ?? 0})`}
                      className="grid size-9 place-items-center rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      <GrTask aria-hidden="true" />
                    </button>

                    <button type="button"
                      onClick={() => setNotesTopic(topic)}
                      aria-label={`${topic.label}-এ নোট যোগ করুন`}
                      title="নোট যোগ করুন"
                      className="grid size-9 place-items-center rounded-lg text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40">
                      <FiFileText aria-hidden="true" />
                    </button>

                    <button type="button"
                      onClick={() => onEdit(topic)}
                      aria-label={`${topic.label} সম্পাদনা`}
                      title="সম্পাদনা"
                      className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      <FiEdit2 aria-hidden="true" />
                    </button>
                    <button type="button"
                      onClick={() => onDelete(topic)}
                      aria-label={`${topic.label} মুছুন`}
                      title="মুছুন"
                      className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40">
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && subject.topics.length === 0 && <EmptyTable colSpan={6} text={search.trim() ? "এই search-এর সাথে কোনো topic মেলেনি।" : "এই বিষয়ে এখনো কোনো topic নেই।"} />}
          </tbody>
        </table>
      </div>
      <TableFooter count={subject.topics.length} label="টি topic" />
      {selectedTopicId && (
        <TopicTestsModal
          topicId={selectedTopicId}
          subjectId={subject.id}
          onClose={() => setSelectedTopicId(null)}
        />
      )}
      {notesTopic && (
        <TopicNotesModal
          topic={notesTopic}
          subjectId={subject.id}
          onClose={() => setNotesTopic(null)}
        />
      )}
    </>
  );
}