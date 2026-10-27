"use client";

import { CircleHelp, ClipboardList, LoaderCircle, X } from "lucide-react";
import { useGetTestQuestions, useRemoveQuestionFromTest } from "@/src/apis/questions/question.useHooks";
import TestQuestionItem, { type AssignedQuestion } from "./TestQuestionItem";

// ── Types ─────────────────────────────────────────────────────────────────────

type SeeTestQuestionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    testId: string;
    testName: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SeeTestQuestionsModal({
    isOpen,
    onClose,
    testId,
    testName,
}: SeeTestQuestionsModalProps) {
    const questionsQuery = useGetTestQuestions(testId, isOpen && Boolean(testId));
    const removeMutation = useRemoveQuestionFromTest(testId);

    // API shape: { success, statusCode, message, data: AssignedQuestion[] }
    const questions: AssignedQuestion[] = questionsQuery.data?.data ?? [];

    const handleRemove = (questionId: string, testId: string) => {
        removeMutation.mutate(
            { testId, questionId },
            {
                onError: (error) => {
                    console.error("Failed to remove question:", error);
                },
            }
        );
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-3 backdrop-blur-sm sm:p-6"
            onClick={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="see-questions-title"
                className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Header ── */}
                <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
                    <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <ClipboardList size={21} />
                        </div>

                        <div>
                            <h2
                                id="see-questions-title"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Questions in Test
                            </h2>
                            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                {testName}
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

                {/* ── Summary bar ── */}
                <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-3 dark:border-gray-800 dark:bg-gray-900/50 sm:px-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Total questions:
                    </span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {questionsQuery.isPending ? "—" : questions.length}
                    </span>
                </div>

                {/* ── Body ── */}
                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                    {/* Loading */}
                    {questionsQuery.isPending && (
                        <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-gray-500">
                            <LoaderCircle size={26} className="animate-spin text-blue-600" />
                            Loading questions…
                        </div>
                    )}

                    {/* Error */}
                    {!questionsQuery.isPending && questionsQuery.isError && (
                        <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
                            <CircleHelp size={28} className="text-red-500" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Could not load questions.
                            </p>
                            <button
                                type="button"
                                onClick={() => questionsQuery.refetch()}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Empty */}
                    {!questionsQuery.isPending && !questionsQuery.isError && questions.length === 0 && (
                        <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
                            <CircleHelp size={30} className="text-gray-400" />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                No questions assigned yet
                            </p>
                            <p className="text-xs text-gray-500">
                                Use "Assign Questions" to add MCQs to this test.
                            </p>
                        </div>
                    )}

                    {/* Question list */}
                    {!questionsQuery.isPending && !questionsQuery.isError && questions.length > 0 && (
                        <div className="space-y-3">
                            {questions.map((entry, index) => (
                                <TestQuestionItem
                                    key={entry.id}
                                    entry={entry}
                                    index={index}
                                    onRemove={handleRemove}
                                    isRemoving={
                                        removeMutation.isPending &&
                                        removeMutation.variables?.questionId === entry.questionId
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <footer className="border-t border-gray-100 bg-white px-5 py-4 sm:px-6 dark:border-gray-800 dark:bg-gray-950">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Close
                    </button>
                </footer>
            </section>
        </div>
    );
}
