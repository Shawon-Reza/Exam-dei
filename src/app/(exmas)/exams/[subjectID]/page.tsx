"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTestsBySubject } from "@/src/apis/test/test.useHooks";
import TestCard, { type SubjectTest } from "../../components/TestCard";
import QuestionsComponent from "@/src/components/topics/QuestionsComponent";
import type { ExamSubject, ExamTopic } from "@/src/components/exams/exam-data";

const SubjectTestsPage = () => {
    const params = useParams<{ subjectID: string }>();
    const searchParams = useSearchParams();
    const subjectID = params.subjectID;
    const testID = searchParams.get("testID");
    const testsQuery = useTestsBySubject(subjectID);

    useEffect(() => {
        if (testsQuery.data) {
            console.log("Tests for subject:", testsQuery.data);
        }
    }, [testsQuery.data]);

    const tests: SubjectTest[] = Array.isArray(testsQuery.data)
        ? testsQuery.data
        : testsQuery.data?.data ?? [];

    if (testID) {
        const subject: Omit<ExamSubject, "icon"> & { icon?: ExamSubject["icon"] } = {
            id: subjectID,
            label: "বিষয়ভিত্তিক পরীক্ষা",
            englishLabel: "Subject test",
            description: "",
            questionCount: "—",
            icon: undefined,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
            topics: [],
        };
        const topic: ExamTopic = {
            id: subjectID,
            label: "বিষয়ভিত্তিক পরীক্ষা",
            subjectId: subjectID,
        };

        return <QuestionsComponent subject={subject} topic={topic} />;
    }

    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950 sm:py-14">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                        Subject tests
                    </p>
                    <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
                                আপনার পরীক্ষাগুলো
                            </h1>
                        
                        </div>
                        {!testsQuery.isLoading && (
                            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                                {tests.length}টি পরীক্ষা
                            </span>
                        )}
                    </div>
                </header>

                {testsQuery.isLoading ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700">
                        পরীক্ষা লোড হচ্ছে...
                    </div>
                ) : testsQuery.isError ? (
                    <div className="rounded-2xl border border-dashed border-rose-300 px-6 py-16 text-center text-sm text-rose-600 dark:border-rose-800 dark:text-rose-300">
                        পরীক্ষা লোড করা যায়নি। পরে আবার চেষ্টা করুন।
                    </div>
                ) : tests.length > 0 ? (
                    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="বিষয়ের পরীক্ষা">
                        {tests.map((test) => <TestCard key={test.id} test={test} />)}
                    </section>
                ) : (
                    <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700">
                        এই বিষয়ের কোনো পরীক্ষা পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </main>
    );
};

export default SubjectTestsPage;