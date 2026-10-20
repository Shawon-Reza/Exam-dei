import { FiCalendar } from "react-icons/fi";
import ExamCard from "./ExamCard";
import type { Exam } from "./exam-data";

type ExamHighlightsProps = {
  activeExams: Exam[];
  scheduledExams: Exam[];
  onStart: (exam: Exam) => void;
};

export default function ExamHighlights({
  activeExams,
  scheduledExams,
  onStart,
}: ExamHighlightsProps) {
  return (
    <>
      <section
        id="live-exams"
        className="scroll-mt-24 border-y border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
                Live now · এখনই পরীক্ষা দিন
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
                চলমান পরীক্ষা
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="size-2 animate-pulse rounded-full bg-rose-500" />
              {activeExams.length}টি exam চলছে
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {activeExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} compact onStart={onStart} />
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Plan ahead · সময় ধরে প্রস্তুতি নিন
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
                আসন্ন schedule
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <FiCalendar aria-hidden="true" className="text-blue-500" />
              {scheduledExams.length}টি নির্ধারিত exam
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {scheduledExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} compact onStart={onStart} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
