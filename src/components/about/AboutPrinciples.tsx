import { FiArrowUpRight } from "react-icons/fi";
import { aboutPrinciples } from "./about-data";

const accentStyles = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/15",
  blue: "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/15",
  amber: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/15",
};

export default function AboutPrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="scroll-mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          আমাদের ভিত্তি
        </p>
        <h2
          id="principles-heading"
          className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl"
        >
          উদ্দেশ্য থেকে এগিয়ে চলা
        </h2>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
          প্রতিটি সিদ্ধান্তের পেছনে আছে শেখাকে সহজ, অন্তর্ভুক্তিমূলক এবং ধারাবাহিক
          করার লক্ষ্য।
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {aboutPrinciples.map((principle) => (
          <article
            key={principle.id}
            id={principle.id}
            className="group scroll-mt-28 rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:shadow-black/20 sm:p-7"
          >
            <div className="flex items-start justify-between">
              <span
                className={`grid size-12 place-items-center rounded-2xl text-sm font-black ring-1 ${accentStyles[principle.accent]}`}
              >
                {principle.number}
              </span>
              <FiArrowUpRight
                aria-hidden="true"
                className="size-5 text-zinc-300 transition group-hover:text-emerald-500 dark:text-zinc-600"
              />
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {principle.englishTitle}
            </p>
            <h3 className="mt-2 text-xl font-extrabold text-zinc-950 dark:text-white">
              {principle.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {principle.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
