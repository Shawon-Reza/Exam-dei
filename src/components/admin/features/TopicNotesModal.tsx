"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Save, Edit2, Plus } from "lucide-react";
import { RichTextEditor } from "../../blogs/RichTextEditor";
import type { ExamTopic } from "../../exams/exam-data";
import type { JSONContent } from "@tiptap/react";
import { useGetNoteByTopicId, useCreateNote, useUpdateNote } from "@/src/apis/notes/notes.hooks";
import type { NoteContent } from "@/src/apis/notes/notes.api";

type TopicNotesModalProps = {
  topic: ExamTopic;
  subjectId: string;
  onClose: () => void;
};

export default function TopicNotesModal({
  topic,
  subjectId,
  onClose,
}: TopicNotesModalProps) {
  const [content, setContent] = useState<JSONContent>({ type: "doc", content: [{ type: "paragraph" }] });
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: existingNote, isLoading: isFetching, refetch } = useGetNoteByTopicId(topic.id);
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();

  useEffect(() => {
    if (existingNote?.content) {
      setIsEditing(true);
      setContent(existingNote.content as JSONContent);
      setTextContent(existingNote.textContent ?? "");
    } else {
      setIsEditing(false);
      setContent({ type: "doc", content: [{ type: "paragraph" }] });
      setTextContent("");
    }
  }, [existingNote]);

  function handleContentChange(newContent: JSONContent, newText: string) {
    setContent(newContent);
    setTextContent(newText);
  }

  function handleError(err: string) {
    setError(err);
  }

  async function handleSave() {
    if (!textContent.trim()) {
      setError("নোটের কন্টেন্ট লিখুন।");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        topicId: topic.id,
        topicName: topic.label,
        subjectId,
        content: content as NoteContent,
        textContent,
      };

      if (isEditing) {
        await updateNoteMutation.mutateAsync(payload);
        console.log("Note updated successfully:", payload);
      } else {
        await createNoteMutation.mutateAsync(payload);
        console.log("Note created successfully:", payload);
      }

      onClose();
    } catch (err) {
      console.error(isEditing ? "Failed to update note:" : "Failed to create note:", err);
      setError(isEditing ? "নোট আপডেট করা যায়নি।" : "নোট তৈরি করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="topic-notes-title"
        className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
          <div>
            <h2
              id="topic-notes-title"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {isEditing ? "নোট সম্পাদনা করুন" : "নোট যোগ করুন"}: {topic.label}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              টেক্সট কপি করে পেস্ট করুন - ফরম্যাটিং সংরক্ষিত থাকবে
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Loading while fetching */}
        {isFetching && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-purple-600" />
          </div>
        )}

        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-5">
          <RichTextEditor
            content={content}
            onContentChange={handleContentChange}
            onError={handleError}
            className="max-h-[60vh]"
          />
          {error && (
            <p role="alert" className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              {error}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 p-5 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            বাতিল
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading || isFetching}
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : isEditing ? (
              <Edit2 size={17} />
            ) : (
              <Plus size={17} />
            )}
            {loading
              ? "সংরক্ষণ হচ্ছে..."
              : isEditing
                ? "নোট আপডেট করুন"
                : "নোট সংরক্ষণ করুন"}
          </button>
        </div>
      </section>
    </div>
  );
}