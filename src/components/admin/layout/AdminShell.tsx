"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  FiActivity,
  FiBookOpen,
  FiChevronDown,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMenu,
  FiLayers,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import type { AdminSection } from "../types";

const navigation: { id: AdminSection; label: string; icon: typeof FiHome; }[] = [
  { id: "overview", label: "Overview", icon: FiHome },
  { id: "exams", label: "পরীক্ষা", icon: FiBookOpen },
  { id: "questions", label: "Question Bank", icon: FiHelpCircle },
  { id: "students", label: "শিক্ষার্থী", icon: FiUsers },
  { id: "blogs", label: "Blogs & Content", icon: FiFileText },
  { id: "resources", label: "Resources & Ranking", icon: FiLayers },
  { id: "settings", label: "সেটিংস", icon: FiSettings },
];

export default function AdminShell({
  section,
  onSectionChange,
  questionCount,
  notice,
  onDismissNotice,
  children,
}: {
  section: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  questionCount: number;
  notice: string;
  onDismissNotice: () => void;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = navigation.find((item) => item.id === section)?.label ?? "Overview";

  function selectSection(nextSection: AdminSection) {
    onSectionChange(nextSection);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#292D1F] dark:text-[#f1f5f1]">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform dark:border-zinc-800 dark:bg-zinc-900 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Link href="/admin" className="flex h-[72px] items-center gap-3 border-b border-zinc-100 px-6 dark:border-[#576E67]">
            <span className="grid size-10 place-items-center rounded-xl bg-[#576E67] text-white shadow-lg shadow-[#292D1F]/20"><FiActivity aria-hidden="true" size={20} /></span>
            <span><span className="block text-base font-extrabold tracking-tight">Chakriova</span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Admin console</span></span>
          </Link>
          <div className="px-4 pt-6">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Workspace</p>
            <nav aria-label="Admin navigation" className="space-y-1">
              {navigation.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => selectSection(id)} aria-current={section === id ? "page" : undefined} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${section === id ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"}`}><Icon aria-hidden="true" size={17} />{label}{id === "questions" && <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-800">{questionCount}</span>}</button>)}
            </nav>
          </div>
          <div className="mt-auto border-t border-zinc-100 p-4 dark:border-zinc-800">
            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-[#455045]"><div className="grid size-9 place-items-center rounded-full bg-[#607873] text-xs font-extrabold text-white">SA</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">Shawon Admin</p><p className="truncate text-[10px] text-zinc-500 dark:text-[#afbeb5]">Super administrator</p></div><FiChevronDown aria-hidden="true" className="text-zinc-400" /></div>
            <Link href="/" className="mt-2 flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"><FiLogOut aria-hidden="true" />সাইটে ফিরে যান</Link>
          </div>
        </aside>
        {sidebarOpen && <button type="button" aria-label="Navigation বন্ধ করুন" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-zinc-950/40 lg:hidden" />}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur-md dark:border-[#576E67] dark:bg-[#3B4A40]/90 sm:px-7">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Navigation খুলুন" className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"><FiMenu aria-hidden="true" size={19} /></button>
              <div><p className="text-[11px] font-medium text-zinc-400">Admin / {title}</p><p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{title}</p></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4"><span className="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 sm:inline-flex"><span className="size-1.5 rounded-full bg-amber-500" />Demo mode</span><button type="button" aria-label="Notifications" className="relative grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-rose-500 dark:border-zinc-900" /><FiActivity aria-hidden="true" /></button><div className="grid size-9 place-items-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">SA</div></div>
          </header>
          <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">
            {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"><span aria-hidden="true">✓</span>{notice}<button type="button" onClick={onDismissNotice} aria-label="বার্তা বন্ধ করুন" className="ml-auto"><FiX aria-hidden="true" /></button></div>}
            {children}
            <p className="mt-8 text-center text-[11px] text-zinc-400">Chakriova Admin · Demo data · Refresh করলে পরিবর্তন reset হবে</p>
          </main>
        </div>
      </div>
    </div>
  );
}
