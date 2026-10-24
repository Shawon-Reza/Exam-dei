import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCheck, FiTarget } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { learningSteps } from "./landing-data";

const platformHighlights = [
  { icon: FiTarget, label: "নিজের লক্ষ্য অনুযায়ী প্রস্তুতি" },
  { icon: FiBookOpen, label: "বাংলা ও ইংরেজিতে learning content" },
  { icon: FiCheck, label: "Mobile, tablet ও desktop-এ ব্যবহারযোগ্য" },
];

export default function GettingStartedSection() {
  return (
    <>
      <section className="scroll-mt-24 bg-zinc-50 py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple by design · সহজেই শুরু"
            title="প্রস্তুতির পথটা হোক পরিষ্কার"
            description="লক্ষ্য বেছে নিন, topic ধরে প্রস্তুতি নিন, তারপর exam দিয়ে নিজের readiness যাচাই করুন।"
          />
          <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            <div aria-hidden="true" className="absolute left-[17%] right-[17%] top-7 hidden border-t border-dashed border-emerald-300 dark:border-emerald-900 md:block" />
            {learningSteps.map((step, index) => (
              <article key={step.number} className="relative text-center">
                <span className={`relative z-10 mx-auto grid size-14 place-items-center rounded-2xl border-4 border-zinc-50 text-sm font-extrabold dark:border-zinc-950 ${index === 1 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" : "bg-white text-emerald-600 shadow-md dark:bg-zinc-900 dark:text-emerald-300"}`}>
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">{step.title}</h3>
                <p className="mt-1 text-xs font-medium text-zinc-400">{step.englishTitle}</p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-emerald-600 py-14 text-white sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_85%_90%,rgba(6,78,59,0.25),transparent_35%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">Your next chapter starts today</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              নিজের লক্ষ্য অনুযায়ী—
              <br className="hidden sm:block" />
              লক্ষ্য থেকে আরেকটু কাছে।
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              একটি topic থেকে শুরু করুন, question bank-এ practice করুন এবং exam result দেখে পরের step ঠিক করুন।
            </p>
          </div>
          <Link
            href="#get-started"
            className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
          >
            আজই শুরু করুন
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="border-b border-zinc-200 bg-white py-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:px-6 lg:justify-between lg:px-8">
          {platformHighlights.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Icon aria-hidden="true" className="text-emerald-500" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
