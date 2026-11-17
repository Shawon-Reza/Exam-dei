"use client";

import { useSearchParams } from "next/navigation";
import QuestionsComponent from "@/src/components/topics/QuestionsComponent";
import type { ExamSubject, ExamTopic } from "@/src/components/exams/exam-data";
import ExamsDashboard from "../components/ExamsDashboard";

const genericSubject: Omit<ExamSubject, "icon"> & { icon?: ExamSubject["icon"] } = {
    id: "exam",
    label: "পরীক্ষা",
    englishLabel: "Exam",
    description: "",
    questionCount: "—",
    icon: undefined,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    topics: [],
};

const genericTopic: ExamTopic = {
    id: "exam",
    label: "পরীক্ষা",
    subjectId: "exam",
};

export default function ExamEntryPage() {
    const searchParams = useSearchParams();

    if (searchParams.get("testID")) {
        return <QuestionsComponent subject={genericSubject} topic={genericTopic} />;
    }

    return <ExamsDashboard />;
}
