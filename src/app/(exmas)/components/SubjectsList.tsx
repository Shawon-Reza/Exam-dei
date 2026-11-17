import Link from "next/link";
import { FiArrowUpRight, FiBookOpen, FiFileText, FiHelpCircle, FiLayers, FiMessageSquare } from "react-icons/fi";

type Subject = {
    id: string;
    slug: string;
    name: string;
    banglaName: string;
    description?: string | null;
    icon?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    _count?: {
        tests?: number;
        questions?: number;
        pdfs?: number;
        notes?: number;
        topics?: number;
    };
};

type SubjectsListProps = {
    subjects?: Subject[];
};

const countItems = [
    { key: "tests", label: "পরীক্ষা", icon: FiLayers },
    { key: "questions", label: "প্রশ্ন", icon: FiHelpCircle },
    { key: "topics", label: "টপিক", icon: FiMessageSquare },
    { key: "notes", label: "নোট", icon: FiFileText },
    { key: "pdfs", label: "PDF", icon: FiBookOpen },
] as const;

const SubjectsList = ({ subjects = [] }: SubjectsListProps) => {
    if (subjects.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                কোনো বিষয় পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <section aria-label="বিষয়সমূহ" className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-3">
            {subjects.map((subject) => (
                <article
                    key={subject.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/[0.06] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800"
                >
                    <div className="flex items-start justify-between gap-3 p-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900">
                                {subject.icon ? (
                                    <span
                                        aria-hidden="true"
                                        className="size-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${subject.icon}")` }}
                                    />
                                ) : (
                                    <FiBookOpen aria-hidden="true" className="size-5" />
                                )}
                            </span>
                            <div className="min-w-0">
                                <h2 className="truncate text-base font-extrabold tracking-tight text-zinc-950 dark:text-white">
                                    {subject.banglaName}
                                </h2>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    {subject.name}
                                </p>
                            </div>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${subject.isActive
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                        >
                            {subject.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </span>
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-4">
                        <p className="line-clamp-2 min-h-10 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                            {subject.description || "এই বিষয়ের কোনো বিবরণ নেই।"}
                        </p>

                        <div className="mt-3 grid grid-cols-5 gap-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                            {countItems.map(({ key, label, icon: Icon }) => (
                                <div key={key} className="flex min-w-0 flex-col items-center rounded-lg bg-zinc-50 px-1 py-1.5 text-center dark:bg-zinc-800/60">
                                    <Icon aria-hidden="true" className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                                    <span className="mt-0.5 truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                                        <strong className="block text-xs leading-4 text-zinc-800 dark:text-zinc-200">
                                            {subject._count?.[key] ?? 0}
                                        </strong>
                                        <span>{label}</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-[10px] text-zinc-400 dark:text-zinc-500">
                            <span className="truncate">Slug: {subject.slug}</span>
                            <span>ক্রমিক: {subject.sortOrder ?? "—"}</span>
                        </div>
                        <Link
                            href={`/exams/${subject.id}`}
                            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition group-hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-emerald-400"
                        >
                            পরীক্ষা দেখুন
                            <FiArrowUpRight aria-hidden="true" />
                        </Link>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default SubjectsList;