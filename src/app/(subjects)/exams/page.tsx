import type { Metadata } from "next";
import ExamDashboard from "../../../components/exams/ExamDashboard";

export const metadata: Metadata = {
  title: "পরীক্ষা খুঁজুন",
  description:
    "বিষয়, topic অথবা চাকরির category অনুযায়ী practice test, live exam ও scheduled exam বেছে নিন।",
};

export default function ExamsPage() {
  return <ExamDashboard />;
}
