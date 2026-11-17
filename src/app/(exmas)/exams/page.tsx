
import { Suspense } from "react";
import ExamsDashboard from "../components/ExamsDashboard";
import ExamEntryPage from "./ExamEntryPage";

export default function ExamsPage() {
  return (
    <Suspense fallback={<ExamsDashboard />}>
      <ExamEntryPage />
    </Suspense>
  );
}