import { FiBookOpen, FiTarget } from "react-icons/fi";

export type BrowseMode = "subject" | "category";

type ExamBrowseModeTabsProps = {
  mode: BrowseMode;
  onChange: (mode: BrowseMode) => void;
};

export default function ExamBrowseModeTabs({
  mode,
  onChange,
}: ExamBrowseModeTabsProps) {
  return (
    <div
      aria-label="পরীক্ষার filter নির্বাচন করুন"
      className="mx-auto mb-7 grid max-w-lg grid-cols-2 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      role="tablist"
    >
      {[
        { id: "subject" as const, label: "বিষয়ভিত্তিক", icon: FiBookOpen },
        { id: "category" as const, label: "চাকরির category", icon: FiTarget },
      ].map((tab) => {
        const Icon = tab.icon;
        const isSelected = mode === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
              isSelected
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            <Icon aria-hidden="true" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
