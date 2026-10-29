"use client";

import type { FormEvent } from "react";
import { statusLabels, type ExamStatus } from "../../exams/exam-data";
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
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            placeholder="যেমন: বাংলা ব্যাকরণ মডেল টেস্ট - ১"
            className={inputClass}
          />
        </Field>
        <Field label="Slug">
          <input
            required
            maxLength={120}
            value={draft.slug}
            onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
            placeholder="bangla-bakaron-model-test-1"
            className={inputClass}
          />
        </Field>
        <Field label="Description">
          <textarea
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            placeholder="Describe this exam..."
            rows={3}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Duration (minutes)">
            <input
              required
              type="number"
              min="1"
              max="360"
              value={draft.duration}
              onChange={(event) => setDraft({ ...draft, duration: Number(event.target.value) })}
              className={inputClass}
            />
          </Field>
          <Field label="Total Questions">
            <input
              required
              type="number"
              min="1"
              max="500"
              value={draft.totalQuestions}
              onChange={(event) => setDraft({ ...draft, totalQuestions: Number(event.target.value) })}
              className={inputClass}
            />
          </Field>
          <Field label="Is Active">
            <select
              value={String(draft.isActive)}
              onChange={(event) => setDraft({ ...draft, isActive: event.target.value === "true" })}
              className={inputClass}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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
        </div>
        <DialogActions
          onCancel={onClose}
          submitLabel={editing ? "পরিবর্তন সংরক্ষণ" : "পরীক্ষা তৈরি করুন"}
        />
      </form>
    </AdminDialog>
  );
}
