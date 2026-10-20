
import type { Metadata } from "next";
import { FiBookOpen, FiBriefcase, FiLayers } from "react-icons/fi";
import QuestionBankBrowser from "@/src/components/question-bank/QuestionBankBrowser";
import QuestionBankNotice from "@/src/components/question-bank/QuestionBankNotice";

export const metadata: Metadata = {
  title: "প্রশ্ন ব্যাংক | চাকরির প্রস্তুতি",
  description:
    "BCS, NTRCA, ব্যাংক জব ও বিভিন্ন নিয়োগ পরীক্ষার পূর্ববর্তী প্রশ্নপত্র খুঁজে practice করুন।",
};

export default function QuestionBankPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-6 dark:bg-zinc-950 sm:py-10">
      <QuestionBankNotice />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <FiBookOpen aria-hidden="true" />
            Previous questions · পূর্ববর্তী প্রশ্ন
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            আপনার কাঙ্ক্ষিত চাকরির প্রশ্ন খুঁজুন
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            প্রতিষ্ঠান, পদ ও পরীক্ষার ধরন অনুযায়ী আগে অনুষ্ঠিত প্রশ্নগুলো এক
            জায়গায় খুঁজে practice করুন।
          </p>
        </header>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: FiBriefcase, value: "৪+", label: "চাকরির category" },
            { icon: FiLayers, value: "২০+", label: "পদ ও পরীক্ষা" },
            { icon: FiBookOpen, value: "১০k+", label: "প্রশ্ন" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
              <Icon aria-hidden="true" className="mx-auto size-5 text-emerald-600 dark:text-emerald-400" />
              <p className="mt-2 text-lg font-extrabold text-zinc-950 dark:text-white">{value}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 sm:text-xs">{label}</p>
            </div>
          ))}
        </div>

        <QuestionBankBrowser />
      </div>
    </main>
  );
}