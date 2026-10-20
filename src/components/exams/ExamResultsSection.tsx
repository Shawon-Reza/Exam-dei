import { FiArrowRight, FiSearch } from "react-icons/fi";
import ExamCard from "./ExamCard";
import type { Exam } from "./exam-data";

export type StatusFilter = "all" | "live" | "upcoming" | "practice";

type ExamResultsSectionProps = {
  exams: Exam[];
  searchTerm: string;
  statusFilter: StatusFilter;
  statusFilters: { id: StatusFilter; label: string }[];
  selectedSubjectLabel?: string;
  selectedTopicLabel?: string;
  selectedCategoryLabel?: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (filter: StatusFilter) => void;
  onClearFilters: () => void;
  onStart: (exam: Exam) => void;
};

export default function ExamResultsSection({
  exams,
  searchTerm,
  statusFilter,
  statusFilters,
  selectedSubjectLabel,
  selectedTopicLabel,
  selectedCategoryLabel,
  onSearchChange,
  onStatusChange,
  onClearFilters,
  onStart,
}: ExamResultsSectionProps) {
  const hasFilters =
    Boolean(selectedSubjectLabel) ||
    Boolean(selectedCategoryLabel) ||
    Boolean(searchTerm);

  return (
    <div
      id="exam-results"
      className="scroll-mt-24 mt-9 border-t border-zinc-200 pt-7 dark:border-zinc-800"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Explore tests · practice smarter
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-zinc-950 dark:text-white">
            আপনার জন্য পরীক্ষা
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Demo data preview · backend যুক্ত হলে live exam ও schedule এখানে আপডেট হবে।
          </p>
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">পরীক্ষা খুঁজুন</span>
          <FiSearch aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="পরীক্ষার নাম লিখে খুঁজুন"
            className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={statusFilter === filter.id}
            onClick={() => onStatusChange(filter.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
              statusFilter === filter.id
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="shrink-0 px-2 text-xs font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300"
          >
            সব filter মুছুন
          </button>
        )}
      </div>

      <p className="mb-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        {exams.length}টি exam পাওয়া গেছে
        {selectedSubjectLabel && ` · ${selectedSubjectLabel}`}
        {selectedTopicLabel && ` · ${selectedTopicLabel}`}
        {selectedCategoryLabel && ` · ${selectedCategoryLabel}`}
      </p>

      {exams.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onStart={onStart} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <FiSearch aria-hidden="true" className="mx-auto size-7 text-zinc-400" />
          <h4 className="mt-4 font-bold text-zinc-900 dark:text-white">
            এই filter-এ কোনো exam পাওয়া যায়নি
          </h4>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            অন্য subject, category বা keyword দিয়ে খুঁজে দেখুন।
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400"
          >
            সব পরীক্ষা দেখুন
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
