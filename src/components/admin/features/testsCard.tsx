
"use client";

import { useDeleteTestByID } from "@/src/apis/test/test.useHooks";
import {
    Clock3,
    CalendarDays,
    ListChecks,
    Eye,
    CirclePlus,
    ArrowUpRight,
    Pencil,
} from "lucide-react";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import AssignQuestionsModal from "./questionAssignToTestModal";
import SeeTestQuestionsModal from "./SeeTestQuestionsModal";
import UpdateTestModal from "./UpdateTestModal";

type TestData = {
    id?: string;
    _id?: string;
    name: string;
    slug: string;
    description?: string | null;
    duration: number;
    isActive: boolean;
    totalQuestions: number;
    createdAt: string;
    topicId: string;
    subjectId: string;
    _count?: {
        testQuestions: number;
    };
};

type TestsCardProps = {
    data: TestData;
    subjectId: string;
    topicId: string;
};

const TestsCard = ({ data, subjectId, topicId }: TestsCardProps) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isSeeModalOpen, setIsSeeModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const testDeleteMutation = useDeleteTestByID();

    const {
        name,
        slug,
        description,
        duration,
        totalQuestions,
        isActive,
        createdAt,
        id,
        _count,
    } = data;

    const formattedDate = createdAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(createdAt))
        : "N/A";

    const handleAssignQuestions = () => {
        console.log("Assign questions to test:", data);
    };

    const handleSeeQuestions = () => {
        setIsSeeModalOpen(true);
    };

    const handleUpdateTest = () => {
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (id: string) => {
        console.log("Delete test:", id);

        testDeleteMutation.mutateAsync(id);
    }

    return (
        <article className="group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-all duration-200 hover:border-blue-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col gap-3 p-3 sm:p-3.5 lg:flex-row lg:items-center lg:justify-between">
                {/* Main information */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2.5">
                        {/* Icon */}
                        <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400">
                            <ListChecks size={18} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0 flex-1">
                            {/* Title and status */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                <h3 className="text-sm font-semibold leading-5 text-gray-900 dark:text-white">
                                    {name}
                                </h3>

                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${isActive
                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15 dark:bg-emerald-950/50 dark:text-emerald-400"
                                        : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                >
                                    <span
                                        className={`size-1.5 rounded-full ${isActive
                                            ? "bg-emerald-500"
                                            : "bg-gray-400"
                                            }`}
                                    />
                                    {isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-gray-500 dark:text-gray-400">
                                {description ||
                                    "No description available for this test."}
                            </p>

                            {/* Metadata */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                    <Clock3
                                        size={13}
                                        className="text-blue-600 dark:text-blue-400"
                                    />
                                    <span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {duration}
                                        </span>{" "}
                                        min
                                    </span>
                                </div>

                                <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                    <ListChecks
                                        size={13}
                                        className="text-teal-600 dark:text-teal-400"
                                    />
                                    <span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {totalQuestions}
                                        </span>{" "}
                                        questions
                                    </span>
                                </div>

                                <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <CalendarDays size={13} />
                                    <span>{formattedDate}</span>
                                </div>

                                {/* Assigned questions count from _count */}
                                <div className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/15 dark:bg-teal-950/40 dark:text-teal-400 dark:ring-teal-500/20">
                                    <span className="font-bold">{_count?.testQuestions ?? 0}</span>
                                    <span className="font-normal">assigned</span>
                                </div>
                            </div>

                            {/* Slug */}
                            <p className="mt-1.5 truncate text-[10px] text-gray-400 dark:text-gray-500">
                                Slug: {slug}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2 border-t border-gray-100  sm:flex-row lg:w-56 lg:flex-col lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0 dark:border-gray-800">
                    <button
                        onClick={() => handleDelete(id as string)}
                        className="flex self-end cursor-pointer hover:scale-110"
                        aria-label="Delete test"
                    >
                        <FaDeleteLeft size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={handleUpdateTest}
                        className="inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                        aria-label="Update test"
                    >
                        <Pencil size={14} />
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsAssignModalOpen(true)}
                        className="inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        <CirclePlus size={14} />
                        Assign Questions
                        <ArrowUpRight size={12} className="ml-auto opacity-70" />
                    </button>

                    <button
                        type="button"
                        onClick={handleSeeQuestions}
                        className="inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                    >
                        <Eye size={14} />
                        See Questions
                    </button>
                </div>
            </div>

            <AssignQuestionsModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                testName={name}
                testId={id as string}
                subjectId={subjectId}
                topicId={topicId}
            />

            <SeeTestQuestionsModal
                isOpen={isSeeModalOpen}
                onClose={() => setIsSeeModalOpen(false)}
                testId={id as string}
                testName={name}
            />

            <UpdateTestModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                testData={data}
            />
        </article>
    );
};

export default TestsCard;
