import { FiAward, FiBookOpen, FiTarget, FiTrendingUp } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { leaderboard } from "./landing-data";

const learnerBenefits = [
  {
    icon: FiBookOpen,
    title: "একটি পরিষ্কার study plan",
    englishTitle: "A plan that feels doable",
    description: "বড় সিলেবাসকে ছোট ছোট topic-এ ভাগ করে প্রতিদিনের পড়া সহজে গুছিয়ে নিন।",
  },
  {
    icon: FiTarget,
    title: "লক্ষ্যভিত্তিক practice",
    englishTitle: "Practice with purpose",
    description: "আপনার পরীক্ষার ধরন অনুযায়ী প্রশ্ন অনুশীলন করে প্রস্তুতিকে রাখুন focused।",
  },
  {
    icon: FiTrendingUp,
    title: "অগ্রগতি বুঝে পরের পদক্ষেপ",
    englishTitle: "See what to work on next",
    description: "কোন বিষয়ে আরও practice দরকার তা বুঝে নিজের পরবর্তী লক্ষ্য ঠিক করুন।",
  },
];

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="scroll-mt-24 bg-white py-16 dark:bg-zinc-900/40 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Demo leaderboard · অনুপ্রেরণার জন্য"
          title="এই সপ্তাহের টপাররা"
          description="নিজের অগ্রগতি দেখুন, অন্যদের থেকে অনুপ্রেরণা নিন, আর প্রতিদিন একটু ভালো করুন। নিচের নাম ও score শুধু demo content।"
        />
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid grid-cols-[3rem_1fr_auto] gap-3 border-b border-zinc-100 bg-zinc-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/60 sm:grid-cols-[4rem_1fr_1fr_auto] sm:px-6">
            <span>Rank</span>
            <span>শিক্ষার্থী / Candidate</span>
            <span className="hidden sm:block">পরীক্ষা / Exam</span>
            <span className="text-right">Score</span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {leaderboard.map((student) => (
              <div
                key={student.rank}
                className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[4rem_1fr_1fr_auto] sm:px-6"
              >
                <span className={`grid size-9 place-items-center rounded-xl text-sm font-extrabold ${student.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" : student.rank === 2 ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-200" : student.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                  {student.rank <= 3 ? <FiAward aria-hidden="true" /> : student.rank}
                </span>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{student.initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{student.name}</p>
                    <p className="truncate text-[11px] text-zinc-400">{student.englishName}</p>
                  </div>
                </div>
                <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">BCS প্রিলিমিনারি Mock</span>
                <span className="text-right text-sm font-extrabold text-zinc-900 dark:text-white">{student.score}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-100 px-4 py-3 text-center text-xs text-zinc-400 dark:border-zinc-800">
            Sample leaderboard · Your real progress will be yours alone to track.
          </div>
        </div>
      </div>
    </section>
  );
}

export function LearningBenefitsSection() {
  return (
    <section className="scroll-mt-24 bg-zinc-50 py-16 dark:bg-zinc-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Made for your journey · আপনার প্রস্তুতির জন্য"
          title="প্রতিদিনের প্রস্তুতিকে করুন আরও সহজ"
          description="আপনার লক্ষ্য যাই হোক—একটি বাস্তবসম্মত routine, নিয়মিত অনুশীলন আর পরিষ্কার next step-ই পারে এগিয়ে নিতে।"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {learnerBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.englishTitle} className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-6 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{benefit.englishTitle}</p>
                <h3 className="mt-2 text-lg font-bold text-zinc-950 dark:text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
