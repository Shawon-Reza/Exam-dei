
"use client";

import { CheckCheck, CircleHelp, LoaderCircle } from "lucide-react";
import QuestionSelectionItem, {
    type Question,
} from "./QuestionSelectionItem";

type QuestionListProps = {
    questions: Question[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    onToggleAll: () => void;
    isLoading: boolean;
    isError: boolean;
    onRetry: () => void;
};

export default function QuestionList({
    questions,
    selectedIds,
    onToggle,
    onToggleAll,
    isLoading,
    isError,
    onRetry,
}: QuestionListProps) {
    const allSelected =
        questions.length > 0 &&
        questions.every((question) => selectedIds.includes(question.id));

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3 dark:border-gray-800">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Available questions
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                        {questions.length} MCQ questions found
                    </p>
                </div>

                {questions.length > 0 && !isLoading && !isError && (
                    <button
                        type="button"
                        onClick={onToggleAll}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/40"
                    >
                        <CheckCheck size={15} />
                        {allSelected ? "Deselect all" : "Select all"}
                    </button>
                )}
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
                {isLoading && (
                    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-gray-500">
                        <LoaderCircle
                            size={26}
                            className="animate-spin text-teal-600"
                        />
                        Loading questions...
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
                        <CircleHelp size={28} className="text-red-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Could not load questions.
                        </p>
                        <button
                            type="button"
                            onClick={onRetry}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!isLoading && !isError && questions.length === 0 && (
                    <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
                        <CircleHelp
                            size={30}
                            className="text-gray-400"
                        />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            No MCQ questions found
                        </p>
                        <p className="text-xs text-gray-500">
                            Try selecting another topic.
                        </p>
                    </div>
                )}

                <div className="grid xl:grid-cols-2 gap-3">
                    {!isLoading &&
                        !isError &&
                        questions.map((question, index) => (
                            <QuestionSelectionItem
                                key={question.id}
                                question={question}
                                index={index}
                                isSelected={selectedIds.includes(question.id)}
                                onToggle={onToggle}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
