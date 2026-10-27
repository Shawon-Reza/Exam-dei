"use client";

import { Loader2, Trash2 } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

export type AssignedQuestionOption = {
    text: string;
    isCorrect: boolean;
};

export type AssignedQuestion = {
    /** The join-table row id */
    id: string;
    marks: number;
    testId: string;
    questionId: string;
    question: {
        id: string;
        question: string;
        type: string;
        difficulty: number;
        explanation?: string;
        options: AssignedQuestionOption[];
    };
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const DIFFICULTY_LABELS: Record<number, { label: string; color: string }> = {
    1: { label: "Easy",   color: "bg-green-50  text-green-700  dark:bg-green-950/40  dark:text-green-400"  },
    2: { label: "Easy",   color: "bg-green-50  text-green-700  dark:bg-green-950/40  dark:text-green-400"  },
    3: { label: "Medium", color: "bg-amber-50  text-amber-700  dark:bg-amber-950/40  dark:text-amber-400"  },
    4: { label: "Hard",   color: "bg-red-50    text-red-700    dark:bg-red-950/40    dark:text-red-400"    },
    5: { label: "Hard",   color: "bg-red-50    text-red-700    dark:bg-red-950/40    dark:text-red-400"    },
};

// ── Component ─────────────────────────────────────────────────────────────────

type TestQuestionItemProps = {
    entry: AssignedQuestion;
    index: number;
    isRemoving?: boolean;
    onRemove: (questionId: string, testId: string) => void;
};

export default function TestQuestionItem({
    entry,
    index,
    isRemoving = false,
    onRemove,
}: TestQuestionItemProps) {
    const { question, testId, questionId } = entry;
    const difficulty = DIFFICULTY_LABELS[question.difficulty] ?? {
        label: `Level ${question.difficulty}`,
        color: "bg-gray-100 text-gray-600",
    };

    return (
        <article className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            {/* Question header */}
            <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                    {/* Meta badges */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold tracking-wide text-gray-400">
                            Q{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            MCQ
                        </span>
                        <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${difficulty.color}`}>
                            {difficulty.label}
                        </span>
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {entry.marks} mark{entry.marks !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {question.question}
                    </p>
                </div>

                {/* Remove button */}
                <button
                    type="button"
                    onClick={() => onRemove(questionId, testId)}
                    disabled={isRemoving}
                    title={isRemoving ? "Removing…" : "Remove question from test"}
                    aria-label="Remove question from test"
                    className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                >
                    {isRemoving
                        ? <Loader2 size={16} className="animate-spin" />
                        : <Trash2 size={16} />}
                </button>
            </div>

            {/* Options grid */}
            {question.options.length > 0 && (
                <div className="grid gap-2 border-t border-gray-100 p-4 pt-3 sm:grid-cols-2 dark:border-gray-800">
                    {question.options.map((option, optionIndex) => (
                        <div
                            key={`${questionId}-opt-${optionIndex}`}
                            className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs leading-5 ${
                                option.isCorrect
                                    ? "bg-green-50 text-green-800 ring-1 ring-inset ring-green-200 dark:bg-green-950/30 dark:text-green-300 dark:ring-green-900"
                                    : "bg-gray-50 text-gray-600 dark:bg-gray-800/70 dark:text-gray-300"
                            }`}
                        >
                            <span className="font-semibold text-gray-400">
                                {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </article>
    );
}
