"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <html lang="bn">
      <body className="global-error-page">
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <section
            aria-labelledby="global-error-title"
            className="global-error-card w-full max-w-lg rounded-3xl border p-7 text-center shadow-xl shadow-zinc-950/5 sm:p-10"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-300">
              <FiAlertTriangle aria-hidden="true" className="size-7" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-300">
              Unexpected error · অপ্রত্যাশিত সমস্যা
            </p>
            <h1
              id="global-error-title"
              className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              দুঃখিত, একটি সমস্যা হয়েছে
            </h1>
            <p className="global-error-muted mt-3 text-sm leading-7">
              পৃষ্ঠাটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন, অথবা কিছুক্ষণ
              পরে ফিরে আসুন।
            </p>
            {error.digest && (
              <p className="global-error-muted mt-4 text-xs">
                Error reference: <code>{error.digest}</code>
              </p>
            )}
            <button
              type="button"
              onClick={() => retry()}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <FiRefreshCw aria-hidden="true" />
              আবার চেষ্টা করুন
            </button>
            <Link
              href="/"
              className="global-error-muted mt-4 block text-sm underline decoration-zinc-400 underline-offset-4 transition hover:text-emerald-600"
            >
              হোমপেজে ফিরে যান
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
