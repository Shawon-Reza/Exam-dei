
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Check,
    ClipboardList,
    LoaderCircle,
    Plus,
    X,
} from "lucide-react";

import { useAssignQuestionsToTest, useGetTopicQuestions } from "@/src/apis/questions/question.useHooks";
import { toast } from "@/src/components/ui/toast";
import QuestionList from "./QuestionList";
import type { Question } from "./QuestionSelectionItem";

type AssignQuestionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    testName: string;
    testId: string;
    subjectId: string;
    topicId: string;
};

export default function AssignQuestionsModal({
    isOpen,
    onClose,
    testName,
    testId,
    subjectId,
    topicId,
}: AssignQuestionsModalProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const assignMutation = useAssignQuestionsToTest(testId);

    const params = useMemo(() => {
        const searchParams = new URLSearchParams();

        searchParams.set("subjectID", subjectId);
        searchParams.set("topicID", topicId);
        searchParams.set("numberOfQuestion", "");
        searchParams.set("difficulty", "");
        searchParams.set("search", "");

        return searchParams.toString();
    }, [subjectId, topicId]);

    const questionsQuery = useGetTopicQuestions(
        params,
        isOpen && Boolean(subjectId) && Boolean(topicId)
    );

    // API response format: { success, statusCode, message, data: [...] }
    const questions: Question[] = (
        questionsQuery.data?.data ?? []
    ).filter((question: Question) => question.type === "MCQ");

    // Clear selection when the modal opens for a different test/topic.
    useEffect(() => {
        if (isOpen) {
            setSelectedIds([]);
        }
    }, [isOpen, testId, topicId]);

    if (!isOpen) return null;

    const handleToggleQuestion = (id: string) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((questionId) => questionId !== id)
                : [...current, id]
        );
    };

    const handleToggleAll = () => {
        const allSelected =
            questions.length > 0 &&
            questions.every((question) => selectedIds.includes(question.id));

        if (allSelected) {
            const visibleIds = new Set(questions.map((question) => question.id));

            setSelectedIds((current) =>
                current.filter((id) => !visibleIds.has(id))
            );
        } else {
            setSelectedIds((current) => [
                ...new Set([
                    ...current,
                    ...questions.map((question) => question.id),
                ]),
            ]);
        }
    };

    const handleAddQuestions = async () => {
        setSubmitError(null);
        try {
            const result = await assignMutation.mutateAsync({
                topicId,
                testId,
                questionIds: selectedIds,
            });

            const { addedCount, skippedCount, remainingCapacity, skippedQuestions } = result.data;

            const alreadyAssigned = skippedQuestions?.filter(
                (q: { reason: string }) => q.reason === "already_assigned"
            ).length ?? 0;

            const limitReached = skippedQuestions?.filter(
                (q: { reason: string }) => q.reason === "test_limit_reached"
            ).length ?? 0;

            if (addedCount > 0 && skippedCount === 0) {
                // All selected questions were added successfully
                toast.add({
                    title: "Questions assigned",
                    description: `${addedCount} question${addedCount === 1 ? "" : "s"} added to "${testName}" successfully.`,
                    type: "success",
                });
            } else if (addedCount > 0 && skippedCount > 0) {
                // Partial success
                const reasons: string[] = [];
                if (alreadyAssigned > 0) reasons.push(`${alreadyAssigned} already assigned`);
                if (limitReached > 0) reasons.push(`${limitReached} exceeded test limit`);
                toast.add({
                    title: `${addedCount} added, ${skippedCount} skipped`,
                    description: `${reasons.join(" · ")}. Remaining capacity: ${remainingCapacity}.`,
                    type: "warning",
                });
            } else if (addedCount === 0) {
                // Nothing was added
                const reasons: string[] = [];
                if (alreadyAssigned > 0) reasons.push(`${alreadyAssigned} already assigned`);
                if (limitReached > 0) reasons.push(`test limit reached (capacity: ${remainingCapacity})`);
                toast.add({
                    title: "No questions added",
                    description: reasons.join(" · ") || "All selected questions were skipped.",
                    type: "warning",
                });
            }

            onClose();
        } catch (error) {
            console.error("Failed to assign questions:", error);
            setSubmitError("Failed to assign questions. Please try again.");
            toast.add({
                title: "Assignment failed",
                description: "Could not assign questions. Please try again.",
                type: "error",
            });
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
                className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
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
                                Select MCQs to add to this test.
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

                {/* Selection summary */}
                <div className="flex items-center justify-between gap-3 bg-gray-50/80 px-5 py-3 dark:bg-gray-900/70 sm:px-6">
                    <div>
                        <p className="text-xs text-gray-500">
                            Questions selected
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                            {selectedIds.length} selected
                        </p>
                    </div>

                    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-400">
                        {questions.length} available
                    </span>
                </div>

                {/* Question list */}
                <QuestionList
                    questions={questions}
                    selectedIds={selectedIds}
                    onToggle={handleToggleQuestion}
                    onToggleAll={handleToggleAll}
                    isLoading={questionsQuery.isPending}
                    isError={questionsQuery.isError}
                    onRetry={() => questionsQuery.refetch()}
                />

                {/* Footer */}
                <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-500">
                            {selectedIds.length > 0
                                ? `${selectedIds.length} question${selectedIds.length === 1 ? "" : "s"} selected`
                                : "Select at least one question to continue."}
                        </p>
                        {submitError && (
                            <p className="text-xs font-medium text-red-600 dark:text-red-400">
                                {submitError}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={assignMutation.isPending}
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleAddQuestions}
                            disabled={
                                selectedIds.length === 0 ||
                                questionsQuery.isPending ||
                                questionsQuery.isError ||
                                assignMutation.isPending
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {assignMutation.isPending ? (
                                <LoaderCircle size={17} className="animate-spin" />
                            ) : (
                                <Plus size={17} />
                            )}
                            {assignMutation.isPending
                                ? "Assigning…"
                                : `Add Questions (${selectedIds.length})`}
                        </button>
                    </div>
                </footer>
            </section>
        </div>
    );
}
