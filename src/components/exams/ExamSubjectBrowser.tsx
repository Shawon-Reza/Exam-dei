import { FiArrowRight } from "react-icons/fi";
import type { ExamSubject } from "./exam-data";
import ExamSubjectTopicsModal from "./ExamSubjectTopicsModal";

type ExamSubjectBrowserProps = {
  subjects: ExamSubject[];
  selectedSubjectId: string | null;
  selectedTopicId: string | null;
  selectedSubject?: ExamSubject;
  onSelectSubject: (subjectId: string) => void;
  onSelectTopic: (topicId: string | null) => void;
  onClose: () => void;
};

export default function ExamSubjectBrowser({
  subjects,
  selectedSubjectId,
  selectedTopicId,
  selectedSubject,
  onSelectSubject,
  onSelectTopic,
  onClose,
}: ExamSubjectBrowserProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            Filter by subject
          </p>
          <h3 className="mt-1 text-base font-bold text-zinc-950 dark:text-white sm:text-lg">
            Subject নির্বাচন করুন
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Subject নির্বাচন করলে সব topic একটি modal-এ দেখতে পারবেন।
          </p>
        </div>
        {selectedSubject && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {selectedSubject.label} নির্বাচিত
          </span>
        )}
      </div>

      <div className="grid items-stretch gap-2.5 min-[420px]:grid-cols-2 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isSelected = subject.id === selectedSubjectId;

          return (
            <button
              key={subject.id}
              type="button"
              aria-pressed={isSelected}
              // onClick={() => onSelectSubject(subject.id)}
              className={`group flex min-h-32 flex-col rounded-xl border p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${isSelected
                ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-950/5 dark:bg-emerald-950/30"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className={`grid size-8 place-items-center rounded-lg ${subject.color}`}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {subject.topics.length}টি topic
                </span>
              </span>
              <span className="mt-2 text-sm font-bold text-zinc-950 dark:text-white">
                {subject.label}
              </span>
              <span className="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                {subject.description}
              </span>
              <span className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-2 text-[11px] font-bold text-emerald-700 dark:border-zinc-800 dark:text-emerald-400">
                Filter করুন
                <FiArrowRight aria-hidden="true" className="size-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          );
        })}
      </div>

      {/* <ExamSubjectTopicsModal
        subject={selectedSubject ?? null}
        selectedTopicId={selectedTopicId}
        onSelectTopic={onSelectTopic}
        onClose={onClose}
      /> */}
    </div>
  );
}
