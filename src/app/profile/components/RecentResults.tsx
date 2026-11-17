import { FiArrowUpRight, FiCheckCircle, FiClock } from "react-icons/fi";
import type { RecentResult } from "@/src/apis/user/user.api";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "short" }).format(new Date(value));
}

export default function RecentResults({ results }: { results: RecentResult[] }) {
  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-blue-950/[0.05] dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">Recent activity</p>
          <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-white">সাম্প্রতিক ফলাফল</h2>
        </div>
        <FiArrowUpRight className="text-zinc-400" aria-hidden="true" />
      </div>
      <div className="mt-5 divide-y divide-zinc-100 dark:divide-zinc-800">
        {results.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">এখনো কোনো পরীক্ষা সম্পন্ন হয়নি।</p>
        ) : results.map((result) => (
          <div key={result.id} className="group flex items-center gap-3 rounded-2xl py-3 transition-colors hover:bg-zinc-50 first:pt-0 last:pb-0 dark:hover:bg-zinc-800/60">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><FiCheckCircle aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{result.test.name}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500"><FiClock aria-hidden="true" />{formatDate(result.createdAt)} · {result.correctAnswers}/{result.totalQuestions} সঠিক</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${result.accuracy >= 50 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"}`}>
              {result.accuracy.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
