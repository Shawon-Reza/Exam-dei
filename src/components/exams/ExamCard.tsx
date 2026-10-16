import { FiArrowUpRight, FiCalendar, FiClock, FiLayers, FiUsers } from "react-icons/fi";
import { statusLabels, type Exam } from "./exam-data";

type ExamCardProps = {
  exam: Exam;
  onStart: (exam: Exam) => void;
  compact?: boolean;
};

const statusStyles = {
  live: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  running: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  practice: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

export default function ExamCard({ exam, onStart, compact = false }: ExamCardProps) {
  const isUpcoming = exam.status === "upcoming";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/[0.02] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[exam.status]}`}>
          {exam.status === "live" && (
            <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-current align-middle" />
          )}
          {statusLabels[exam.status]}
        </span>
        {exam.featured && (
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            আজকের বাছাই
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {exam.subtitle}
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-zinc-950 dark:text-white">
          {exam.title}
        </h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <FiLayers aria-hidden="true" />
          {exam.questionCount} প্রশ্ন
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiClock aria-hidden="true" />
          {exam.durationMinutes} মিনিট
        </span>
        {!compact && (
          <span className="inline-flex items-center gap-1.5">
            <FiUsers aria-hidden="true" />
            {exam.participants} জন
          </span>
        )}
      </div>

      {(exam.startsAt || exam.endsAt) && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <FiCalendar aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          {isUpcoming ? `শুরু হবে ${exam.startsAt}` : `শেষ হবে ${exam.endsAt}`}
        </p>
      )}

      <button
        type="button"
        onClick={() => onStart(exam)}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-400"
      >
        {isUpcoming ? "পরীক্ষার বিস্তারিত" : "পরীক্ষা শুরু করুন"}
        <FiArrowUpRight aria-hidden="true" />
      </button>
    </article>
  );
}
