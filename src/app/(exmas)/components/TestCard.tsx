import Link from "next/link";
import { FiArrowUpRight, FiClock, FiLayers, FiPlay, FiUsers } from "react-icons/fi";
import type { TestStatus, TestType } from "@/src/apis/test/test.api";

export type SubjectTest = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    duration: number;
    totalQuestions: number;
    isActive: boolean;
    status: TestStatus;
    type: TestType;
    subjectId?: string | null;
    createdAt: string;
    _count?: {
        testQuestions?: number;
    };
};

type TestCardProps = {
    test: SubjectTest;
};

const statusContent = {
    LIVE: {
        label: "LIVE",
        className: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    },
    UPCOMING: {
        label: "UPCOMING",
        className: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    PRACTICE: {
        label: "PRACTICE",
        className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
} as const;

export default function TestCard({ test }: TestCardProps) {
    const status = statusContent[test.status];
    const isAvailable = test.isActive && test.status !== "UPCOMING";

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/[0.08] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800">
            <div className={`absolute inset-x-0 top-0 h-0.5 ${test.status === "LIVE" ? "bg-rose-500" : test.status === "UPCOMING" ? "bg-blue-500" : "bg-emerald-500"}`} />

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${status.className}`}>
                        {test.status === "LIVE" && <span className="size-1.5 animate-pulse rounded-full bg-current" />}
                        {status.label}
                    </span>
                    <span className="rounded-full border border-zinc-200 px-2 py-1 text-[9px] font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        {test.type === "TOPIC" ? "Topic test" : test.type === "SUBJECT" ? "Subject test" : "Category test"}
                    </span>
                </div>

                <div className="mt-4">
                    <h2 className="line-clamp-1 text-lg font-black tracking-tight text-zinc-950 dark:text-white">
                        {test.name}
                    </h2>
                    <p className="mt-1.5 line-clamp-1 min-h-5 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {test.description || "এই পরীক্ষার জন্য কোনো বিবরণ দেওয়া হয়নি।"}
                    </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-1 border-y border-zinc-100 py-3 dark:border-zinc-800">
                    <div className="text-center">
                        <strong className="block text-base font-black text-zinc-900 dark:text-white">{test.totalQuestions}</strong>
                        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500"><FiLayers aria-hidden="true" /> প্রশ্ন</span>
                    </div>
                    <div className="border-x border-zinc-100 text-center dark:border-zinc-800">
                        <strong className="block text-base font-black text-zinc-900 dark:text-white">{test.duration}</strong>
                        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500"><FiClock aria-hidden="true" /> মিনিট</span>
                    </div>
                    <div className="text-center">
                        <strong className="block text-base font-black text-zinc-900 dark:text-white">{test._count?.testQuestions ?? 0}</strong>
                        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500"><FiUsers aria-hidden="true" /> যুক্ত</span>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    {isAvailable ? (
                        <Link
                            href={test.subjectId
                                ? `/exams/${test.subjectId}?testID=${encodeURIComponent(test.id)}`
                                : `/exams?testID=${encodeURIComponent(test.id)}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-400"
                        >
                            <FiPlay aria-hidden="true" className="size-4" />
                            পরীক্ষা শুরু করুন
                            <FiArrowUpRight aria-hidden="true" className="ml-auto transition group-hover:translate-x-0.5" />
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-200 px-3 py-2.5 text-xs font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
                        >
                            <FiPlay aria-hidden="true" className="size-4" />
                            শীঘ্রই শুরু হবে
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
