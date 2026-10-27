"use client";

import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { AdminSubject } from "../types";

type SubjectListProps = {
  subjects: AdminSubject[];
  isLoading: boolean;
  selectedSubjectId: string;
  onSelect: (subject: AdminSubject) => void;
  onEdit: (subject: AdminSubject) => void;
  onDelete: (subject: AdminSubject) => void;
};

export function SubjectList({
  subjects,
  isLoading,
  selectedSubjectId,
  onSelect,
  onEdit,
  onDelete,
}: SubjectListProps) {
  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800 lg:border-r dark:border-zinc-800">
      {isLoading ? <div className="p-8 text-center text-sm text-zinc-500">বিষয় লোড হচ্ছে...</div> : subjects.map((subject) => {
        const active = selectedSubjectId === subject.id;
        return (
          <div key={subject.id} className={`flex items-center gap-3 p-4 transition ${active ? "bg-emerald-50/70 dark:bg-emerald-950/20" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30"}`}>
            <button type="button" onClick={() => onSelect(subject)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
              <Image src={subject.iconUrl ?? "/default-subject-icon.svg"} alt={`${subject.label} আইকন`} width={40} height={40} className="size-10 shrink-0 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-zinc-900 dark:text-white">{subject.label}</span>
                <span className="block truncate text-xs text-zinc-500">{subject.englishLabel} · {subject.topics.length} topic</span>
              </span>
            </button>
            <div className="flex shrink-0">
              <button type="button" onClick={() => onEdit(subject)} aria-label={`${subject.label} সম্পাদনা`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><FiEdit2 aria-hidden="true" size={14} /></button>
              <button type="button" onClick={() => onDelete(subject)} aria-label={`${subject.label} মুছুন`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"><FiTrash2 aria-hidden="true" size={14} /></button>
            </div>
          </div>
        );
      })}
      {!isLoading && subjects.length === 0 && <div className="p-8 text-center text-sm text-zinc-500">কোনো বিষয় পাওয়া যায়নি।</div>}
    </div>
  );
}