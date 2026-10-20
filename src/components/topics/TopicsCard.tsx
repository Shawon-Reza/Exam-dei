import Link from "next/link";
import { FiArrowDown, FiArrowRight, FiArrowUp, FiBookOpen } from "react-icons/fi";
import type { ExamSubject } from "../exams/exam-data";

type TopicsCardProps = {
  subject: ExamSubject;
  isSelected: boolean;
  onSelect: (subjectId: string) => void;
};

export default function TopicsCard({
  subject,
  isSelected,
  onSelect,
}: TopicsCardProps) {
  const Icon = subject.icon;
  const subjectTopicsId = `subject-topics-${subject.id}`;
  const ExpandIcon = isSelected ? FiArrowUp : FiArrowDown;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 dark:bg-zinc-900 ${
        isSelected
          ? "border-emerald-400 shadow-lg shadow-emerald-950/[0.06] dark:border-emerald-700"
          : "border-zinc-200/80 shadow-zinc-950/[0.03] hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/[0.08] dark:border-zinc-800 dark:hover:border-emerald-800"
      }`}
    >
      <button
        type="button"
        aria-expanded={isSelected}
        aria-controls={isSelected ? subjectTopicsId : undefined}
        onClick={() => onSelect(subject.id)}
        className="flex w-full flex-col p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-500 sm:p-5"
      >
        <span className="flex w-full items-center justify-between gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${subject.color}`}>
            <Icon aria-hidden="true" className="size-[18px]" />
          </span>
          <span className="rounded-full bg-zinc-100/80 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {subject.topics.length}টি topic
          </span>
        </span>

        <span className="mt-3 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
          {subject.label}
        </span>
        <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {subject.description}
        </span>

        <span
          className={`mt-4 flex w-full items-center justify-between border-t pt-3 text-xs font-bold ${
            isSelected
              ? "border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-300"
              : "border-zinc-100 text-emerald-700 dark:border-zinc-800 dark:text-emerald-400"
          }`}
        >
          {isSelected ? "Topic তালিকা লুকান" : "সব topic দেখুন"}
          <ExpandIcon aria-hidden="true" className="size-4" />
        </span>
      </button>

      {isSelected && (
        <div
          id={subjectTopicsId}
          className="flex-1 border-t border-emerald-100 bg-emerald-50/40 p-3 dark:border-emerald-950 dark:bg-emerald-950/15 sm:p-4"
        >
          <p className="mb-2 px-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
            অনুশীলনের জন্য topic বেছে নিন
          </p>
          <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {subject.topics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/topics/${encodeURIComponent(topic.id)}?subject=${encodeURIComponent(subject.id)}`}
                  className="group/topic flex min-h-10 items-center justify-between gap-2 rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:text-emerald-300"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FiBookOpen
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="truncate">{topic.label}</span>
                  </span>
                  <FiArrowRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-zinc-400 transition group-hover/topic:translate-x-0.5 group-hover/topic:text-emerald-600 dark:group-hover/topic:text-emerald-400"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
