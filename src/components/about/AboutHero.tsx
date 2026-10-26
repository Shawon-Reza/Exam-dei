import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiBookOpen, FiTarget } from "react-icons/fi";

export default function AboutHero() {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-16 text-white shadow-2xl shadow-emerald-950/10 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-32 -z-10 size-[28rem] rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-1/3 -z-10 size-[26rem] rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-300" />
            বাংলাদেশের চাকরি প্রস্তুতির সঙ্গী
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            প্রস্তুতি হোক
            <span className="block text-emerald-300">আরও গুছানো,</span>
            লক্ষ্য হোক আরও কাছে।
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
            Chakriova তৈরি হয়েছে চাকরিপ্রার্থীদের শেখা, অনুশীলন এবং নিজের অগ্রগতি
            ধরে রাখার অভিজ্ঞতাকে এক জায়গায় সহজ করতে।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#mission"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300"
            >
              আমাদের উদ্দেশ্য জানুন
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              যোগাযোগ করুন
              <FiArrowDown aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-5 top-10 grid size-14 place-items-center rounded-2xl border border-white/10 bg-zinc-900 text-emerald-300 shadow-xl sm:-left-7">
            <FiTarget aria-hidden="true" className="size-6" />
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Chakriova
                </p>
                <p className="mt-2 text-lg font-bold">আপনার প্রস্তুতি, আপনার ছন্দে</p>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-400 text-zinc-950">
                <FiBookOpen aria-hidden="true" className="size-6" />
              </span>
            </div>
            <div className="mt-8 space-y-3">
              {[
                { label: "বিষয়ভিত্তিক শেখা", width: "w-[84%]" },
                { label: "নিয়মিত অনুশীলন", width: "w-[68%]" },
                { label: "আত্মবিশ্বাসের সঙ্গে এগিয়ে চলা", width: "w-[92%]" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/5 text-xs font-bold text-emerald-200">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-100">{item.label}</p>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10">
                        <div className={`h-full rounded-full bg-emerald-400 ${item.width}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-zinc-400">
              ছোট ছোট ধারাবাহিক প্রচেষ্টাই বড় লক্ষ্যের পথে এগিয়ে নেয়।
            </p>
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 shadow-xl sm:-right-6">
            <p className="text-xs text-zinc-400">প্রতিটি প্রচেষ্টাই গুরুত্বপূর্ণ</p>
            <p className="mt-1 text-sm font-bold text-emerald-200">আজ থেকেই শুরু হোক</p>
          </div>
        </div>
      </div>
    </section>
  );
}
