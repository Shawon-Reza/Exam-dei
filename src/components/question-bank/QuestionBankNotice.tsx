"use client";

import { useEffect, useState } from "react";
import { FiBookOpen, FiCheckCircle, FiClock, FiX } from "react-icons/fi";

export default function QuestionBankNotice() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-zinc-950/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-bank-notice-title"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-2xl dark:border-emerald-900 dark:bg-zinc-900"
      >
        <div className="absolute -right-12 -top-16 size-40 rounded-full bg-emerald-100/70 dark:bg-emerald-950/40" />
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="নোটিশ বন্ধ করুন"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <FiX aria-hidden="true" className="size-5" />
          </button>

          <div className="grid size-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <FiBookOpen aria-hidden="true" className="size-7" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            গুরুত্বপূর্ণ নোটিশ · Important notice
          </p>
          <h2
            id="question-bank-notice-title"
            className="mt-2 max-w-md text-2xl font-extrabold leading-tight text-zinc-950 dark:text-white"
          >
            Question Bank feature নিয়ে আমরা কাজ করছি
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            এই পেজে বর্তমানে কিছু dummy data ব্যবহার করা হয়েছে। আমরা শীঘ্রই
            আসল previous question এবং complete practice experience যুক্ত করছি।
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800/70">
              <FiClock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  Feature in progress
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  আরও data ও category যোগ হচ্ছে।
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800/70">
              <FiCheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  Coming soon
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  Real questions দিয়ে practice করা যাবে।
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-6 min-h-11 w-full rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            বুঝেছি, প্রশ্নগুলো দেখি
          </button>
        </div>
      </section>
    </div>
  );
}
