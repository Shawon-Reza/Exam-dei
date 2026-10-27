
"use client";

import { Check } from "lucide-react";

export type QuestionOption = {
    text: string;
    isCorrect: boolean;
};

export type Question = {
    id: string;
    question: string;
    type: string;
    difficulty: number;
    options: QuestionOption[];
};

type QuestionSelectionItemProps = {
    question: Question;
    index: number;
    isSelected: boolean;
    onToggle: (id: string) => void;
};

const difficultyLabels: Record<number, string> = {
    1: "Easy",
    2: "Easy",
    3: "Medium",
    4: "Hard",
    5: "Hard",
};

export default function QuestionSelectionItem({
    question,
    index,
    isSelected,
    onToggle,
}: QuestionSelectionItemProps) {
    return (
        <label
            className={`block cursor-pointer rounded-xl border p-4 transition-colors ${isSelected
                    ? "border-teal-500 bg-teal-50/70 dark:bg-teal-950/20"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                }`}
        >
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(question.id)}
                    className="mt-1 size-4 shrink-0 cursor-pointer accent-teal-600"
                    aria-label={`Select question ${index + 1}`}
                />

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">
                            QUESTION {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            MCQ
                        </span>

                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {difficultyLabels[question.difficulty] ??
                                `Level ${question.difficulty}`}
                        </span>

                        {isSelected && (
                            <span className="ml-auto flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400">
                                <Check size={14} />
                                Selected
                            </span>
                        )}
                    </div>

                    <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {question.question}
                    </p>

                    {question.options?.length > 0 && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {question.options.map((option, optionIndex) => (
                                <div
                                    key={`${question.id}-${optionIndex}`}
                                    className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-600 dark:bg-gray-800/70 dark:text-gray-300"
                                >
                                    <span className="font-semibold text-gray-400">
                                        {String.fromCharCode(65 + optionIndex)}.
                                    </span>
                                    <span>{option.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </label>
    );
}
