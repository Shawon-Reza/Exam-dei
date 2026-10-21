import { FiAward, FiBarChart2, FiEdit3, FiFileText, FiMoreHorizontal } from "react-icons/fi";
import { profileActivity } from "./profile-data";

const icons = { post: FiFileText, exam: FiBarChart2, achievement: FiAward };

export default function ProfileActivity() {
  return (
    <aside className="space-y-5">
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">সাম্প্রতিক activity</h2>
          <button type="button" aria-label="আরও activity দেখুন" className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white"><FiMoreHorizontal /></button>
        </div>
        <div className="mt-5 space-y-5">
          {profileActivity.map((activity) => {
            const Icon = icons[activity.type as keyof typeof icons];
            return (
              <div key={activity.title} className="flex gap-3">
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl text-white ${activity.accent}`}><Icon aria-hidden="true" className="size-4" /></span>
                <div>
                  <p className="text-xs font-semibold leading-5 text-zinc-700 dark:text-zinc-300">{activity.title}</p>
                  <p className="mt-1 text-[11px] text-zinc-400">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="rounded-3xl bg-emerald-50 p-5 dark:bg-emerald-950/40">
        <h2 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Profile আরও সম্পূর্ণ করুন</h2>
        <p className="mt-2 text-xs leading-5 text-emerald-900/70 dark:text-emerald-100/70">Profile photo, portfolio link ও career goal যোগ করলে অন্যরা আপনাকে আরও ভালোভাবে জানতে পারবে।</p>
        <button type="button" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300"><FiEdit3 aria-hidden="true" /> Edit profile</button>
      </section>
    </aside>
  );
}
