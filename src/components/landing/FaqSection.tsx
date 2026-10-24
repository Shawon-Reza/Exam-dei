import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiChevronDown, FiMail } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { frequentlyAskedQuestions } from "./landing-data";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 dark:bg-zinc-900/40 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ · আপনার প্রশ্ন"
          title="সাধারণ জিজ্ঞাসা"
          description="Topics, notes, question bank, exam ও profile flow নিয়ে common প্রশ্নগুলোর উত্তর দেখুন।"
        />
        <div className="space-y-3">
          {frequentlyAskedQuestions.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 open:border-emerald-200 open:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-900 dark:open:border-emerald-900 dark:open:bg-emerald-950/20 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-zinc-900 marker:hidden dark:text-white sm:text-base">
                {item.question}
                <FiChevronDown aria-hidden="true" className="size-5 shrink-0 text-zinc-400 transition group-open:rotate-180 group-open:text-emerald-600" />
              </summary>
              <p className="max-w-2xl pt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section id="get-started" className="scroll-mt-24 bg-zinc-50 px-4 py-14 dark:bg-zinc-950 sm:px-6 sm:py-20">
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-12 text-center text-white dark:bg-emerald-950 sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.4),transparent_60%)]" />
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
          <FiCheckCircle aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Your future is worth preparing for</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          আর দেরি কেন?
          <br className="sm:hidden" /> আজ থেকেই শুরু হোক।
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-300 dark:text-emerald-100/80 sm:text-base">
          আপনার লক্ষ্যটা বেছে নিন। নোট পড়ুন, প্রশ্ন practice করুন এবং exam result দেখে প্রস্তুতি আরও focused করুন।
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
          <Link
            href="#exams"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 text-sm font-bold text-emerald-950 transition hover:bg-emerald-300"
          >
            আমার প্রস্তুতি শুরু করি
            <FiArrowRight aria-hidden="true" />
          </Link>
          <a
            href="mailto:hello@chakriova.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <FiMail aria-hidden="true" />
            আমাদের সাথে কথা বলুন
          </a>
        </div>
        <p className="mt-5 text-xs text-zinc-400 dark:text-emerald-100/60">
          Learn at your pace · Practice with purpose · যেকোনো device-এ
        </p>
      </div>
    </section>
  );
}
