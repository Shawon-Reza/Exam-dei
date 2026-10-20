"use client";

import type { FormEvent } from "react";
import { examSubjects, statusLabels, type ExamStatus } from "../../exams/exam-data";
import type { ExamDraft } from "../types";
import { AdminDialog, DialogActions, Field, inputClass } from "../ui/AdminPrimitives";

export default function ExamFormDialog({
  draft,
  setDraft,
  editing,
  onClose,
  onSubmit,
}: {
  draft: ExamDraft;
  setDraft: (draft: ExamDraft) => void;
  editing: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <AdminDialog
      title={editing ? "পরীক্ষা সম্পাদনা" : "নতুন পরীক্ষা তৈরি"}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="পরীক্ষার নাম">
          <input
            required
            maxLength={120}
            autoFocus
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            placeholder="যেমন: BCS Model Test"
            className={inputClass}
          />
        </Field>
        <Field label="Subtitle">
          <input
            value={draft.subtitle}
            onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })}
            placeholder="যেমন: বিসিএস · Preliminary"
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="বিষয়">
            <select
              value={draft.subjectId}
              onChange={(event) => setDraft({ ...draft, subjectId: event.target.value })}
              className={inputClass}
            >
              {examSubjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.label}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value as ExamStatus })}
              className={inputClass}
            >
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="প্রশ্ন সংখ্যা">
            <input
              required
              type="number"
              min="1"
              max="500"
              value={draft.questionCount}
              onChange={(event) => setDraft({ ...draft, questionCount: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="সময় (মিনিট)">
            <input
              required
              type="number"
              min="1"
              max="360"
              value={draft.durationMinutes}
              onChange={(event) => setDraft({ ...draft, durationMinutes: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
        <DialogActions
          onCancel={onClose}
          submitLabel={editing ? "পরিবর্তন সংরক্ষণ" : "পরীক্ষা তৈরি করুন"}
        />
      </form>
    </AdminDialog>
  );
}
