"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCompass } from "react-icons/fi";
import { useUserProfile } from "@/src/apis/user/user.useHooks";
import ProfileHero from "./ProfileHero";
import ProfileStats from "./ProfileStats";
import ProfilePerformance from "./ProfilePerformance";
import RecentResults from "./RecentResults";
import PointsActivity from "./PointsActivity";

function LoadingState() {
  return <div className="mx-auto max-w-6xl animate-pulse space-y-5 px-4 py-8 sm:px-6 lg:px-8"><div className="h-64 rounded-3xl bg-zinc-200 dark:bg-zinc-800" /><div className="h-28 rounded-3xl bg-zinc-200 dark:bg-zinc-800" /><div className="h-72 rounded-3xl bg-zinc-200 dark:bg-zinc-800" /></div>;
}

function MessageState({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 text-center"><div><p className="text-sm text-zinc-500 dark:text-zinc-400">{children}</p>{action}</div></div>;
}

export default function ProfilePageContent() {
  const profileQuery = useUserProfile();

  if (profileQuery.isPending) return <LoadingState />;
  if (profileQuery.isError || !profileQuery.data?.data) {
    return (
      <MessageState action={<button type="button" onClick={() => profileQuery.refetch()} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">আবার চেষ্টা করুন</button>}>
        {profileQuery.error instanceof Error ? profileQuery.error.message : "প্রোফাইল তথ্য লোড করা যায়নি।"}
      </MessageState>
    );
  }

  const profile = profileQuery.data.data;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-zinc-50 pb-12 pt-6 dark:bg-zinc-950 sm:pb-16 sm:pt-10">
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 size-[30rem] rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
      <div className="relative mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">My learning hub</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">আবার দেখা হলো, {profile.name.split(" ")[0]}!</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">আপনার প্রস্তুতির গতি দেখুন, দুর্বল জায়গাগুলো চিহ্নিত করুন এবং আজকের লক্ষ্য পূরণ করুন।</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/topics" className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300">
              <FiCompass aria-hidden="true" /> বিষয় দেখুন
            </Link>
            <Link href="/exams" className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400">
              <FiBookOpen aria-hidden="true" /> পরীক্ষা শুরু করুন <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </header>
        <ProfileHero profile={profile} />
        <ProfileStats profile={profile} />
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
          <div className="space-y-6">
            <ProfilePerformance summary={profile.testSummary} />
            <RecentResults results={profile.recentResults} />
          </div>
          <PointsActivity points={profile.points} transactions={profile.pointSummary.recentTransactions} />
        </div>
      </div>
    </main>
  );
}
