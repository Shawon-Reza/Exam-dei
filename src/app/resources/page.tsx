import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiBook,
  FiBookOpen,
  FiFileText,
} from "react-icons/fi";
import ResourcesPdfsBrowser from "@/src/components/resources/ResourcesPdfsBrowser";

export const metadata: Metadata = {
  title: "শিক্ষা উপকরণ",
  description: "চাকরির প্রস্তুতির জন্য বিষয়ভিত্তিক PDF, প্রশ্ন ব্যাংক ও বই খুঁজুন।",
};

const resourceCards = [
  {
    title: "প্রশ্ন ব্যাংক",
    description: "বিগত পরীক্ষার প্রশ্ন অনুশীলন করে প্রস্তুতি যাচাই করুন।",
    href: "/question-bank",
    icon: FiBookOpen,
    label: "Question bank",
  },
  {
    title: "বই ও গাইড",
    description: "বিভিন্ন বিষয়ের প্রস্তুতির জন্য বাছাই করা বই ও গাইড দেখুন।",
    href: "/books",
    icon: FiBook,
    label: "Books & guides",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-8 dark:bg-zinc-950 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-6 dark:border-emerald-950 dark:from-emerald-950/50 dark:via-zinc-900 dark:to-zinc-900 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-900 dark:bg-zinc-900/80 dark:text-emerald-300">
              <FiFileText aria-hidden="true" />
              Study library
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl">
              প্রস্তুতির সব উপকরণ, এক জায়গায়
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
              বিষয়ভিত্তিক PDF খুঁজুন, প্রশ্ন অনুশীলন করুন এবং প্রয়োজনীয় বই ও
              গাইড এক জায়গা থেকে দেখুন।
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {resourceCards.map(({ title, description, href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-44 items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800 sm:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-xl text-emerald-700 dark:text-emerald-300">
                <Icon aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {label}
                </span>
                <span className="mt-1 block text-xl font-extrabold text-zinc-950 dark:text-white">
                  {title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {description}
                </span>
              </span>
              <FiArrowUpRight
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-zinc-400 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-300"
              />
            </Link>
          ))}
        </section>

        <ResourcesPdfsBrowser />
      </div>
    </main>
  );
}
