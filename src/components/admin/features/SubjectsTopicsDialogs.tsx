"use client";

import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { AdminDialog, DialogActions, Field, inputClass } from "../ui/AdminPrimitives";

export type SubjectDraft = {
  label: string;
  englishLabel: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: string;
  file: File | null;
};

export type TopicDraft = {
  label: string;
  slug: string;
  description: string;
  searchName: string;
  sortOrder: string;
  isActive: boolean;
  file: File | null;
};

export const emptySubject: SubjectDraft = { label: "", englishLabel: "", slug: "", description: "", isActive: true, sortOrder: "", file: null };
export const emptyTopic: TopicDraft = { label: "", slug: "", description: "", searchName: "", sortOrder: "", isActive: true, file: null };
export const initialTopicObject = `{
  "slug": "topic-slug",
  "name": "Topic Name",
  "banglaName": "টপিক নাম",
  "description": "Topic description",
  "searchName": "topic, টপিক",
  "sortOrder": 1,
  "isActive": true,
  "icon": ""
}`;
export const initialSubjectObject = `{
  "slug": "english",
  "name": "English",
  "banglaName": "ইংরেজি",
  "description": "English grammar, vocabulary, literature, and language skills for competitive examinations.",
  "icon": "BookOpen",
  "sortOrder": 2,
  "isActive": true
}`;
export const initialQuestionsObject = `[
  {
    "question": "সমাস শব্দের অর্থ কী?",
    "options": [
      { "key": "A", "text": "সংক্ষেপ", "isCorrect": true },
      { "key": "B", "text": "প্রসারণ", "isCorrect": false },
      { "key": "C", "text": "বিভাজন", "isCorrect": false },
      { "key": "D", "text": "পরিবর্তন", "isCorrect": false }
    ],
    "type": "MCQ",
    "difficulty": 1,
    "explanation": "সমাসের অর্থ সংক্ষেপ।",
    "isActive": true
  }
]`;

export type PdfDraft = {
  name: string;
  banglaName: string;
  description: string;
  url: string;
};

export const emptyPdf: PdfDraft = { name: "", banglaName: "", description: "", url: "" };

export function SubjectDialog({
  editingId,
  draft,
  inputMode,
  objectValue,
  saving,
  onDraftChange,
  onInputModeChange,
  onObjectChange,
  onSubmit,
  onClose,
}: {
  editingId: string | null;
  draft: SubjectDraft;
  inputMode: "form" | "object";
  objectValue: string;
  saving: boolean;
  onDraftChange: (draft: SubjectDraft) => void;
  onInputModeChange: (mode: "form" | "object") => void;
  onObjectChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <AdminDialog title={editingId ? "বিষয় সম্পাদনা" : "নতুন বিষয় যোগ করুন"} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        {!editingId && <ModeSwitch value={inputMode} onChange={onInputModeChange} />}
        {inputMode === "object" && !editingId ? (
          <Field label="Subject object (JSON)"><textarea required rows={14} value={objectValue} onChange={(event) => onObjectChange(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} /><p className="mt-1 text-xs text-zinc-500">`icon` fieldটি তথ্য হিসেবে রাখা যাবে; upload icon-এর জন্য Form format ব্যবহার করুন।</p></Field>
        ) : <SubjectFields draft={draft} onChange={onDraftChange} />}
        <DialogActions onCancel={onClose} submitLabel={saving ? "সংরক্ষণ হচ্ছে..." : editingId ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> বিষয় যোগ করুন</>} />
      </form>
    </AdminDialog>
  );
}

export function TopicDialog({
  subjectLabel,
  editingId,
  draft,
  inputMode,
  objectValue,
  saving,
  onDraftChange,
  onInputModeChange,
  onObjectChange,
  onSubmit,
  onClose,
}: {
  subjectLabel?: string;
  editingId: string | null;
  draft: TopicDraft;
  inputMode: "form" | "object";
  objectValue: string;
  saving: boolean;
  onDraftChange: (draft: TopicDraft) => void;
  onInputModeChange: (mode: "form" | "object") => void;
  onObjectChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <AdminDialog title={editingId ? "Topic সম্পাদনা" : `${subjectLabel ?? "বিষয়"}-এ Topic যোগ করুন`} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        {!editingId && <ModeSwitch value={inputMode} onChange={onInputModeChange} />}
        {inputMode === "object" && !editingId ? (
          <Field label="Topic object (JSON)"><textarea required rows={14} value={objectValue} onChange={(event) => onObjectChange(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} /><p className="mt-1 text-xs text-zinc-500">`subjectId` selected subject থেকে automatically যুক্ত হবে।</p></Field>
        ) : <TopicFields draft={draft} onChange={onDraftChange} />}
        <DialogActions onCancel={onClose} submitLabel={saving ? "সংরক্ষণ হচ্ছে..." : editingId ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> Topic যোগ করুন</>} />
      </form>
    </AdminDialog>
  );
}

export function QuestionsDialog({
  subjectId,
  topicId,
  topicLabel,
  value,
  onChange,
  onSubmit,
  onClose,
}: {
  subjectId: string;
  topicId: string;
  topicLabel: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <AdminDialog title={`${topicLabel}-এ প্রশ্ন যোগ করুন`} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Questions JSON">
          <textarea required rows={20} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} />
          <p className="mt-1 text-xs text-zinc-500">Subject ID: {subjectId} · Topic ID: {topicId}</p>
        </Field>
        <DialogActions onCancel={onClose} submitLabel={<><FiPlus aria-hidden="true" />Add Question</>} />
      </form>
    </AdminDialog>
  );
}

export function PdfDialog({
  subjectId,
  topicId,
  topicLabel,
  draft,
  onChange,
  onSubmit,
  onClose,
}: {
  subjectId: string;
  topicId: string;
  topicLabel: string;
  draft: PdfDraft;
  onChange: (draft: PdfDraft) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <AdminDialog title={`${topicLabel}-এ PDF যোগ করুন`} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Name"><input required value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} className={inputClass} /></Field>
        <Field label="বাংলা নাম"><input required value={draft.banglaName} onChange={(event) => onChange({ ...draft, banglaName: event.target.value })} className={inputClass} /></Field>
        <Field label="Description"><textarea required rows={3} value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} className={`${inputClass} resize-y`} /></Field>
        <Field label="PDF URL"><input required type="url" value={draft.url} onChange={(event) => onChange({ ...draft, url: event.target.value })} className={inputClass} placeholder="https://example.com/file.pdf" /></Field>
        <p className="text-xs text-zinc-500">Subject ID: {subjectId} · Topic ID: {topicId}</p>
        <DialogActions onCancel={onClose} submitLabel="Console-এ পাঠান" />
      </form>
    </AdminDialog>
  );
}

function ModeSwitch({ value, onChange }: { value: "form" | "object"; onChange: (value: "form" | "object") => void }) {
  return <div className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-sm dark:bg-zinc-800"><button type="button" onClick={() => onChange("form")} className={`rounded-lg px-3 py-2 font-semibold ${value === "form" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Form format</button><button type="button" onClick={() => onChange("object")} className={`rounded-lg px-3 py-2 font-semibold ${value === "object" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Object format</button></div>;
}

function SubjectFields({ draft, onChange }: { draft: SubjectDraft; onChange: (draft: SubjectDraft) => void }) {
  return <><Field label="বাংলা নাম"><input required value={draft.label} onChange={(event) => onChange({ ...draft, label: event.target.value })} className={inputClass} placeholder="যেমন: বাংলা" /></Field><Field label="English name"><input required value={draft.englishLabel} onChange={(event) => onChange({ ...draft, englishLabel: event.target.value, slug: event.target.value.trim().toLowerCase().replace(/\s+/g, "-") })} className={inputClass} placeholder="যেমন: Bangla" /></Field><Field label="Slug"><input required value={draft.slug} onChange={(event) => onChange({ ...draft, slug: event.target.value })} className={inputClass} placeholder="যেমন: bangla" /></Field><Field label="সংক্ষিপ্ত বর্ণনা"><textarea rows={3} value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} className={`${inputClass} resize-y`} placeholder="এই বিষয়ের সম্পর্কে লিখুন..." /></Field><Field label="Icon"><input type="file" accept="image/*" onChange={(event) => onChange({ ...draft, file: event.target.files?.[0] ?? null })} className={inputClass} /></Field><Field label="Sort order"><input type="number" min="0" value={draft.sortOrder} onChange={(event) => onChange({ ...draft, sortOrder: event.target.value })} className={inputClass} /></Field><label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={draft.isActive} onChange={(event) => onChange({ ...draft, isActive: event.target.checked })} /> সক্রিয় বিষয়</label></>;
}

function TopicFields({ draft, onChange }: { draft: TopicDraft; onChange: (draft: TopicDraft) => void }) {
  return <><Field label="Topic-এর নাম"><input required value={draft.label} onChange={(event) => onChange({ ...draft, label: event.target.value, slug: event.target.value.trim().toLowerCase().replace(/\s+/g, "-") })} className={inputClass} placeholder="যেমন: সমাস" /></Field><Field label="Slug"><input required value={draft.slug} onChange={(event) => onChange({ ...draft, slug: event.target.value })} className={inputClass} placeholder="যেমন: shomash" /></Field><Field label="Description"><textarea rows={3} value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} className={`${inputClass} resize-y`} /></Field><Field label="Search name"><input value={draft.searchName} onChange={(event) => onChange({ ...draft, searchName: event.target.value })} className={inputClass} placeholder="যেমন: shomash, সমাস" /></Field><Field label="Icon"><input type="file" accept="image/*" onChange={(event) => onChange({ ...draft, file: event.target.files?.[0] ?? null })} className={inputClass} /></Field><Field label="Sort order"><input type="number" min="0" value={draft.sortOrder} onChange={(event) => onChange({ ...draft, sortOrder: event.target.value })} className={inputClass} /></Field><label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={draft.isActive} onChange={(event) => onChange({ ...draft, isActive: event.target.checked })} /> সক্রিয় Topic</label></>;
}
