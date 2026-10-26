"use client";

import { useState, type FormEvent } from "react";
import { FiMail, FiSend } from "react-icons/fi";

export default function AboutContact() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "যোগাযোগ ফর্মটি প্রস্তুত। এখনো কোনো বার্তা পাঠানো হয়নি—সাবমিশন চালু করতে API সংযুক্ত করুন।",
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-28 rounded-[1.75rem] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-9 lg:p-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
            <FiMail aria-hidden="true" className="size-6" />
          </span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Get in touch
          </p>
          <h2
            id="contact-heading"
            className="mt-2 text-3xl font-black tracking-tight text-zinc-950 dark:text-white"
          >
            আপনার কথা শুনতে চাই
          </h2>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            কোনো প্রশ্ন, পরামর্শ বা সহযোগিতার প্রস্তাব থাকলে ফর্মে লিখুন। আপনার
            মতামত Chakriova-কে আরও ভালো করতে সাহায্য করবে।
          </p>
          <p className="mt-5 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
            ফর্মের ডিজাইন প্রস্তুত আছে; বার্তা পাঠানোর জন্য পরে একটি API endpoint
            সংযুক্ত করতে হবে।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              আপনার নাম
              <input
                required
                name="name"
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                placeholder="নাম লিখুন"
              />
            </label>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              ইমেইল
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            বিষয়
            <input
              required
              name="subject"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="কী বিষয়ে যোগাযোগ করতে চান?"
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            বার্তা
            <textarea
              required
              name="message"
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="আপনার বার্তা লিখুন..."
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              বার্তা প্রস্তুত করুন
              <FiSend aria-hidden="true" />
            </button>
            {notice && (
              <p role="status" className="max-w-sm text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                {notice}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
