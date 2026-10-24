import Link from "next/link";
import {
  FiArrowDown,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiPlay,
  FiTrendingUp,
} from "react-icons/fi";
import { platformStats } from "./landing-data";

const subjectProgress = [
  { label: "বাংলা", value: 82, color: "bg-emerald-500" },
  { label: "English", value: 68, color: "bg-blue-500" },
  { label: "সাধারণ জ্ঞান", value: 74, color: "bg-violet-500" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 size-[30rem] rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -right-40 top-20 size-[32rem] rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4  sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 ">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-zinc-900/80 dark:text-emerald-300 sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            আপনার চাকরি প্রস্তুতির focused workspace
          </div>

          <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
            প্রস্তুতি হোক
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              গোছানো, আত্মবিশ্বাসী।
            </span>
          </h1>
          <p className="mt-5 text-lg font-semibold text-zinc-700 dark:text-zinc-300 sm:text-xl">
            পড়ুন, practice করুন, exam দিন—এক জায়গা থেকেই।
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base lg:mx-0">
            BCS, Bank, NTRCA ও সরকারি চাকরির প্রস্তুতির জন্য topic notes,
            MCQ practice, question bank এবং timed exam একসাথে ব্যবহার করুন।
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row lg:justify-start">
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              বিনামূল্যে শুরু করুন
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-zinc-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:text-emerald-300"
            >
              <FiPlay aria-hidden="true" className="fill-current" />
              কীভাবে কাজ করে
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 lg:justify-start">
            {["বিষয়ভিত্তিক notes", "পূর্ববর্তী question bank", "responsive learning experience"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <FiCheck aria-hidden="true" className="text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-zinc-200/80 pt-6 dark:border-zinc-800 sm:max-w-lg">
            {platformStats.map((stat) => (
              <div key={stat.englishLabel} className="text-center lg:text-left">
                <p className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                  {stat.label}
                  <span className="hidden sm:inline"> · {stat.englishLabel}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-emerald-300/40 via-cyan-200/30 to-violet-300/30 blur-2xl dark:from-emerald-500/15 dark:via-cyan-500/10 dark:to-violet-500/10" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-2xl shadow-zinc-900/10 dark:border-zinc-700/80 dark:bg-zinc-900/95 dark:shadow-black/30 sm:p-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <FiTrendingUp aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">আমার প্রস্তুতি</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">My learning dashboard</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                ডেমো preview
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4 sm:gap-4">
              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/70">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">সাপ্তাহিক study time</p>
                <p className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-white">১২.৫ <span className="text-sm font-semibold">ঘণ্টা</span></p>
                <div className="mt-3 flex h-10 items-end gap-1.5">
                  {[34, 58, 45, 78, 52, 90, 68].map((height, index) => (
                    <span
                      key={index}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-md ${index === 5 ? "bg-emerald-500" : "bg-emerald-200 dark:bg-emerald-900"}`}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-[9px] text-zinc-400">
                  <span>শনি</span><span>সোম</span><span>বুধ</span><span>শুক্র</span>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80">Current streak</span>
                  <FiClock aria-hidden="true" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold">দিন ০৭</p>
                  <p className="mt-1 text-xs text-white/80">Keep your momentum!</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 7 }, (_, index) => (
                    <span key={index} className="grid size-5 place-items-center rounded-full bg-white/20">
                      <FiCheck aria-hidden="true" className="size-3" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-100 p-4 dark:border-zinc-800">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">বিষয়ভিত্তিক অগ্রগতি</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Subject performance</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">এই মাস</span>
              </div>
              <div className="space-y-3">
                {subjectProgress.map((subject) => (
                  <div key={subject.label} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2 text-xs">
                    <span className="text-zinc-600 dark:text-zinc-300">{subject.label}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <span className={`block h-full rounded-full ${subject.color}`} style={{ width: `${subject.value}%` }} />
                    </span>
                    <span className="text-right font-semibold text-zinc-700 dark:text-zinc-300">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">আপনার পরের লক্ষ্য</p>
                <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">আপনার পছন্দের পরীক্ষাটি বেছে নিন</p>
              </div>
              <span className="grid size-9 place-items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                <FiArrowDown aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="absolute -left-4 top-1/3 hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:block lg:-left-12">
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Practice session</p>
            <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">আপনার অগ্রগতি দেখুন</p>
          </div>
        </div>
      </div>
    </section>
  );
}
