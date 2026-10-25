"use client";

import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import type { AdminSubject, QuestionDraft } from "../types";
import { AdminDialog, DialogActions, Field, inputClass } from "../ui/AdminPrimitives";

export default function QuestionFormDialog({
  draft,
  setDraft,
  editing,
  subjects,
  onClose,
  onSubmit,
}: {
  draft: QuestionDraft;
  setDraft: (draft: QuestionDraft) => void;
  editing: boolean;
  subjects: AdminSubject[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <AdminDialog
      title={editing ? "MCQ প্রশ্ন সম্পাদনা" : "নতুন MCQ প্রশ্ন যোগ করুন"}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="প্রশ্ন">
          <textarea
            required
            rows={3}
            value={draft.prompt}
            onChange={(event) => setDraft({ ...draft, prompt: event.target.value })}
            placeholder="প্রশ্নটি লিখুন..."
            className={`${inputClass} resize-y`}
          />
        </Field>
        <Field label="বিষয়">
          <select
            value={draft.subjectId}
            onChange={(event) => setDraft({ ...draft, subjectId: event.target.value })}
            className={inputClass}
          >
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.label}</option>)}
          </select>
        </Field>
        <Field label="Topic">
          <select
            required
            value={draft.topicId}
            onChange={(event) => setDraft({ ...draft, topicId: event.target.value })}
            className={inputClass}
          >
            <option value="">Topic নির্বাচন করুন</option>
            {subjects.find((subject) => subject.id === draft.subjectId)?.topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
        </Field>
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            উত্তরগুলো লিখে সঠিকটি চিহ্নিত করুন
          </legend>
          {draft.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="correct-answer"
                aria-label={`Option ${index + 1} সঠিক উত্তর`}
                checked={draft.answerIndex === index}
                onChange={() => setDraft({ ...draft, answerIndex: index })}
                className="accent-emerald-600"
              />
              <input
                required
                value={option}
                onChange={(event) => setDraft({
                  ...draft,
                  options: draft.options.map((current, optionIndex) =>
                    optionIndex === index ? event.target.value : current,
                  ),
                })}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                className={inputClass}
              />
            </div>
          ))}
        </fieldset>
        <Field label="ব্যাখ্যা (ঐচ্ছিক)">
          <textarea
            rows={2}
            value={draft.explanation}
            onChange={(event) => setDraft({ ...draft, explanation: event.target.value })}
            className={`${inputClass} resize-y`}
          />
        </Field>
        <DialogActions
          onCancel={onClose}
          submitLabel={editing ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> প্রশ্ন যোগ করুন</>}
        />
      </form>
    </AdminDialog>
  );
}
