import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import type { ExamSubject } from "../exams/exam-data";

type TopicsCardProps = {
  subject: ExamSubject;
  isLoading?: boolean;
  onSelect: (subjectId: string) => void;
};

export default function TopicsCard({
  subject,
  isLoading = false,
  onSelect,
}: TopicsCardProps) {
  const Icon = subject.icon;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-950/[0.03] transition duration-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/[0.08] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800"
    >
      <button
        type="button"
        onClick={() => onSelect(subject.id)}
        className="flex w-full flex-col p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-500 sm:p-5"
      >
        <span className="flex w-full items-center justify-between gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${subject.color}`}>
            {subject.iconUrl ? <Image src={subject.iconUrl} alt="" width={40} height={40} className="size-full rounded-xl object-cover" /> : <Icon aria-hidden="true" className="size-[18px]" />}
          </span>
          <span className="rounded-full bg-zinc-100/80 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {isLoading ? "লোড হচ্ছে..." : `${subject.topics.length}টি topic`}
          </span>
        </span>

        <span className="mt-3 text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
          {subject.label}
        </span>
        <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {subject.description}
        </span>

        <span className="mt-4 flex w-full items-center justify-between border-t border-zinc-100 pt-3 text-xs font-bold text-emerald-700 dark:border-zinc-800 dark:text-emerald-400">
          সব topic দেখুন
          <FiArrowRight aria-hidden="true" className="size-4" />
        </span>
      </button>
    </article>
  );
}
