"use client";

import type { FormEvent } from "react";
import { FiShield } from "react-icons/fi";
import type { AdminSettings, NoticeHandler } from "../types";
import { Panel, PrimaryButton, SectionHeading, ToggleSetting } from "../ui/AdminPrimitives";

export default function SettingsSection({
  settings,
  onChange,
  onNotice,
}: {
  settings: AdminSettings;
  onChange: (settings: AdminSettings) => void;
  onNotice: NoticeHandler;
}) {

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNotice("সেটিংস সংরক্ষণ হয়েছে");
  }

  return (
    <>
      <SectionHeading eyebrow="Workspace preferences" title="সেটিংস" description="সাইটের সাধারণ তথ্য, notification ও maintenance mode নিয়ন্ত্রণ করুন।" />
      <form onSubmit={saveSettings} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)]">
        <div className="space-y-5">
          <Panel className="p-5 sm:p-6">
            <h2 className="text-base font-extrabold">সাধারণ তথ্য</h2><p className="mt-1 text-sm text-zinc-500">সাইট এবং support-এর পরিচিতি হালনাগাদ করুন।</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold">সাইটের নাম</span><input required value={settings.siteName} onChange={(event) => onChange({ ...settings, siteName: event.target.value })} className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold">Support email</span><input required type="email" value={settings.supportEmail} onChange={(event) => onChange({ ...settings, supportEmail: event.target.value })} className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950" /></label>
            </div>
          </Panel>
          <Panel className="p-5 sm:p-6">
            <h2 className="text-base font-extrabold">Notifications</h2><p className="mt-1 text-sm text-zinc-500">কোন update-এ admin notification পাঠাবেন তা বেছে নিন।</p>
            <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
              <ToggleSetting title="Email notification" description="নতুন শিক্ষার্থী ও গুরুত্বপূর্ণ account update" checked={settings.emailNotifications} onChange={(checked) => onChange({ ...settings, emailNotifications: checked })} />
              <ToggleSetting title="পরীক্ষা সংক্রান্ত notification" description="নতুন পরীক্ষা, schedule ও live status" checked={settings.examNotifications} onChange={(checked) => onChange({ ...settings, examNotifications: checked })} />
            </div>
          </Panel>
        </div>
        <div className="space-y-5">
          <Panel className="p-5 sm:p-6">
            <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"><FiShield aria-hidden="true" /></span><div><h2 className="text-base font-extrabold">Maintenance mode</h2><p className="mt-1 text-xs leading-5 text-zinc-500">সাইটটি সাময়িকভাবে রক্ষণাবেক্ষণে রাখুন।</p></div></div>
            <div className="mt-5"><ToggleSetting title="Maintenance চালু করুন" description="সাধারণ ব্যবহারকারীদের জন্য সাইট বন্ধ থাকবে" checked={settings.maintenanceMode} onChange={(checked) => onChange({ ...settings, maintenanceMode: checked })} /></div>
          </Panel>
          <Panel className="bg-emerald-700 p-5 text-white dark:bg-emerald-800">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">Admin preview</p><p className="mt-2 text-xl font-extrabold">{settings.siteName || "Chakriova"}</p><p className="mt-1 text-sm text-emerald-100">{settings.supportEmail}</p>            <p className="mt-5 border-t border-white/20 pt-4 text-xs leading-5 text-emerald-100">সেটিংস সংরক্ষণ করতে backend সংযোগ প্রয়োজন।</p>
          </Panel>
        </div>
        <div className="xl:col-span-2"><PrimaryButton type="submit">পরিবর্তন সংরক্ষণ</PrimaryButton></div>
      </form>
    </>
  );
}
