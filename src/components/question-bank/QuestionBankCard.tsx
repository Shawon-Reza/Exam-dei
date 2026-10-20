import { FiArrowUpRight, FiCalendar, FiLayers } from "react-icons/fi";
import type { QuestionBankItem } from "./question-bank-data";

type QuestionBankCardProps = {
  item: QuestionBankItem;
  onOpen: (item: QuestionBankItem) => void;
};

export default function QuestionBankCard({
  item,
  onOpen,
}: QuestionBankCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={`grid size-10 place-items-center rounded-xl ${item.color}`}>
          <FiLayers aria-hidden="true" className="size-5" />
        </span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {item.organizationLabel}
        </span>
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        {item.positionLabel}
      </p>
      <h3 className="mt-1 text-base font-extrabold text-zinc-950 dark:text-white">
        {item.title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <FiCalendar aria-hidden="true" />
          {item.year}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiLayers aria-hidden="true" />
          {item.questionCount} প্রশ্ন
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.subjects.map((subject) => (
          <span
            key={subject}
            className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {subject}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="mt-auto inline-flex min-h-10 items-center justify-center gap-2 pt-5 text-xs font-bold text-emerald-700 transition hover:text-emerald-500 dark:text-emerald-400"
      >
        প্রশ্নগুলো দেখুন
        <FiArrowUpRight aria-hidden="true" />
      </button>
    </article>
  );
}
