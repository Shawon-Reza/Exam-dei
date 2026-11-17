"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiBell,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: "book" | "result" | "success";
};

const notifications: Notification[] = [
  {
    id: "practice-reminder",
    title: "আজকের প্রস্তুতি শুরু করুন",
    description: "একটি topic বেছে নিয়ে আপনার প্রস্তুতি আরও এক ধাপ এগিয়ে নিন।",
    time: "আজ",
    icon: "book",
  },
  {
    id: "result-insights",
    title: "আপনার ফলাফল প্রস্তুত",
    description: "প্রতিটি পরীক্ষার পর আপনার সঠিকতা ও অর্জিত পয়েন্ট দেখে নিন।",
    time: "সাম্প্রতিক",
    icon: "result",
  },
  {
    id: "welcome",
    title: "Chakriova-তে স্বাগতম",
    description: "নোট পড়ুন, MCQ অনুশীলন করুন এবং নিজের অগ্রগতি গড়ে তুলুন।",
    time: "নতুন",
    icon: "success",
  },
];

const iconMap = {
  book: FiBookOpen,
  result: FiCheckCircle,
  success: FiCheck,
};

const READ_NOTIFICATIONS_KEY = "chakriova_read_notifications";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedReadIds = window.localStorage.getItem(READ_NOTIFICATIONS_KEY);
      if (!storedReadIds) return;

      try {
        setReadIds(JSON.parse(storedReadIds) as string[]);
      } catch {
        window.localStorage.removeItem(READ_NOTIFICATIONS_KEY);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !readIds.includes(notification.id),
  ).length;

  function updateReadIds(nextReadIds: string[]) {
    setReadIds(nextReadIds);
    window.localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(nextReadIds));
  }

  function markAsRead(id: string) {
    if (!readIds.includes(id)) updateReadIds([...readIds, id]);
  }

  function markAllAsRead() {
    updateReadIds(notifications.map((notification) => notification.id));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label="নোটিফিকেশন খুলুন"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="relative grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
      >
        <FiBell aria-hidden="true" className="size-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black leading-4 text-white ring-2 ring-white dark:ring-zinc-950">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="নোটিফিকেশন"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-[60] w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30"
        >
          <div className="flex items-start justify-between border-b border-zinc-100 p-4 dark:border-zinc-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Updates
              </p>
              <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-white">
                নোটিফিকেশন
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="নোটিফিকেশন বন্ধ করুন"
              className="grid size-8 place-items-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {unreadCount ? `${unreadCount}টি অপঠিত আপডেট` : "সব আপডেট দেখা হয়েছে"}
            </p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <FiCheck aria-hidden="true" />
                সব দেখা হয়েছে
              </button>
            )}
          </div>

          <div className="max-h-[min(60vh,390px)] overflow-y-auto px-2 pb-2">
            {notifications.map((notification) => {
              const isRead = readIds.includes(notification.id);
              const Icon = iconMap[notification.icon];
              return (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-emerald-50 dark:hover:bg-emerald-950/30 ${
                    isRead ? "opacity-70" : "bg-emerald-50/60 dark:bg-emerald-950/20"
                  }`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm dark:bg-zinc-800 dark:text-emerald-400">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        {notification.title}
                      </span>
                      {!isRead && <span className="size-2 shrink-0 rounded-full bg-emerald-500" />}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                      {notification.description}
                    </span>
                    <span className="mt-1.5 block text-[11px] font-semibold text-zinc-400">
                      {notification.time}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-zinc-100 p-3 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => markAllAsRead()}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              নোটিফিকেশন সেন্টার
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
