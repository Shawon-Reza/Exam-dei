import { FiCheck } from "react-icons/fi";
import type { ExamCategory } from "./exam-data";

type ExamCategoryBrowserProps = {
  categories: ExamCategory[];
  selectedCategoryId: string | null;
  onSelect: (categoryId: string) => void;
};

export default function ExamCategoryBrowser({
  categories,
  selectedCategoryId,
  onSelect,
}: ExamCategoryBrowserProps) {
  return (
    <div>
      <div className="mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          Filter by job category
        </p>
        <h3 className="mt-1 text-base font-bold text-zinc-950 dark:text-white sm:text-lg">
          চাকরির category নির্বাচন করুন
        </h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          আপনার কাঙ্ক্ষিত নিয়োগ পরীক্ষার জন্য সাজানো exam দেখুন।
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategoryId === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(category.id)}
              className={`flex items-center gap-4 rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 ${
                isSelected
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${category.color}`}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-zinc-950 dark:text-white">
                  {category.label}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium text-zinc-400">
                  {category.englishLabel}
                </span>
                <span className="mt-2 block text-xs text-zinc-500 dark:text-zinc-400">
                  {category.description}
                </span>
              </span>
              {isSelected && <FiCheck aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
