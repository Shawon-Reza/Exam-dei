"use client";

import { FiAward, FiBook, FiBookOpen, FiFileText, FiPlus, FiSettings } from "react-icons/fi";
import type { NoticeHandler } from "../types";
import { Panel, PrimaryButton, SectionHeading } from "../ui/AdminPrimitives";

const resourceGroups = [
  {
    title: "বিষয়ভিত্তিক নোট",
    englishTitle: "Subject notes",
    description: "বাংলা, ইংরেজি, GK, গণিত ও ICT-এর topic-wise learning content পরিচালনা করুন।",
    count: "৫টি subject",
    icon: FiFileText,
    tone: "emerald",
  },
  {
    title: "বই ও গাইড",
    englishTitle: "Books & guides",
    description: "প্রস্তুতির জন্য recommended books, guides ও PDF resource catalog করুন।",
    count: "৪টি guide",
    icon: FiBook,
    tone: "blue",
  },
  {
    title: "লিডারবোর্ড",
    englishTitle: "Leaderboard",
    description: "Exam performance-এর ভিত্তিতে ranking preview ও learner motivation content দেখুন।",
    count: "৫টি entry",
    icon: FiAward,
    tone: "amber",
  },
];

export default function ResourcesSection({ onNotice }: { onNotice: NoticeHandler }) {
  return (
    <>
      <SectionHeading
        eyebrow="Content workspace"
        title="Resources ও leaderboard"
        description="Userside-এর notes, books এবং ranking experience-এর content এক জায়গা থেকে পরিকল্পনা করুন।"
        action={
          <PrimaryButton onClick={() => onNotice("Resource creation flow শীঘ্রই যুক্ত হবে")}>
            <FiPlus aria-hidden="true" /> নতুন resource
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {resourceGroups.map(({ title, englishTitle, description, count, icon: Icon, tone }) => (
          <Panel key={title} className="group p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <span className={`grid size-11 place-items-center rounded-2xl ${
                tone === "blue"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                  : tone === "amber"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              }`}>
                <Icon aria-hidden="true" />
              </span>
              <span className="text-xs font-bold text-zinc-400">{count}</span>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{englishTitle}</p>
            <h2 className="mt-1 text-lg font-extrabold text-zinc-950 dark:text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{description}</p>
            <button
              type="button"
              onClick={() => onNotice(`${title} management flow শীঘ্রই যুক্ত হবে`)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
            >
              <FiSettings aria-hidden="true" /> Manage content
            </button>
          </Panel>
        ))}
      </div>

      <Panel className="mt-5 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-extrabold text-zinc-950 dark:text-white">Content publishing checklist</h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Userside-এর প্রতিটি learning surface-এর readiness দেখুন।</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            <FiBookOpen aria-hidden="true" /> Demo workspace
          </span>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["নোটের subject", "৫ / ৫", "প্রাথমিক catalog ready"],
            ["Books & guides", "৪", "Demo entries"],
            ["Leaderboard", "৫", "Preview entries"],
            ["Question bank", "Live", "Existing workspace"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
              <p className="mt-2 text-xl font-black text-zinc-950 dark:text-white">{value}</p>
              <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-300">{detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
