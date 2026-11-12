"use client";

import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { AdminDialog, DialogActions, Field, inputClass } from "../../ui/AdminPrimitives";
import { useAddQuestionToTopic } from "@/src/apis/questions/question.useHooks";
import { toast } from "@/src/components/ui/toast";

export const initialQuestionsObject = `[
    {
      "question": "Who is known as the national poet of Bangladesh?",
      "banglaQuestion": "বাংলাদেশের জাতীয় কবি কে?",
      "options": [
        { "id": "a", "text": "Rabindranath Tagore" },
        { "id": "b", "text": "Kazi Nazrul Islam" },
        { "id": "c", "text": "Jasimuddin" },
        { "id": "d", "text": "Jibanananda Das" }
      ],
      "correctAnswer": "b",
      "explanation": "Kazi Nazrul Islam is the national poet of Bangladesh.",
      "banglaExplanation": "কাজী নজরুল ইসলাম বাংলাদেশের জাতীয় কবি।"
    }
]`;

export default function QuestionsDialog({
  subjectId,
  topicId,
  topicLabel,
  value,
  onChange,
  onClose,
}: {
  subjectId: string;
  topicId: string;
  topicLabel: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  const addQuestionMutation = useAddQuestionToTopic();

  async function submitQuestions(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Questions must be a non-empty JSON array.");
      }

      const payload = {
        subjectId,
        topicId,
        questions: parsed,
      };

      console.log("Questions payload:", payload);
      const response = await addQuestionMutation.mutateAsync(payload);

      toast.add({
        title: response?.message || "Questions added successfully",
        description: `${response?.data?.count ?? parsed.length} টি question যোগ হয়েছে`,
        type: "success",
      });
      onClose();
    } catch (error) {
      console.error("Failed to add questions:", error);
      toast.add({
        title: "Questions JSON সঠিক নয়",
        description: error instanceof Error ? error.message : "একটি valid JSON array দিন।",
        type: "error",
      });
    }
  }

  return (
    <AdminDialog title={`${topicLabel}-এ প্রশ্ন যোগ করুন`} onClose={onClose}>
      <form onSubmit={submitQuestions} className="space-y-4">
        <Field label="Questions array (JSON)">
          <textarea required rows={20} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} resize-y font-mono text-xs`} spellCheck={false} />
          <p className="mt-1 text-xs text-zinc-500">Subject ID: {subjectId} · Topic ID: {topicId}</p>
        </Field>
        <DialogActions onCancel={onClose} submitLabel={addQuestionMutation.isPending ? "সংরক্ষণ হচ্ছে..." : <><FiPlus aria-hidden="true" /> প্রশ্ন যোগ করুন</>} />
      </form>
    </AdminDialog>
  );
}
