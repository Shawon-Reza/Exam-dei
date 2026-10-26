"use client";

import { type FormEvent, useState } from "react";
import { FiExternalLink, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import type { PdfApiItem } from "../../../apis/pdfs/pdfs.api";
import { useCreatePdf, useDeletePdf, usePdfs } from "../../../apis/pdfs/pdfs.hooks";
import { toast } from "../../ui/toast";
import { DialogActions, Field, inputClass } from "../ui/AdminPrimitives";
import axios from "axios";

// ─── helpers ────────────────────────────────────────────────────────────────

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return error instanceof Error ? error.message : fallback;
}

function showError(title: string, error: unknown, fallback: string) {
  toast.add({ title, description: getErrorMessage(error, fallback), type: "error" });
}

// ─── empty draft ─────────────────────────────────────────────────────────────

type PdfFormDraft = {
  name: string;
  banglaName: string;
  description: string;
  url: string;
};

const emptyDraft: PdfFormDraft = {
  name: "",
  banglaName: "",
  description: "",
  url: "",
};

// ─── sub-components ──────────────────────────────────────────────────────────

function PdfListItem({
  pdf,
  onDelete,
  isDeleting,
}: {
  pdf: PdfApiItem;
  onDelete: (pdf: PdfApiItem) => void;
  isDeleting: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-800/30">
      {/* PDF icon */}
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
          {pdf.banglaName || pdf.name}
        </p>
        {pdf.banglaName && (
          <p className="truncate text-xs text-zinc-500">{pdf.name}</p>
        )}
        {pdf.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{pdf.description}</p>
        )}
        <a
          href={pdf.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
        >
          <FiExternalLink size={11} aria-hidden="true" />
          PDF খুলুন
        </a>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(pdf)}
        disabled={isDeleting}
        aria-label={`${pdf.name} মুছুন`}
        title="PDF মুছুন"
        className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40 dark:hover:bg-rose-950/40"
      >
        <FiTrash2 size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

function AddPdfForm({
  topicId,
  subjectId,
  onSuccess,
}: {
  topicId: string;
  subjectId: string;
  onSuccess: () => void;
}) {
  const [draft, setDraft] = useState<PdfFormDraft>(emptyDraft);
  const createPdf = useCreatePdf();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await createPdf.mutateAsync({
        name: draft.name.trim(),
        banglaName: draft.banglaName.trim(),
        description: draft.description.trim(),
        url: draft.url.trim(),
        topicId,
        subjectId,
      });

      toast.add({ title: "PDF যোগ হয়েছে", type: "success" });
      setDraft(emptyDraft);
      onSuccess();
    } catch (error) {
      showError("PDF যোগ করা যায়নি", error, "PDF যোগ করা যায়নি");
    }
  }

  const saving = createPdf.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Field label="Name (English)">
        <input
          required
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          className={inputClass}
          placeholder="Bangla Grammar Complete Notes"
        />
      </Field>
      <Field label="বাংলা নাম">
        <input
          required
          value={draft.banglaName}
          onChange={(e) => setDraft((d) => ({ ...d, banglaName: e.target.value }))}
          className={inputClass}
          placeholder="বাংলা ব্যাকরণের সম্পূর্ণ নোট"
        />
      </Field>
      <Field label="Description">
        <textarea
          required
          rows={2}
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          className={`${inputClass} resize-y`}
        />
      </Field>
      <Field label="PDF URL">
        <input
          required
          type="url"
          value={draft.url}
          onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
          className={inputClass}
          placeholder="https://example.com/file.pdf"
        />
      </Field>
      <DialogActions
        onCancel={() => setDraft(emptyDraft)}
        submitLabel={saving ? "যোগ হচ্ছে..." : <><FiPlus aria-hidden="true" /> PDF যোগ করুন</>}
      />
    </form>
  );
}

// ─── main modal ──────────────────────────────────────────────────────────────

export function TopicPdfsModal({
  topicId,
  subjectId,
  topicLabel,
  onClose,
}: {
  topicId: string;
  subjectId: string;
  topicLabel: string;
  onClose: () => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const pdfsQuery = usePdfs(topicId);
  const deletePdfMutation = useDeletePdf();

  const pdfs = pdfsQuery.data ?? [];

  async function handleDelete(pdf: PdfApiItem) {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `"${pdf.banglaName || pdf.name}" PDF-টি মুছে ফেলবেন?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePdfMutation.mutateAsync({ pdfId: pdf.id, topicId });
      toast.add({ title: "PDF মুছে ফেলা হয়েছে", type: "success" });
    } catch (error) {
      showError("PDF মুছে ফেলা যায়নি", error, "PDF মুছে ফেলা যায়নি");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 id="pdf-modal-title" className="text-lg font-extrabold text-zinc-900 dark:text-white">
              PDF সমূহ
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">{topicLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        {/* PDF list */}
        <div className="max-h-[50vh] overflow-y-auto p-5">
          {pdfsQuery.isLoading && (
            <p className="py-6 text-center text-sm text-zinc-500">PDF লোড হচ্ছে...</p>
          )}

          {!pdfsQuery.isLoading && pdfs.length === 0 && (
            <p className="py-6 text-center text-sm text-zinc-500">
              এই topic-এ এখনো কোনো PDF নেই।
            </p>
          )}

          {!pdfsQuery.isLoading && pdfs.length > 0 && (
            <div className="space-y-2">
              {pdfs.map((pdf) => (
                <PdfListItem
                  key={pdf.id}
                  pdf={pdf}
                  onDelete={handleDelete}
                  isDeleting={deletePdfMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer: Add PDF */}
        <div className="border-t border-zinc-100 dark:border-zinc-800">
          {showAddForm ? (
            <div className="p-5">
              <p className="mb-3 text-sm font-bold text-zinc-900 dark:text-white">নতুন PDF যোগ করুন</p>
              <AddPdfForm
                topicId={topicId}
                subjectId={subjectId}
                onSuccess={() => setShowAddForm(false)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-xs text-zinc-500">
                মোট {pdfs.length.toLocaleString("bn-BD")} টি PDF
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <FiPlus aria-hidden="true" /> নতুন PDF যোগ করুন
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
