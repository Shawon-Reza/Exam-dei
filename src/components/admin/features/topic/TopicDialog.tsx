"use client";

import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { AdminDialog, DialogActions, Field, inputClass } from "../../ui/AdminPrimitives";
import type { TopicDraft } from "./topic-types";

export default function TopicDialog({
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
          <Field label="Topic object (JSON)">
            <textarea required rows={14} value={objectValue} onChange={(event) => onObjectChange(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} />
          </Field>
        ) : (
          <TopicFields draft={draft} onChange={onDraftChange} />
        )}
        <DialogActions onCancel={onClose} submitLabel={saving ? "সংরক্ষণ হচ্ছে..." : editingId ? "পরিবর্তন সংরক্ষণ" : <><FiPlus aria-hidden="true" /> Topic যোগ করুন</>} />
      </form>
    </AdminDialog>
  );
}

function ModeSwitch({ value, onChange }: { value: "form" | "object"; onChange: (value: "form" | "object") => void }) {
  return (
    <div className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-sm dark:bg-zinc-800">
      <button type="button" onClick={() => onChange("form")} className={`rounded-lg px-3 py-2 font-semibold ${value === "form" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Form format</button>
      <button type="button" onClick={() => onChange("object")} className={`rounded-lg px-3 py-2 font-semibold ${value === "object" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}>Object format</button>
    </div>
  );
}

function TopicFields({ draft, onChange }: { draft: TopicDraft; onChange: (draft: TopicDraft) => void }) {
  return (
    <>
      <Field label="Topic-এর নাম"><input required value={draft.label} onChange={(event) => onChange({ ...draft, label: event.target.value, slug: event.target.value.trim().toLowerCase().replace(/\s+/g, "-") })} className={inputClass} /></Field>
      <Field label="Slug"><input required value={draft.slug} onChange={(event) => onChange({ ...draft, slug: event.target.value })} className={inputClass} /></Field>
      <Field label="Description"><textarea rows={3} value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} className={`${inputClass} resize-y`} /></Field>
      <Field label="Search name"><input value={draft.searchName} onChange={(event) => onChange({ ...draft, searchName: event.target.value })} className={inputClass} /></Field>
      <Field label="Icon"><input type="file" accept="image/*" onChange={(event) => onChange({ ...draft, file: event.target.files?.[0] ?? null })} className={inputClass} /></Field>
      <Field label="Sort order"><input type="number" min="0" value={draft.sortOrder} onChange={(event) => onChange({ ...draft, sortOrder: event.target.value })} className={inputClass} /></Field>
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={draft.isActive} onChange={(event) => onChange({ ...draft, isActive: event.target.checked })} /> সক্রিয় Topic</label>
    </>
  );
}
