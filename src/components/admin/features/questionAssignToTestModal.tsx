"use client";

import { useState } from "react";
import { ClipboardList, Plus, X } from "lucide-react";
import { useAssignQuestionsToTest } from "@/src/apis/questions/question.useHooks";

type AssignQuestionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    testName: string;
    testId: string;
};

const questionExample = `
[
  {
    "question": "When did Bangladesh achieve independence?",
    "banglaQuestion": "বাংলাদেশ কত সালে স্বাধীনতা অর্জন করে?",
    "options": [
      { "id": "a", "text": "1947" },
      { "id": "b", "text": "1952" },
      { "id": "c", "text": "1971" },
      { "id": "d", "text": "1975" }
    ],
    "correctAnswer": "c",
    "explanation": "Bangladesh achieved independence in 1971.",
    "banglaExplanation": "বাংলাদেশ ১৯৭১ সালে স্বাধীনতা অর্জন করে।"
  }
]
  `;

export default function AssignQuestionsModal({
    isOpen,
    onClose,
    testName,
    testId,
}: AssignQuestionsModalProps) {
    const [questions, setQuestions] = useState(questionExample);
    const [error, setError] = useState("");
    const assignMutation = useAssignQuestionsToTest(testId);

    if (!isOpen) return null;

    const handleAssign = async () => {
        setError("");

        try {
            const questionList = JSON.parse(questions);
            const data = {
                testId,
                questions: questionList,
            };

            console.log("Assign questions:", data);
            await assignMutation.mutateAsync(data);
        } catch (error) {
            console.error("Failed to assign questions:", error);
            setError(
                error instanceof SyntaxError
                    ? "Invalid JSON. Please use double quotes and remove trailing commas."
                    : "Failed to assign questions. Please try again."
            );
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-3 backdrop-blur-sm sm:p-6"
            onClick={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="assign-modal-title"
                className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
                            <ClipboardList size={21} />
                        </div>
                        <div>
                            <h2
                                id="assign-modal-title"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Assign Questions
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Add one or more questions as a JSON array.
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                                Test: {testName}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <X size={19} />
                    </button>
                </header>

                <div className="p-5 sm:p-6">
                    <label
                        htmlFor="questions-json"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Questions JSON
                    </label>
                    <textarea
                        id="questions-json"
                        value={questions}
                        onChange={(event) => setQuestions(event.target.value)}
                        rows={20}
                        className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 outline-none focus:border-teal-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}
                </div>

                <footer className="flex justify-end gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleAssign}
                        disabled={assignMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Plus size={17} />
                        {assignMutation.isPending ? "Assigning..." : "Assign Questions"}
                    </button>
                </footer>
            </section>
        </div>
    );
}
