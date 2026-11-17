import { FiArrowDownRight, FiArrowUpRight, FiAward } from "react-icons/fi";
import type { PointTransaction } from "@/src/apis/user/user.api";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "short" }).format(new Date(value));
}

export default function PointsActivity({ points, transactions }: { points: number; transactions: PointTransaction[] }) {
  return (
    <section className="rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-amber-950/[0.06] dark:border-zinc-800 dark:from-amber-950/30 dark:via-zinc-900 dark:to-orange-950/20 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20"><FiAward aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">Rewards</p>
          <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-white">{points.toLocaleString("bn-BD")} পয়েন্ট</h2>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {transactions.slice(0, 4).map((transaction) => {
          const isEarned = transaction.type === "EARNED";
          return (
            <div key={transaction.id} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 transition-transform duration-300 hover:translate-x-1 dark:bg-zinc-900/50">
              <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${isEarned ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300"}`}>
                {isEarned ? <FiArrowUpRight aria-hidden="true" /> : <FiArrowDownRight aria-hidden="true" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-zinc-800 dark:text-zinc-200">{transaction.reason.replaceAll("_", " ")}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{formatDate(transaction.createdAt)}</p>
              </div>
              <span className={`text-xs font-black ${isEarned ? "text-emerald-600" : "text-rose-600"}`}>{isEarned ? "+" : "-"}{transaction.points}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
