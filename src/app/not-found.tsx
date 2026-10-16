import Link from "next/link";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-20 dark:bg-zinc-950 sm:px-6">
      <div className="w-full max-w-xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
          <FiCompass aria-hidden="true" className="size-8" />
        </span>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          404 · Page not found
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
          এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
          পৃষ্ঠাটি সরানো হয়ে থাকতে পারে, অথবা ঠিকানাটি ভুল হতে পারে। চলুন, আপনাকে
          Chakriova-র মূল পাতায় ফিরিয়ে নিয়ে যাই।
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <FiArrowLeft aria-hidden="true" />
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
