import type { Metadata } from "next";
import { FiAward, FiBarChart2, FiClock, FiTarget, FiTrendingUp } from "react-icons/fi";
import { leaderboard } from "@/src/components/landing/landing-data";

export const metadata: Metadata = {
  title: "লিডারবোর্ড | চাকরির প্রস্তুতি",
  description: "এই সপ্তাহের top learners, score এবং preparation performance দেখুন।",
};

const podiumStyles = [
  "order-2 border-amber-200 bg-gradient-to-b from-amber-50 to-white dark:border-amber-900/70 dark:from-amber-950/40 dark:to-zinc-900",
  "order-1 border-zinc-200 bg-gradient-to-b from-zinc-100 to-white dark:border-zinc-700 dark:from-zinc-800/80 dark:to-zinc-900",
  "order-3 border-orange-200 bg-gradient-to-b from-orange-50 to-white dark:border-orange-900/70 dark:from-orange-950/30 dark:to-zinc-900",
];

export default function LeaderboardPage() {
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <main className="min-h-screen bg-zinc-50 py-8 dark:bg-zinc-950 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-teal-700 to-zinc-900 p-6 text-white shadow-xl sm:p-10">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-emerald-300/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50">
              <FiAward aria-hidden="true" /> Weekly leaderboard
            </span>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              এই সপ্তাহের সেরা প্রস্তুতকারীরা
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              নিয়মিত practice ও exam performance-এর মাধ্যমে নিজের অবস্থান দেখুন,
              অন্যদের থেকে inspiration নিন এবং পরের লক্ষ্য ঠিক করুন।
            </p>
          </div>
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "সেরা score", value: "৯৮.৫%", icon: FiTrendingUp },
            { label: "মোট ranking", value: "৫ জন", icon: FiBarChart2 },
            { label: "এই সপ্তাহের period", value: "৭ দিন", icon: FiClock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <span className="block text-lg font-black text-zinc-950 dark:text-white">{value}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
              </span>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Top performers</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">সেরা তিনজন</h2>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">BCS Preliminary Mock</span>
          </div>

          <div className="mt-5 grid items-end gap-4 md:grid-cols-3">
            {topThree.map((student, index) => (
              <article key={student.rank} className={`rounded-3xl border p-5 text-center shadow-sm ${podiumStyles[index]}`}>
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/80 text-amber-600 shadow-sm dark:bg-zinc-900/70 dark:text-amber-300">
                  <FiAward className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-zinc-400">Rank #{student.rank}</p>
                <div className="mx-auto mt-3 grid size-14 place-items-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {student.initials}
                </div>
                <h3 className="mt-3 font-extrabold text-zinc-950 dark:text-white">{student.name}</h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{student.englishName}</p>
                <p className="mt-4 text-3xl font-black text-emerald-700 dark:text-emerald-300">{student.score}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-3 border-b border-zinc-100 p-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-zinc-950 dark:text-white">সম্পূর্ণ ranking</h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">এই সপ্তাহের demo performance তালিকা</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <FiTarget aria-hidden="true" /> Score based
            </span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[...topThree, ...remaining].map((student) => (
              <div key={`row-${student.rank}`} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[4rem_1fr_1fr_auto] sm:px-6">
                <span className="text-center text-sm font-black text-zinc-500 dark:text-zinc-400">#{student.rank}</span>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{student.initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{student.name}</p>
                    <p className="truncate text-[11px] text-zinc-400">{student.englishName}</p>
                  </div>
                </div>
                <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">BCS Preliminary Mock</span>
                <span className="text-right text-sm font-black text-emerald-700 dark:text-emerald-300">{student.score}</span>
              </div>
            ))}
          </div>
          <p className="border-t border-zinc-100 px-5 py-4 text-center text-xs leading-5 text-zinc-400 dark:border-zinc-800">
            Leaderboard-এর নাম ও score বর্তমানে demo data। আপনার account-এর real result যুক্ত হলে ranking আরও personalized হবে।
          </p>
        </section>
      </div>
    </main>
  );
}
