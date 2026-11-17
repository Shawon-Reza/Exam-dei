import { FiAward, FiCheckCircle, FiHelpCircle, FiTarget } from "react-icons/fi";
import type { UserProfile } from "@/src/apis/user/user.api";

export default function ProfileStats({ profile }: { profile: UserProfile }) {
  const stats = [
    { label: "মোট পয়েন্ট", value: profile.points, icon: FiAward, tone: "amber" },
    { label: "সম্পন্ন পরীক্ষা", value: profile.testSummary.completedTests, icon: FiTarget, tone: "emerald" },
    { label: "মোট প্রশ্ন", value: profile.testSummary.totalQuestions, icon: FiHelpCircle, tone: "blue" },
    { label: "সঠিক উত্তর", value: profile.testSummary.correctAnswers, icon: FiCheckCircle, tone: "violet" },
  ] as const;

  const toneClasses = {
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div key={label} className="group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/[0.06] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900">
          <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${toneClasses[tone]}`}><Icon aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            <p className="mt-1 text-2xl font-black text-zinc-950 dark:text-white">{value.toLocaleString("bn-BD")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
